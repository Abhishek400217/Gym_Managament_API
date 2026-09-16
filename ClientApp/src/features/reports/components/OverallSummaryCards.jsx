// OverallSummaryCards.jsx — 9 summary metric cards for the Overall Gym Report.
// Each card is clickable and opens a drill-down drawer.

import { motion } from 'framer-motion'
import {
  Users, UserPlus, IndianRupee, CheckCircle2,
  AlertCircle, AlertTriangle, CalendarCheck,
  CalendarClock, RotateCcw,
} from 'lucide-react'
import styles from './OverallSummaryCards.module.css'

const TONES = {
  accent:  { icon: '#4F8CFF', bg: 'rgba(79, 140, 255, 0.12)' },
  success: { icon: '#3DDC84', bg: 'rgba(61, 220, 132, 0.10)' },
  warning: { icon: '#F7B500', bg: 'rgba(247, 181, 0, 0.12)'  },
  danger:  { icon: '#FF4D67', bg: 'rgba(255, 77, 103, 0.10)' },
  muted:   { icon: '#AAB4C3', bg: 'rgba(170, 180, 195, 0.08)' },
}

function fmt(n) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`
  if (n >= 1000)   return `₹${(n / 1000).toFixed(1)}k`
  return String(n)
}

function SummaryCard({ icon: Icon, label, value, subtext, tone = 'accent', index, onClick, clickable }) {
  const colors = TONES[tone] || TONES.accent
  return (
    <motion.div
      className={`${styles.card} ${clickable ? styles.clickable : ''}`}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={clickable ? { y: -3 } : {}}
      onClick={clickable ? onClick : undefined}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={clickable ? (e) => e.key === 'Enter' && onClick?.() : undefined}
    >
      <div className={styles.cardTop}>
        <div className={styles.iconWrap} style={{ background: colors.bg }}>
          <Icon size={17} style={{ color: colors.icon }} aria-hidden="true" />
        </div>
        {clickable && <span className={styles.drillHint}>View ›</span>}
      </div>
      <p className={styles.value}>{value}</p>
      <p className={styles.label}>{label}</p>
      {subtext && <p className={styles.subtext}>{subtext}</p>}
    </motion.div>
  )
}

function OverallSummaryCards({ data, onDrill }) {
  const {
    totalMembers, newMembersCount,
    revenue, paidCount,
    pendingCount, overdueCount,
    attendanceCount, presentCount,
    expiringCount, expiredMembers,
  } = data

  const cards = [
    {
      icon: Users,
      label: 'Total Members',
      value: totalMembers,
      tone: 'accent',
      clickable: true,
      drillType: 'members',
    },
    {
      icon: UserPlus,
      label: 'New Members',
      value: newMembersCount,
      subtext: 'in selected period',
      tone: 'success',
      clickable: true,
      drillType: 'new_members',
    },
    {
      icon: IndianRupee,
      label: 'Revenue',
      value: fmt(revenue),
      subtext: 'paid in period',
      tone: 'accent',
      clickable: true,
      drillType: 'paid_payments',
    },
    {
      icon: CheckCircle2,
      label: 'Payments Received',
      value: paidCount,
      tone: 'success',
      clickable: true,
      drillType: 'paid_payments',
    },
    {
      icon: AlertCircle,
      label: 'Pending Payments',
      value: pendingCount,
      tone: 'warning',
      clickable: true,
      drillType: 'pending_payments',
    },
    {
      icon: AlertTriangle,
      label: 'Overdue Payments',
      value: overdueCount,
      tone: 'danger',
      clickable: true,
      drillType: 'overdue_payments',
    },
    {
      icon: CalendarCheck,
      label: 'Attendance',
      value: attendanceCount,
      subtext: `${presentCount} Present · ${attendanceCount - presentCount} Absent`,
      tone: 'muted',
      clickable: false,
    },
    {
      icon: CalendarClock,
      label: 'Expiring Soon',
      value: expiringCount,
      subtext: '≤ 7 days',
      tone: 'warning',
      clickable: expiringCount > 0,
      drillType: 'expiring',
    },
    {
      icon: RotateCcw,
      label: 'Expired',
      value: expiredMembers.length,
      tone: 'danger',
      clickable: expiredMembers.length > 0,
      drillType: 'expired',
    },
  ]

  return (
    <div className={styles.grid} aria-label="Overall gym report summary">
      {cards.map((card, i) => (
        <SummaryCard
          key={card.label}
          index={i}
          {...card}
          onClick={() => card.clickable && onDrill(card.drillType)}
        />
      ))}
    </div>
  )
}

export default OverallSummaryCards
