import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { weeklyAttendance } from '../../../../data/dashboardData'
import styles from './AttendanceChart.module.css'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className={styles.tooltip}>
      <p className={styles.tooltipLabel}>{label}</p>
      <p className={styles.tooltipValue}>{payload[0].value} check-ins</p>
    </div>
  )
}

// Weekly Attendance bar chart — rounded bars, same minimal chart language as RevenueChart so the two don't
// feel like they came from different libraries.
function AttendanceChart() {
  return (
    <motion.section
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <h2 className={styles.heading}>Weekly Attendance</h2>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={weeklyAttendance} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis dataKey="day" stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(79,140,255,0.06)' }} />
          <Bar dataKey="count" fill="#4F8CFF" radius={[8, 8, 0, 0]} maxBarSize={34} />
        </BarChart>
      </ResponsiveContainer>
    </motion.section>
  )
}

export default AttendanceChart