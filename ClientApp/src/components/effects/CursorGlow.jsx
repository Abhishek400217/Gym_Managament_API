import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import styles from './CursorGlow.module.css'

// A soft light that trails the cursor for a premium "alive" feel — purely decorative, ignored by assistive tech.
function CursorGlow() {
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const springX = useSpring(x, { stiffness: 120, damping: 20 })
  const springY = useSpring(y, { stiffness: 120, damping: 20 })

  useEffect(() => {
    const handleMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('pointermove', handleMove)
    return () => window.removeEventListener('pointermove', handleMove)
  }, [x, y])

  return (
    <motion.div
      className={styles.glow}
      style={{ translateX: springX, translateY: springY }}
      aria-hidden="true"
    />
  )
}

export default CursorGlow