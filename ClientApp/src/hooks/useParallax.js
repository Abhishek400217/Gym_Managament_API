import { useEffect } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

// Converts raw cursor position into a spring-smoothed offset. Different background layers pass different
// `strength` values so they move at different rates — the classic depth-parallax trick: layers meant to feel
// "far away" (the base scene) get a small strength; layers meant to feel "close" (light rays) get a bigger one.
export function useParallax(strength = 1) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 60, damping: 20, mass: 0.6 })
  const springY = useSpring(y, { stiffness: 60, damping: 20, mass: 0.6 })

  useEffect(() => {
    const handleMove = (e) => {
      x.set((e.clientX / window.innerWidth - 0.5) * strength)
      y.set((e.clientY / window.innerHeight - 0.5) * strength)
    }
    window.addEventListener('pointermove', handleMove)
    return () => window.removeEventListener('pointermove', handleMove)
  }, [strength, x, y])

  return { x: springX, y: springY }
}