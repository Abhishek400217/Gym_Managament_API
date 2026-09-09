import { motion } from 'framer-motion'
import { Users, TrendingUp, UserCheck, RefreshCw, CreditCard, Wallet, FileText, Circle } from 'lucide-react'
import { useCountUp } from '../../hooks/useCountUp'
import styles from './BentoCard.module.css'

const ICON_MAP = { Users, TrendingUp, UserCheck, RefreshCw, CreditCard, Wallet, FileText }

// Generic glass metric tile for the dashboard's asymmetric bento grid. `size` ('sm' | 'md' | 'lg') sets how
// many grid cells it spans — see the size classes in BentoCard.module.css — which is what turns a plain
// grid into a bento layout without any JS layout logic.
function BentoCard({ label, value, icon, prefix = '', suffix = '', size = 'sm', trend, trendDirection, index = 0 }) {
  const Icon = ICON_MAP[icon] || Circle
  const animatedValue = useCountUp(typeof value === 'number' ? value : 0)

  return (
    <motion.div
      className={`${styles.card} ${styles[size]}`}
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
    >
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.top}>
        <span className={styles.iconWrap}>
          <Icon className={styles.icon} strokeWidth={1.8} aria-hidden="true" />
        </span>
        {trend && (
          <span className={`${styles.trend} ${trendDirection === 'up' ? styles.trendUp : styles.trendDown}`}>
            {trend}
          </span>
        )}
      </div>

      <p className={styles.value}>
        {prefix}{animatedValue.toLocaleString()}{suffix}
      </p>
      <p className={styles.label}>{label}</p>
    </motion.div>
  )
}

export default BentoCard