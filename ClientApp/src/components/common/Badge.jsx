import styles from './Badge.module.css'

// `pulse` is new and optional (default false) — every existing call site (Members, Plans) renders exactly
// as before. Only the Payments module's Overdue badges pass pulse={true}.
function Badge({ label, tone = 'neutral', icon: Icon, pulse = false }) {
  return (
    <span className={`${styles.badge} ${styles[tone]} ${pulse ? styles.pulse : ''}`}>
      {Icon && <Icon className={styles.icon} aria-hidden="true" />}
      {label}
    </span>
  )
}

export default Badge