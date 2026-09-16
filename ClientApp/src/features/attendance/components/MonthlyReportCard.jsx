// MonthlyReportCard.jsx — UI-only monthly report summary.
// No PDF generation, no export, just a clean stats card with the month's totals.

import { BarChart3 } from 'lucide-react'
import { motion } from 'framer-motion'
import styles from './MonthlyReportCard.module.css'

function MonthlyReportCard({ monthTotal, presentCount, absentCount }) {
  const monthName = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const attendanceRate = monthTotal > 0 ? Math.round((presentCount / monthTotal) * 100) : 0

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.3 }}
    >
      <div className={styles.left}>
        <div className={styles.iconWrap}>
          <BarChart3 size={18} aria-hidden="true" />
        </div>
        <div>
          <p className={styles.title}>Monthly Attendance Report</p>
          <p className={styles.month}>{monthName}</p>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statValue}>{monthTotal}</span>
          <span className={styles.statLabel}>Total Records</span>
        </div>
        <div className={styles.divider} aria-hidden="true" />
        <div className={styles.stat}>
          <span className={styles.statValue} style={{ color: '#3DDC84' }}>{presentCount}</span>
          <span className={styles.statLabel}>Present</span>
        </div>
        <div className={styles.divider} aria-hidden="true" />
        <div className={styles.stat}>
          <span className={styles.statValue} style={{ color: '#FF4D67' }}>{absentCount}</span>
          <span className={styles.statLabel}>Absent</span>
        </div>
        <div className={styles.divider} aria-hidden="true" />
        <div className={styles.stat}>
          <span className={styles.statValue} style={{ color: '#4F8CFF' }}>{attendanceRate}%</span>
          <span className={styles.statLabel}>Attendance Rate</span>
        </div>
      </div>
    </motion.div>
  )
}

export default MonthlyReportCard
