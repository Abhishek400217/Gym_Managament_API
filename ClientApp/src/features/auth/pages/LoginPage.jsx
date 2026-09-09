import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import SceneBackground from '../../../background/SceneBackground'
import LightRays from '../../../background/LightRays'
import DustParticles from '../../../background/DustParticles'
import LoginCard from '../components/LoginCard'
import BrandMark from '../components/BrandMark'
import LoginForm from '../components/LoginForm'
import styles from './LoginPage.module.css'

// Real, freely-licensed photo (Unsplash License — free for commercial use, no attribution required).
// "Dark gym interior with exercise equipment and weight machines" by Salman Sidheek, via Unsplash.
// For production: download once and self-host from src/assets instead of hotlinking Unsplash's CDN.
const gymPhotoUrl =
  'https://images.unsplash.com/photo-1778828494354-9b717d36dc99?fm=jpg&q=80&w=2400&auto=format&fit=crop&ixlib=rb-4.1.0'

function LoginPage() {
  const [authError, setAuthError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (!authError) return undefined
    const timeoutId = setTimeout(() => setAuthError(''), 3000)
    return () => clearTimeout(timeoutId)
  }, [authError])

  const handleLogin = (formData) => {
    if (formData.username === 'abhishek14' && formData.password === '12345') {
      navigate('/dashboard')
      return
    }

    setAuthError('Invalid Username or Password')
  }

  return (
    <div className={styles.pageWrapper}>
      <SceneBackground photoUrl={gymPhotoUrl} />
      <LightRays />
      <DustParticles />

      <AnimatePresence>
        {authError && (
          <motion.div
            className={styles.authToast}
            role="alert"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {authError}
          </motion.div>
        )}
      </AnimatePresence>

      <LoginCard>
        <BrandMark />
        <LoginForm onSubmit={handleLogin} />
      </LoginCard>
    </div>
  )
}

export default LoginPage