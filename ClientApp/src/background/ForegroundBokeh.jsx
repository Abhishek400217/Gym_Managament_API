import { motion } from 'framer-motion'
import styles from './ForegroundBokeh.module.css'

// Bottom-right corner depth cue: soft, out-of-focus shapes suggesting a shaker bottle and a folded towel
// sitting just outside the camera's focal plane. This is real shallow-depth-of-field logic — not an icon —
// which is why it stays low-opacity, blurred, and slow-drifting rather than crisply drawn.
function ForegroundBokeh() {
  return (
    <motion.div
      className={styles.wrapper}
      aria-hidden="true"
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className={styles.shaker} />
      <div className={styles.shakerHighlight} />
      <div className={styles.towel} />
    </motion.div>
  )
}

export default ForegroundBokeh