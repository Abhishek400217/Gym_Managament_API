import { motion } from 'framer-motion'
import styles from './SceneBackground.module.css'

function SceneBackground({ photoUrl }) {
  return (
    <div className={styles.scene} aria-hidden="true">
      <motion.div
        className={styles.plate}
        style={{ backgroundImage: `url(${photoUrl})` }}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className={styles.warmWash} />
      <div className={styles.coolVignette} />
      <div className={styles.centerFocus} />
    </div>
  )
}

export default SceneBackground