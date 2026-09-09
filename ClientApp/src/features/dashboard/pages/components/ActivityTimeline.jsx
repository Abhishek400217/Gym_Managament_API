import { motion } from 'framer-motion'
import { UserPlus, Wallet, CheckSquare, CreditCard } from 'lucide-react'
import { recentActivity } from '../../../../data/dashboardData'
import styles from './ActivityTimeline.module.css'

const TYPE_CONFIG = {
  member: { Icon: UserPlus, tone: 'accent' },
  payment: { Icon: Wallet, tone: 'success' },
  attendance: { Icon: CheckSquare, tone: 'warning' },
  plan: { Icon: CreditCard, tone: 'accent' },
}

// Vertical timeline with a connecting line, avatar initials, and a colored icon badge per activity type —
// replaces the old flat list rows.
function ActivityTimeline() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Recent Activity</h2>
      <div className={styles.timeline}>
        {recentActivity.map((item, index) => {
          const { Icon, tone } = TYPE_CONFIG[item.type] || TYPE_CONFIG.member
          return (
            <motion.div
              key={item.id}
              className={styles.row}
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
            >
              <div className={styles.markerColumn}>
                <span className={`${styles.badge} ${styles[tone]}`}>
                  <Icon className={styles.badgeIcon} strokeWidth={1.8} aria-hidden="true" />
                </span>
                {index < recentActivity.length - 1 && <span className={styles.line} />}
              </div>

              <div className={styles.content}>
                <div className={styles.avatar}>{item.initials}</div>
                <div>
                  <p className={styles.text}>{item.text}</p>
                  <p className={styles.time}>{item.time}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

export default ActivityTimeline