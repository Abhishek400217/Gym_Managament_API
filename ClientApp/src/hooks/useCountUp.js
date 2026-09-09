import { useEffect, useRef, useState } from 'react'

// Animates a number from 0 up to `end` over `duration` ms using requestAnimationFrame — this is what
// drives the "counter animation" on each dashboard stat card. Framer Motion's useMotionValue could also do
// this, but a small dedicated hook keeps StatCard simple and framework-agnostic for the number logic itself.
export function useCountUp(end, duration = 1200) {
  const [value, setValue] = useState(0)
  const frameRef = useRef(null)

  useEffect(() => {
    const startTime = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - (1 - progress) ** 3 // ease-out cubic
      setValue(Math.round(eased * end))
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      }
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [end, duration])

  return value
}