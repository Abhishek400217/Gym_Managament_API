// ReportsPage.jsx — main page. Assembles all report sections around a shared period state.
// All data flows from useReportData(period) — no fake values, no hardcoded numbers.

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { BarChart3 } from 'lucide-react'
import AppShell from '../../../components/layoout/AppShell'
import ReportPeriodBar from '../components/ReportPeriodBar'
import OverallSummaryCards from '../components/OverallSummaryCards'
import RevenueSection from '../components/RevenueSection'
import MembersSection from '../components/MembersSection'
import PlanPerformanceSection from '../components/PlanPerformanceSection'
import RenewalSection from '../components/RenewalSection'
import DrillDownDrawer from '../components/DrillDownDrawer'
import { useReportData } from '../hooks/useReportData'
import styles from './ReportsPage.module.css'

// ── Period helpers ────────────────────────────────────────────────────────────

function getPeriodDates(type, customStart, customEnd) {
  const now = new Date()
  switch (type) {
    case 'last_month': {
      const y = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear()
      const m = now.getMonth() === 0 ? 11 : now.getMonth() - 1
      return { startDate: new Date(y, m, 1), endDate: new Date(y, m + 1, 0) }
    }
    case 'this_year':
      return { startDate: new Date(now.getFullYear(), 0, 1), endDate: new Date(now.getFullYear(), 11, 31) }
    case 'custom':
      return {
        startDate: customStart ?? new Date(now.getFullYear(), now.getMonth(), 1),
        endDate:   customEnd   ?? new Date(now.getFullYear(), now.getMonth() + 1, 0),
      }
    case 'this_month':
    default:
      return { startDate: new Date(now.getFullYear(), now.getMonth(), 1), endDate: new Date(now.getFullYear(), now.getMonth() + 1, 0) }
  }
}

// ── Section wrapper ───────────────────────────────────────────────────────────

function Section({ title, subtitle, children, index = 0 }) {
  return (
    <motion.section
      className={styles.section}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      aria-labelledby={`section-${title.replace(/\s+/g, '-').toLowerCase()}`}
    >
      <div className={styles.sectionHeader}>
        <h2
          className={styles.sectionTitle}
          id={`section-${title.replace(/\s+/g, '-').toLowerCase()}`}
        >
          {title}
        </h2>
        {subtitle && <p className={styles.sectionSub}>{subtitle}</p>}
      </div>
      {children}
    </motion.section>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

function ReportsPage() {
  // Period state — drives every section simultaneously
  const [periodType, setPeriodType] = useState('this_month')
  const [customStart, setCustomStart] = useState(null)
  const [customEnd,   setCustomEnd]   = useState(null)

  const { startDate, endDate } = getPeriodDates(periodType, customStart, customEnd)
  const period = { type: periodType, startDate, endDate }

  const handlePeriodChange = useCallback((type, cs, ce) => {
    setPeriodType(type)
    if (type === 'custom') { setCustomStart(cs); setCustomEnd(ce) }
  }, [])

  // All report data — derived live from the 4 contexts
  const data = useReportData(period)

  // ── Drill-down drawer state ─────────────────────────────────────────────
  const [drawer, setDrawer] = useState({ open: false, type: null, data: null, extra: null })

  const openDrill = useCallback((type, extra = null) => {
    let drillData
    switch (type) {
      case 'members':
        drillData = data.newMembers  // show period new-members in drawer; full list via MembersSection
        break
      case 'new_members':
        drillData = data.newMembers
        break
      case 'paid_payments':
        drillData = data.paidPayments
        break
      case 'pending_payments':
        drillData = data.pendingPayments
        break
      case 'overdue_payments':
        drillData = data.overduePayments
        break
      case 'expiring':
        drillData = data.expiringMembers
        break
      case 'expired':
        drillData = data.expiredMembers
        break
      case 'payments_on_date':
        drillData = data.paidPayments
        break
      default:
        drillData = []
    }
    setDrawer({ open: true, type, data: drillData, extra })
  }, [data])

  // Members drill-down needs all members from MembersContext
  const openMembersDrill = useCallback(() => {
    setDrawer({ open: true, type: 'members', data: data.newMembers, extra: null })
  }, [data.newMembers])

  const closeDrill = useCallback(() => setDrawer((d) => ({ ...d, open: false })), [])

  const handleCardDrill = useCallback((type) => {
    if (type === 'members') { openMembersDrill(); return }
    openDrill(type)
  }, [openDrill, openMembersDrill])

  return (
    <AppShell>
      <div className={styles.page}>
        {/* Page header */}
        <motion.div
          className={styles.pageHeader}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className={styles.headerLeft}>
            <div className={styles.headerIcon} aria-hidden="true">
              <BarChart3 size={20} />
            </div>
            <div>
              <h1 className={styles.pageTitle}>Reports</h1>
              <p className={styles.pageSubtitle}>Live gym performance for the selected period</p>
            </div>
          </div>
        </motion.div>

        {/* Period filter */}
        <ReportPeriodBar period={period} onPeriodChange={handlePeriodChange} />

        {/* Overall Gym Report */}
        <Section
          title="Overall Gym Report"
          subtitle="Snapshot for the selected period — click any card to view details"
          index={0}
        >
          <OverallSummaryCards data={data} onDrill={handleCardDrill} />
        </Section>

        {/* Revenue */}
        <Section
          title="Revenue & Payments"
          subtitle="Paid revenue, pending & overdue amounts — click cards or chart points to drill down"
          index={1}
        >
          <RevenueSection data={data} onDrill={openDrill} />
        </Section>

        {/* Members */}
        <Section
          title="Members"
          subtitle="Total roster and membership duration distribution"
          index={2}
        >
          <MembersSection data={data} onDrill={handleCardDrill} />
        </Section>

        {/* Plan Performance */}
        <Section
          title="Membership Plan Performance"
          subtitle="Members and period revenue broken down by plan"
          index={3}
        >
          <PlanPerformanceSection data={data} />
        </Section>

        {/* Renewals */}
        <Section
          title="Renewal & Expiry"
          subtitle="Members expiring within 7 days and already expired memberships"
          index={4}
        >
          <RenewalSection
            data={data}
            onMemberClick={(member) => {
              // Open expiring or expired list in the drawer on row click
              const type = data.expiringMembers.find((m) => m.id === member.id) ? 'expiring' : 'expired'
              openDrill(type)
            }}
          />
        </Section>
      </div>

      {/* Drill-down drawer */}
      <DrillDownDrawer
        open={drawer.open}
        onClose={closeDrill}
        type={drawer.type}
        data={drawer.data}
        extra={drawer.extra}
      />
    </AppShell>
  )
}

export default ReportsPage
