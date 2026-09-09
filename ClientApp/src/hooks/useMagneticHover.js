import { useRef } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

// Classic "magnetic button" effect (Linear/Vercel-style): the element subtly follows the cursor within its
// own bounds while hovered, then springs back to center on leave. `strength` caps travel distance in px.
export function useMagneticHover(strength = 12) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.4 })

  const handlePointerMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = (e.clientX - rect.left) / rect.width - 0.5
    const relY = (e.clientY - rect.top) / rect.height - 0.5
    x.set(relX * strength)
    y.set(relY * strength)
  }

  const handlePointerLeave = () => {
    x.set(0)
    y.set(0)
  }

  return { ref, x: springX, y: springY, handlePointerMove, handlePointerLeave }
}