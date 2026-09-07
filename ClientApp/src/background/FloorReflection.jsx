import { motion } from 'framer-motion'
import styles from './FloorReflection.module.css'

// A faint, blurred mirror beneath the card — the classic "polished floor reflection" render cue, done with
// a single flipped, masked, blurred element. Purely decorative: no cloned form fields, no duplicate inputs.
function FloorReflection() {
  return (
    <motion.div
      className={styles.reflection}
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 1 }}
    />
  )
}

export default FloorReflection