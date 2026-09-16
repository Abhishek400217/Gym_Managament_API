import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Bell } from 'lucide-react'
import styles from './Header.module.css'

// renewalAlertCount: number of members due for renewal in the next 7 days
const RENEWAL_ALERT_COUNT = 8

// Global TopBar — theme toggle removed (dark mode only). Shows live date/time, renewal alerts, and user avatar.
function Header({ userName = 'Abhishek' }) {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const timeString = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
  const dateString = now.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <header className={styles.header}>
      {/* Left: Date + Time */}
      <div className={styles.dateTime}>
        <span className={styles.date}>{dateString}</span>
        <span className={styles.time}>{timeString}</span>
      </div>

      {/* Right: Renewal Alert + User Avatar */}
      <div className={styles.actions}>
        <motion.div
          className={styles.renewalAlert}
          whileHover={{ y: -2 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          title="Members up for renewal soon"
        >
          <Bell size={14} className={styles.bellIcon} aria-hidden="true" />
          <span>Renewal Alerts: <strong>{RENEWAL_ALERT_COUNT}</strong> Members</span>
        </motion.div>

        <div className={styles.profileCircle} aria-hidden="true">
          {userName.charAt(0)}
        </div>
      </div>
    </header>
  )
}

export default Header