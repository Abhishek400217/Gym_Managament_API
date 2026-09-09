import styles from './Badge.module.css'

// Generic status pill reused for payment status, membership flags, and anywhere else the app needs a small
// colored label. `tone` maps to the same success/warning/danger/accent palette used across the dashboard.
function Badge({ label, tone = 'neutral', icon: Icon }) {
  return (
    <span className={`${styles.badge} ${styles[tone]}`}>
      {Icon && <Icon className={styles.icon} aria-hidden="true" />}
      {label}
    </span>
  )
}

export default Badge