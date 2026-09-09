import { motion } from 'framer-motion'
import ActionButton from './ActionButton'
import styles from './EmptyState.module.css'

// Reusable empty-state block: illustration + headline + subtext + optional primary action. Used here for
// "no members yet" / "no search matches" — reusable later for Payments, Attendance, Reports, etc.
function EmptyState({ headline, subtext, actionLabel, onAction, icon: Icon }) {
  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.illustration} aria-hidden="true">
        <svg viewBox="0 0 160 160" className={styles.svg}>
          <circle cx="80" cy="80" r="78" stroke="url(#emptyRing)" strokeWidth="1.5" strokeDasharray="4 6" fill="none" />
          <circle cx="80" cy="80" r="54" fill="rgba(79,140,255,0.08)" />
          <rect x="52" y="64" width="56" height="42" rx="10" fill="rgba(79,140,255,0.16)" stroke="rgba(79,140,255,0.4)" strokeWidth="1.5" />
          <circle cx="80" cy="82" r="9" fill="rgba(79,140,255,0.5)" />
          <path d="M64 100c3-8 9-12 16-12s13 4 16 12" stroke="rgba(79,140,255,0.6)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <defs>
            <linearGradient id="emptyRing" x1="0" y1="0" x2="160" y2="160">
              <stop offset="0%" stopColor="#4F8CFF" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#4F8CFF" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <h3 className={styles.headline}>{headline}</h3>
      <p className={styles.subtext}>{subtext}</p>

      {actionLabel && (
        <div className={styles.actionWrap}>
          <ActionButton icon={Icon} onClick={onAction}>{actionLabel}</ActionButton>
        </div>
      )}
    </motion.div>
  )
}

export default EmptyState