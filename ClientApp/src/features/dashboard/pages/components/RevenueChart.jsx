import { motion } from 'framer-motion'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { revenueTrend } from '../../../../data/dashboardData'
import styles from './RevenueChart.module.css'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className={styles.tooltip}>
      <p className={styles.tooltipLabel}>{label}</p>
      <p className={styles.tooltipValue}>₹{payload[0].value.toLocaleString()}</p>
    </div>
  )
}

// Revenue Analytics + Monthly Growth as one area chart. Recharts handles the SVG math; the gradient fill,
// rounded tooltip, and muted grid are what make it feel like a premium SaaS chart, not a default one.
function RevenueChart() {
  return (
    <motion.section
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.header}>
        <div>
          <h2 className={styles.heading}>Revenue Analytics</h2>
          <p className={styles.subheading}>Monthly growth over the last 12 months</p>
        </div>
        <span className={styles.growthBadge}>+8.4% vs last month</span>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={revenueTrend} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4F8CFF" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#4F8CFF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis dataKey="month" stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1000}k`} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="revenue" stroke="#4F8CFF" strokeWidth={2.5} fill="url(#revenueFill)" />
        </AreaChart>
      </ResponsiveContainer>
    </motion.section>
  )
}

export default RevenueChart