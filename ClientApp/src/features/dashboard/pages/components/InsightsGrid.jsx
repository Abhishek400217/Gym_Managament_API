import { motion } from 'framer-motion'
import { UserPlus, IndianRupee, AlertCircle, CalendarClock, Circle } from 'lucide-react'
import { useCountUp } from '../../../../hooks/useCountUp'
import { insights } from '../../../../data/dashboardData'
import styles from './InsightsGrid.module.css'

const ICON_MAP = { UserPlus, IndianRupee, AlertCircle, CalendarClock }
const TONE_CLASS = { success: 'toneSuccess', accent: 'toneAccent', warning: 'toneWarning' }

function InsightTile({ label, value, icon, prefix = '', suffix = '', tone, index }) {
  const Icon = ICON_MAP[icon] || Circle
  const animated = useCountUp(value)

  return (
    <motion.div
      className={styles.tile}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      whileHover={{ y: -4 }}
    >
      <span className={`${styles.iconWrap} ${styles[TONE_CLASS[tone]]}`}>
        <Icon className={styles.icon} strokeWidth={1.8} aria-hidden="true" />
      </span>
      <div>
        <p className={styles.value}>{prefix}{animated.toLocaleString()}{suffix}</p>
        <p className={styles.label}>{label}</p>
      </div>
    </motion.div>
  )
}

function InsightsGrid() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Quick Insights</h2>
      <div className={styles.grid}>
        {insights.map((item, index) => (
          <InsightTile key={item.id} index={index} {...item} />
        ))}
      </div>
    </section>
  )
}

export default InsightsGrid