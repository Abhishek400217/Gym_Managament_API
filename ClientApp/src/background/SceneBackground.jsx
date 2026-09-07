import { motion, useTransform } from 'framer-motion'
import { useParallax } from '../hooks/useParallax'
import styles from './SceneBackground.module.css'

// The base atmosphere plate. Pass a real, self-hosted gym-interior photo via `photoUrl` for the full
// cinematic effect — applies a slow "Ken Burns" breathing zoom plus parallax drift to it. With no photo,
// falls back to a built scene: a low warm sun, a mountain silhouette (CSS clip-path, not an image), glass
// window mullions, and reflective flooring — geometric shapes, not clipart icons.
function SceneBackground({ photoUrl }) {
  const { x, y } = useParallax(6)
  const translateX = useTransform(x, (v) => v * -1)
  const translateY = useTransform(y, (v) => v * -1)

  return (
    <div className={styles.scene} aria-hidden="true">
      <motion.div
        className={styles.plate}
        style={{
          translateX,
          translateY,
          backgroundImage: photoUrl
            ? `linear-gradient(180deg, rgba(11,15,18,0.5), rgba(11,15,18,0.88)), url(${photoUrl})`
            : undefined,
        }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 36, repeat: Infinity, ease: 'easeInOut' }}
      >
        {!photoUrl && (
          <>
            <div className={styles.sky} />
            <div className={styles.sunGlow} />
            <div className={styles.sunDisc} />
            <div className={styles.mountains} />
            <div className={styles.glassMullions} />
            <div className={styles.floor} />
          </>
        )}
      </motion.div>

      <div className={styles.vignette} />
    </div>
  )
}

export default SceneBackground