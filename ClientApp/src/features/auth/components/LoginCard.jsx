import { motion, useReducedMotion } from 'framer-motion'
import FloorReflection from '../../../background/FloorReflection'
import styles from './LoginCard.module.css'

// Glass card with: rotating ambient border glow, a periodic diagonal light sweep, cursor-driven 3D tilt +
// glare, a gentle infinite float, and a floor reflection beneath it. Each effect lives on its own layer so
// they don't fight for the same `transform` property.
function LoginCard({ children }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className={styles.floatWrapper}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: prefersReducedMotion ? 0 : [0, -7, 0], scale: 1 }}
      transition={{
        opacity: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
        scale: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
        y: prefersReducedMotion ? { duration: 0 } : { duration: 7, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      <div className={styles.borderGlow} />

      <motion.div
        className={styles.card}
      >
        <div className={styles.sweep} />
        <div className={styles.content}>{children}</div>
      </motion.div>

      <FloorReflection />
    </motion.div>
  )
}

export default LoginCard