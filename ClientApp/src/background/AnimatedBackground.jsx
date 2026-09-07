import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { GiGymBag, GiMetalPlate, GiParkBench } from 'react-icons/gi'
import styles from './AnimatedBackground.module.css'

// Layered animated backdrop: CSS gradient mesh + drifting gym silhouettes + a lightweight canvas particle field.
// Canvas (not a library) keeps this fast — plain 2D arc drawing for ~60 dots max.
function AnimatedBackground() {
  const canvasRef = useRef(null)
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const parallaxX = useSpring(pointerX, { stiffness: 35, damping: 30 })
  const parallaxY = useSpring(pointerY, { stiffness: 35, damping: 30 })

  useEffect(() => {
    const handlePointerMove = (event) => {
      pointerX.set((event.clientX / window.innerWidth - 0.5) * -18)
      pointerY.set((event.clientY / window.innerHeight - 0.5) * -12)
    }

    window.addEventListener('pointermove', handlePointerMove)
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [pointerX, pointerY])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let animationId
    let particles = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      const count = Math.min(60, Math.floor((window.innerWidth * window.innerHeight) / 22000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.8 + 0.6,
        speedX: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.15,
        speedY: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.15,
        opacity: Math.random() * 0.5 + 0.15,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.speedX
        p.y += p.speedY
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(169, 220, 232, ${p.opacity})`
        ctx.fill()
      })
      if (!prefersReducedMotion) {
        animationId = requestAnimationFrame(draw)
      }
    }

    resize()
    createParticles()
    draw()

    const handleResize = () => {
      resize()
      createParticles()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className={styles.background} aria-hidden="true">
      <motion.div className={styles.grid} style={{ x: parallaxX, y: parallaxY }} />

      <div className={`${styles.blob} ${styles.blobOne}`} />
      <div className={`${styles.blob} ${styles.blobTwo}`} />
      <div className={`${styles.blob} ${styles.blobThree}`} />

      <motion.div className={styles.scene} style={{ x: parallaxX, y: parallaxY }}>
        <div className={styles.windowFrame} />
        <div className={`${styles.mountain} ${styles.mountainFar}`} />
        <div className={`${styles.mountain} ${styles.mountainNear}`} />
        <div className={styles.floorReflection} />
        <div className={styles.equipmentField}>
          <GiParkBench className={`${styles.equipment} ${styles.bench}`} />
          <GiMetalPlate className={`${styles.equipment} ${styles.plate}`} />
          <GiGymBag className={`${styles.equipment} ${styles.gymBag}`} />
        </div>
      </motion.div>

      <div className={styles.fog} />
      <div className={`${styles.ray} ${styles.rayOne}`} />
      <div className={`${styles.ray} ${styles.rayTwo}`} />
      <div className={styles.iconField}>
        <span className={`${styles.floatIcon} ${styles.iconOne}`} />
        <span className={`${styles.floatIcon} ${styles.iconTwo}`} />
        <span className={`${styles.floatIcon} ${styles.iconThree}`} />
      </div>

      <canvas ref={canvasRef} className={styles.particleCanvas} />
      <div className={styles.beam} />
      <div className={styles.vignette} />
    </div>
  )
}

export default AnimatedBackground