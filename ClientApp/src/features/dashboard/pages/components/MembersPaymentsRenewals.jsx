import { motion } from 'framer-motion'
import { Clock, IndianRupee } from 'lucide-react'
import { latestPayments, newMembers, upcomingRenewals } from '../../../../data/dashboardData'
import styles from './MembersPaymentsRenewals.module.css'

function MembersPaymentsRenewals({ searchQuery = '' }) {
  const query = searchQuery.trim().toLowerCase()
  const matches = (item) => !query || Object.values(item).some((value) => String(value).toLowerCase().includes(query))
  const members = newMembers.filter(matches)
  const payments = latestPayments.filter(matches)

  return (
    <div className={styles.grid}>
      <motion.section className={styles.panel} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <div className={styles.headingRow}><div><p className={styles.kicker}>MEMBER GROWTH</p><h2>New Members</h2></div><span className={styles.count}>{members.length}</span></div>
        <div className={styles.memberList}>
          {members.map((member) => (
            <div className={styles.memberRow} key={member.id}>
              <span className={styles.avatar}>{member.initials}</span>
              <div className={styles.details}><strong>{member.name}</strong><span>{member.duration}</span><small>Joined {member.joined}</small></div>
              <b>₹{member.amount.toLocaleString('en-IN')}</b>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className={styles.panel} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.06 }}>
        <div className={styles.headingRow}><div><p className={styles.kicker}>CASH FLOW</p><h2>Latest Payments</h2></div><IndianRupee className={styles.headingIcon} /></div>
        <div className={styles.paymentList}>
          {payments.map((payment) => (
            <div className={styles.paymentRow} key={payment.id}>
              <span className={styles.avatar}>{payment.name.split(' ').map((part) => part[0]).join('')}</span><div className={styles.paymentMain}><strong>{payment.name}</strong><span>{payment.duration}</span><small>{payment.method} · {payment.time}</small></div>
              <b>₹{payment.amount.toLocaleString('en-IN')}</b>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className={`${styles.panel} ${styles.renewals}`} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.12 }}>
        <div className={styles.headingRow}><div><p className={styles.kicker}>RETENTION</p><h2>Upcoming Renewals</h2></div><Clock className={styles.headingIcon} /></div>
        <div className={styles.renewalList}>
          {upcomingRenewals.map((item) => <div className={styles.renewalRow} key={item.id}><span className={styles.avatar}>{item.initials}</span><div className={styles.details}><strong>{item.name}</strong><span>{item.duration}</span><small>Paid ₹{item.amount.toLocaleString('en-IN')} · Expires {item.expiry}</small></div><b className={item.daysLeft <= 3 ? styles.urgent : ''}>{item.daysLeft} Days Left</b></div>)}
        </div>
      </motion.section>
    </div>
  )
}

export default MembersPaymentsRenewals
