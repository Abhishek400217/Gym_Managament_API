import { motion } from 'framer-motion'
import { useParallax } from '../hooks/useParallax'
import styles from './LightRays.module.css'

// Soft volumetric sunbeams cutting in from the upper-left, as if daylight is passing through tall glass
// windows. Three staggered beams drift independently so the motion never feels like a single looping GIF.
function LightRays() {
  const { x, y } = useParallax(14)

  return (
    <motion.div className={styles.rays} style={{ translateX: x, translateY: y }} aria-hidden="true">
      <svg className={styles.svg} viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="beamGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffd8b0" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#ffd8b0" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 1, 2].map((i) => (
          <motion.polygon
            key={i}
            points="-100,-50 260,-50 900,1050 400,1050"
            fill="url(#beamGradient)"
            initial={{ x: i * 180 - 120, opacity: 0.4 }}
            animate={{ x: [i * 180 - 120, i * 180 - 55, i * 180 - 120], opacity: [0.32, 0.58, 0.32] }}
            transition={{ duration: 18 + i * 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </svg>
    </motion.div>
  )
}

export default LightRays