import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiActivity, FiArrowUpRight, FiShield } from 'react-icons/fi'
import AnimatedBackground from '../../../background/AnimatedBackground'
import CursorGlow from '../../../components/effects/CursorGlow'
import LoginCard from '../components/LoginCard'
import LoginForm from '../components/LoginForm'
import { useTypingEffect } from '../../../hooks/useTypingEffect'
import styles from './LoginPage.module.css'

const subtitleText = 'Your training floor, intelligently managed.'

function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const typedSubtitle = useTypingEffect(subtitleText, 35)

  const handleLogin = (formData) => {
    // Simulated for now so the UI states are visible — replaced with the real Axios call in Feature 3.
    setLoading(true)
    setSuccess(false)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      console.log('Login submitted:', formData)
      setTimeout(() => setSuccess(false), 1600)
    }, 1400)
  }

  return (
    <main className={styles.pageWrapper}>
      <AnimatedBackground />
      <CursorGlow />

      <motion.div
        className={styles.brand}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.span
          className={styles.brandMark}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FiActivity className={styles.brandIcon} aria-hidden="true" />
        </motion.span>
        <span className={styles.brandName}>PULSEFIT <small>STUDIO OS</small></span>
      </motion.div>

      <div className={styles.contentGrid}>
        <motion.section
          className={styles.intro}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className={styles.eyebrow}>OPERATIONS / MEMBER EXPERIENCE</p>
          <h1 className={styles.heading}>The quiet power behind every <em>stronger</em> day.</h1>
          <p className={styles.subtitle}>{typedSubtitle}<span className={styles.caret} /></p>
          <div className={styles.introRule} />
          <div className={styles.introMeta}><FiShield aria-hidden="true" /><span>Private, secure access for your team</span></div>
        </motion.section>

        <LoginCard>
          <div className={styles.cardKicker}><span /> MEMBER PORTAL <span /></div>
          <h2 className={styles.cardHeading}>Welcome back.</h2>
          <p className={styles.cardSubheading}>Sign in to continue to your studio.</p>
          <div className={styles.divider}><span /></div>

          <LoginForm onSubmit={handleLogin} loading={loading} success={success} />

          <p className={styles.footerText}>
            Forgot your access details? <a href="#support" className={styles.link}>Contact your gym admin <FiArrowUpRight aria-hidden="true" /></a>
          </p>
        </LoginCard>
      </div>

      <footer className={styles.footer}>PULSEFIT STUDIO OS <span>•</span> BUILT FOR BETTER DAYS <span>•</span> 2026</footer>
    </main>
  )
}

export default LoginPage