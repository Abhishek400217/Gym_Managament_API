import { useState } from 'react'
import SceneBackground from '../../../background/SceneBackground'
import EquipmentSilhouettes from '../../../background/EquipmentSilhouettes'
import LightRays from '../../../background/LightRays'
import DustParticles from '../../../background/DustParticles'
import ForegroundBokeh from '../../../background/ForegroundBokeh'
import CursorGlow from '../../../components/effects/CursorGlow'
import LoginCard from '../components/LoginCard'
import BrandMark from '../components/BrandMark'
import LoginForm from '../components/LoginForm'
import styles from './LoginPage.module.css'

// To swap in a real photographed gym interior (recommended for production): drop a licensed, self-hosted
// photo at src/assets/gym-hero.jpg, import it, and pass it below. No other file needs to change.
const gymPhotoUrl = undefined

function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleLogin = (formData) => {
    // Simulated for now — replaced with the real Axios call in Feature 3.
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
    <div className={styles.pageWrapper}>
      <SceneBackground photoUrl={gymPhotoUrl} />
      <EquipmentSilhouettes />
      <LightRays />
      <DustParticles />
      <ForegroundBokeh />
      <CursorGlow />

      <LoginCard>
        <BrandMark />
        <LoginForm onSubmit={handleLogin} loading={loading} success={success} />
      </LoginCard>
    </div>
  )
}

export default LoginPage