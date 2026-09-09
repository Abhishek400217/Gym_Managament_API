import { motion } from 'framer-motion'
import { Clock, IndianRupee } from 'lucide-react'
import { upcomingRenewals, latestPayments } from '../../../../data/dashboardData'
import styles from './RenewalsAndPayments.module.css'

// Two related lists side by side: who's renewing soon, and who just paid. One component because they're
// read together at a glance and share the same visual language (avatar + label + trailing value).
function RenewalsAndPayments() {
  return (
    <div className={styles.wrapper}>
      <motion.section
        className={styles.panel}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className={styles.heading}>Upcoming Renewals</h2>
        <div className={styles.list}>
          {upcomingRenewals.map((item) => (
            <div key={item.id} className={styles.row}>
              <span className={styles.avatar}>{item.initials}</span>
              <div className={styles.info}>
                <p className={styles.name}>{item.name}</p>
                <p className={styles.sub}>{item.plan} Plan</p>
              </div>
              <span className={`${styles.daysLeft} ${item.daysLeft <= 3 ? styles.urgent : ''}`}>
                <Clock className={styles.clockIcon} aria-hidden="true" />
                {item.daysLeft}d
              </span>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        className={styles.panel}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4, delay: 0.08 }}
      >
        <h2 className={styles.heading}>Latest Payments</h2>
        <div className={styles.list}>
          {latestPayments.map((item) => (
            <div key={item.id} className={styles.row}>
              <span className={styles.avatar}>
                <IndianRupee className={styles.avatarIcon} aria-hidden="true" />
              </span>
              <div className={styles.info}>
                <p className={styles.name}>{item.name}</p>
                <p className={styles.sub}>{item.method} · {item.time}</p>
              </div>
              <span className={styles.amount}>₹{item.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  )
}

export default RenewalsAndPayments