import { useEffect, useRef } from 'react'
import styles from './DustParticles.module.css'

// Fine dust motes drifting slowly upward through the light beams. Canvas (not a library) keeps this cheap —
// plain 2D arcs for ~70 points max, with a per-mote sine "flicker" so they don't all pulse in unison.
function DustParticles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return undefined

    let animationId
    let motes = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createMotes = () => {
      const count = Math.min(70, Math.floor((window.innerWidth * window.innerHeight) / 18000))
      motes = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.4 + 0.3,
        speedY: -(Math.random() * 0.12 + 0.03),
        drift: Math.random() * 0.06 - 0.03,
        baseOpacity: Math.random() * 0.35 + 0.08,
        flicker: Math.random() * 0.02,
        phase: Math.random() * Math.PI * 2,
      }))
    }

    const draw = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      motes.forEach((m) => {
        m.y += m.speedY
        m.x += m.drift
        if (m.y < -10) m.y = canvas.height + 10
        if (m.x < -10) m.x = canvas.width + 10
        if (m.x > canvas.width + 10) m.x = -10

        const flicker = Math.sin(time * 0.001 + m.phase) * m.flicker
        ctx.beginPath()
        ctx.arc(m.x, m.y, m.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 214, 170, ${m.baseOpacity + flicker})`
        ctx.fill()
      })
      animationId = requestAnimationFrame(draw)
    }

    resize()
    createMotes()
    animationId = requestAnimationFrame(draw)

    const handleResize = () => {
      resize()
      createMotes()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
}

export default DustParticles