import { useRef } from 'react'
import { useMotionValue, useSpring, useTransform } from 'framer-motion'

// Tracks pointer position over an element and converts it into a subtle 3D tilt + glare position.
export function useTilt(maxTilt = 8) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 }
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt]), springConfig)
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]), springConfig)
  const glareX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), springConfig)
  const glareY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), springConfig)

  const handlePointerMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handlePointerLeave = () => {
    x.set(0)
    y.set(0)
  }

  return { ref, rotateX, rotateY, glareX, glareY, handlePointerMove, handlePointerLeave }
}