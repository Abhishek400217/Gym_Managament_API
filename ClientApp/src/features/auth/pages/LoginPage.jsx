import { useState } from 'react'
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

      <LoginCard>
        <BrandMark />
        <LoginForm onSubmit={handleLogin} authError={authError} />
      </LoginCard>
    </div>
  )
}

export default LoginPage