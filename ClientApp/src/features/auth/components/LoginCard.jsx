import { motion, useMotionTemplate, useReducedMotion } from 'framer-motion'
import { useTilt } from '../../../hooks/useTilt'
import styles from './LoginCard.module.css'

// Glassmorphic card. Outer layer: entrance + gentle infinite float. Inner layer: cursor-driven 3D tilt + glare.
function LoginCard({ children }) {
  const { ref, rotateX, rotateY, glareX, glareY, handlePointerMove, handlePointerLeave } = useTilt(6)
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.14), transparent 60%)`
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className={styles.floatWrapper}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: prefersReducedMotion ? 0 : [0, -8, 0], scale: 1 }}
      transition={{
        opacity: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        scale: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        y: prefersReducedMotion ? { duration: 0 } : { duration: 6, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      <motion.div
        ref={ref}
        className={styles.card}
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <motion.div className={styles.glare} style={{ background: glareBackground }} />
        <div className={styles.content}>{children}</div>
      </motion.div>
    </motion.div>
  )
}

export default LoginCard