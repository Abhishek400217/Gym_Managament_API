// AttendanceSummaryCards.jsx — 4 stat cards at the top of the Attendance page.
// Reuses BentoCard for consistent visual language.

import { motion } from 'framer-motion'
import { CalendarCheck, CalendarRange, UserCheck, UserX } from 'lucide-react'
import styles from './AttendanceSummaryCards.module.css'

function StatCard({ icon: Icon, label, value, tone = 'accent', index = 0 }) {
  const toneColors = {
    accent:  { icon: '#4F8CFF', bg: 'rgba(79, 140, 255, 0.14)' },
    success: { icon: '#3DDC84', bg: 'rgba(61, 220, 132, 0.12)' },
    danger:  { icon: '#FF4D67', bg: 'rgba(255, 77, 103, 0.12)' },
    warning: { icon: '#F7B500', bg: 'rgba(247, 181, 0, 0.14)' },
  }
  const colors = toneColors[tone] || toneColors.accent

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
    >
      <div className={styles.iconWrap} style={{ background: colors.bg }}>
        <Icon size={18} style={{ color: colors.icon }} aria-hidden="true" />
      </div>
      <p className={styles.value}>{value}</p>
      <p className={styles.label}>{label}</p>
    </motion.div>
  )
}

function AttendanceSummaryCards({ todayTotal, monthTotal, presentToday, absentToday }) {
  return (
    <div className={styles.grid} aria-label="Attendance summary">
      <StatCard icon={CalendarCheck} label="Today's Attendance" value={todayTotal} tone="accent" index={0} />
      <StatCard icon={CalendarRange} label="This Month Attendance" value={monthTotal} tone="warning" index={1} />
      <StatCard icon={UserCheck} label="Present Today" value={presentToday} tone="success" index={2} />
      <StatCard icon={UserX} label="Absent Today" value={absentToday} tone="danger" index={3} />
    </div>
  )
}

export default AttendanceSummaryCards
