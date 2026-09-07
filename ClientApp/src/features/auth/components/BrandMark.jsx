import { motion } from 'framer-motion'
import { FiActivity } from 'react-icons/fi'
import styles from './BrandMark.module.css'

// The card's identity block: pulse icon + wordmark + tagline, matching the reference exactly. Isolated so
// the same mark can be reused on a future Register/ForgotPassword page without duplicating markup.
function BrandMark() {
  return (
    <div className={styles.wrapper}>
      <motion.div
        className={styles.logoRow}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.span animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}>
          <FiActivity className={styles.pulseIcon} aria-hidden="true" />
        </motion.span>
        <span className={styles.wordmark}>
          PULSE<span className={styles.wordmarkAccent}>FIT</span>
        </span>
      </motion.div>

      <motion.p
        className={styles.tagline}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.7 }}
      >
        STRONGER EVERY DAY
      </motion.p>
    </div>
  )
}

export default BrandMark