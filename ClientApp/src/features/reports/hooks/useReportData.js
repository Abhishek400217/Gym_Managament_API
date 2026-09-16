// useReportData.js — single source of truth for all report computations.
// Reads from the 4 existing contexts and derives every metric via useMemo.
// When any context mutates (add member, record payment, etc.) these values
// recompute automatically — no manual refresh, no fake data.

import { useMemo } from 'react'
import { useMembers } from '../../../context/MembersContext'
import { usePayments } from '../../../context/PaymentsContext'
import { usePlans } from '../../../context/PlansContext'
import { useAttendance } from '../../../context/AttendanceContext'
import { getPaymentStatus } from '../../../utils/paymentStatus'
import { sortPlansForDisplay } from '../../../utils/planOrdering'

// ── Date helpers ────────────────────────────────────────────────────────────

// Parse a formatted date string ("08 Sep 2026") or Date object to a Date.
function toDate(val) {
  if (!val) return null
  if (val instanceof Date) return isNaN(val) ? null : val
  const d = new Date(val)
  return isNaN(d) ? null : d
}

function startOfDay(d) {
  const r = new Date(d); r.setHours(0, 0, 0, 0); return r
}
function endOfDay(d) {
  const r = new Date(d); r.setHours(23, 59, 59, 999); return r
}

function isInPeriod(val, start, end) {
  const d = toDate(val)
  if (!d) return false
  return d >= start && d <= end
}

// Parse "1 Month" → 1, "3 Months" → 3, "1 Year" → 12
function parseDurationToMonths(label) {
  if (!label) return null
  const lower = label.toLowerCase()
  if (lower.includes('year')) {
    const m = lower.match(/(\d+)\s*year/)
    return m ? parseInt(m[1], 10) * 12 : null
  }
  const m = label.match(/^(\d+)/)
  return m ? parseInt(m[1], 10) : null
}

const EXPIRING_DAYS = 7

// ── Main hook ───────────────────────────────────────────────────────────────

export function useReportData(period) {
  const { members }                    = useMembers()
  const { payments }                   = usePayments()
  const { plans }                      = usePlans()
  const { records: attendanceRecords } = useAttendance()

  const { startDate, endDate } = period

  return useMemo(() => {
    const start = startOfDay(startDate)
    const end   = endOfDay(endDate)
    const now   = new Date()

    // ── Members ─────────────────────────────────────────────────────────
    const totalMembers = members.length

    const newMembers = members.filter((m) => isInPeriod(toDate(m.joinDate), start, end))

    const expiringMembers = members.filter((m) => {
      const d = toDate(m.expiryDate)
      if (!d) return false
      const days = Math.round((d - now) / 86400000)
      return days >= 0 && days <= EXPIRING_DAYS
    })

    const expiredMembers = members.filter((m) => {
      const d = toDate(m.expiryDate)
      return d && d < now
    })

    // Duration breakdown (total members, not period-filtered — a member's plan isn't time-bound)
    const durationMap = {}
    members.forEach((m) => {
      const key = m.membershipDuration || 'Unknown'
      durationMap[key] = (durationMap[key] || 0) + 1
    })
    const durationBreakdown = Object.entries(durationMap)
      .map(([label, count]) => ({
        label,
        months: parseDurationToMonths(label),
        count,
        pct: totalMembers > 0 ? Math.round((count / totalMembers) * 100) : 0,
      }))
      .sort((a, b) => (a.months ?? 9999) - (b.months ?? 9999))

    // Members indexed by plan months (for plan performance)
    const membersByPlanMonths = {}
    members.forEach((m) => {
      const months = parseDurationToMonths(m.membershipDuration)
      if (months !== null) {
        membersByPlanMonths[months] = (membersByPlanMonths[months] || 0) + 1
      }
    })

    // ── Payments ────────────────────────────────────────────────────────
    const paidInPeriod    = payments.filter((p) => getPaymentStatus(p) === 'Paid' && isInPeriod(p.paymentDate, start, end))
    const pendingPayments = payments.filter((p) => getPaymentStatus(p) === 'Pending')
    const overduePayments = payments.filter((p) => getPaymentStatus(p) === 'Overdue')

    const revenue       = paidInPeriod.reduce((s, p) => s + p.amount, 0)
    const paidCount     = paidInPeriod.length
    const pendingCount  = pendingPayments.length
    const pendingAmount = pendingPayments.reduce((s, p) => s + p.amount, 0)
    const overdueCount  = overduePayments.length
    const overdueAmount = overduePayments.reduce((s, p) => s + p.amount, 0)
    const avgPayment    = paidCount > 0 ? Math.round(revenue / paidCount) : 0

    // ── Revenue chart ───────────────────────────────────────────────────
    const periodDays = Math.round((end - start) / 86400000)
    const chartMode  = periodDays <= 31 ? 'daily' : 'monthly'

    let revenueChartData

    if (chartMode === 'daily') {
      const dayMap = {}
      const cur = new Date(start)
      while (cur <= end) {
        dayMap[cur.toISOString().slice(0, 10)] = 0
        cur.setDate(cur.getDate() + 1)
      }
      paidInPeriod.forEach((p) => {
        const key = new Date(p.paymentDate).toISOString().slice(0, 10)
        if (key in dayMap) dayMap[key] += p.amount
      })
      revenueChartData = Object.entries(dayMap).map(([date, rev]) => ({
        label: new Date(date + 'T12:00:00').toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
        revenue: rev,
        date,
      }))
    } else {
      const monthMap = {}
      // Fill all months in range first
      const cur = new Date(start.getFullYear(), start.getMonth(), 1)
      const last = new Date(end.getFullYear(), end.getMonth(), 1)
      while (cur <= last) {
        const key = `${cur.getFullYear()}-${String(cur.getMonth() + 1).padStart(2, '0')}`
        monthMap[key] = 0
        cur.setMonth(cur.getMonth() + 1)
      }
      paidInPeriod.forEach((p) => {
        const d = new Date(p.paymentDate)
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
        if (key in monthMap) monthMap[key] += p.amount
      })
      revenueChartData = Object.entries(monthMap)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, rev]) => {
          const [yr, mo] = key.split('-')
          const d = new Date(parseInt(yr), parseInt(mo) - 1, 1)
          return {
            label: d.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' }),
            revenue: rev,
            date: key,
          }
        })
    }

    // ── Attendance ──────────────────────────────────────────────────────
    const attInPeriod  = attendanceRecords.filter((r) => isInPeriod(new Date(r.date + 'T12:00:00'), start, end))
    const attendanceCount = attInPeriod.length
    const presentCount    = attInPeriod.filter((r) => r.status === 'Present').length
    const absentCount     = attInPeriod.filter((r) => r.status === 'Absent').length

    // ── Plan performance ────────────────────────────────────────────────
    const revenueByPlan = {}
    paidInPeriod.forEach((p) => {
      revenueByPlan[p.planMonths] = (revenueByPlan[p.planMonths] || 0) + p.amount
    })

    const sortedPlans = sortPlansForDisplay(plans)
    const planPerf = sortedPlans.map((plan) => ({
      ...plan,
      memberCount: membersByPlanMonths[plan.months] ?? plan.memberCount ?? 0,
      revenue: revenueByPlan[plan.months] ?? 0,
    }))

    const maxMembers = Math.max(...planPerf.map((p) => p.memberCount), 0)
    const maxRev     = Math.max(...planPerf.map((p) => p.revenue), 0)

    const planPerformance = planPerf.map((p) => ({
      ...p,
      isMostUsed:        p.memberCount > 0 && p.memberCount === maxMembers,
      isHighestRevenue:  p.revenue > 0 && p.revenue === maxRev,
    }))

    return {
      totalMembers,
      newMembers,
      newMembersCount: newMembers.length,
      revenue,
      paidCount,
      paidPayments: paidInPeriod,
      pendingCount,
      pendingAmount,
      pendingPayments,
      overdueCount,
      overdueAmount,
      overduePayments,
      avgPayment,
      attendanceCount,
      presentCount,
      absentCount,
      expiringMembers,
      expiringCount: expiringMembers.length,
      expiredMembers,
      durationBreakdown,
      revenueChartData,
      chartMode,
      planPerformance,
    }
  }, [members, payments, plans, attendanceRecords, startDate, endDate])
}
