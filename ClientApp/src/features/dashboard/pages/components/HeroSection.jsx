import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Sun, CloudSun, Circle } from 'lucide-react'
import { heroData } from '../../../../data/dashboardData'
import styles from './HeroSection.module.css'

// Large welcome banner. Time updates live via setInterval; weather is a static dummy value (no external
// weather API — outside "no API" scope). Swap heroData.weather for a real fetch when that's in scope.
function HeroSection({ userName = 'Abhishek' }) {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(id)
  }, [])

  const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  const dateString = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  const WeatherIcon = heroData.weather.condition === 'sunny' ? Sun : CloudSun

  return (
    <motion.section
      className={styles.hero}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.left}>
        <p className={styles.greeting}>Welcome back, {userName}</p>
        <h1 className={styles.dateTime}>{timeString} · {dateString}</h1>

        <div className={styles.statusRow}>
          <span className={`${styles.statusBadge} ${heroData.gymStatus === 'open' ? styles.statusOpen : styles.statusClosed}`}>
            <Circle className={styles.statusDot} aria-hidden="true" />
            Gym {heroData.gymStatus === 'open' ? 'Open' : 'Closed'}
          </span>
          <span className={styles.activeMembers}>{heroData.activeMembersNow} members active right now</span>
        </div>
      </div>

      <div className={styles.weather}>
        <WeatherIcon className={styles.weatherIcon} strokeWidth={1.5} aria-hidden="true" />
        <span className={styles.weatherTemp}>{heroData.weather.tempC}°C</span>
      </div>
    </motion.section>
  )
}

export default HeroSection