import { motion } from 'framer-motion'
import Avatar from '../../../components/common/Avatar'
import Badge from '../../../components/common/Badge'
import MemberBadges from './MemberBadges'
import MemberActionsMenu from './MemberActionsMenu'
import styles from './MemberCard.module.css'

const PAYMENT_TONE = { Paid: 'success', Pending: 'warning', Overdue: 'danger' }

function MemberCard({ member, index, onAction }) {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index, 10) * 0.03 }}
      whileHover={{ y: -3 }}
    >
      <div className={styles.top}>
        <div className={styles.identity}>
          <Avatar name={member.name} size={42} />
          <div>
            <p className={styles.name}>{member.name}</p>
            <p className={styles.mobile}>{member.mobile}</p>
          </div>
        </div>
        <MemberActionsMenu member={member} onAction={onAction} />
      </div>

      <MemberBadges member={member} />

      <div className={styles.details}>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Gender</span>
          <span className={styles.detailValue}>{member.gender}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Duration</span>
          <span className={styles.detailValue}>{member.membershipDuration}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Fee</span>
          <span className={styles.detailValue}>₹{member.membershipFee.toLocaleString()}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Join Date</span>
          <span className={styles.detailValue}>{member.joinDate}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Expiry Date</span>
          <span className={styles.detailValue}>{member.expiryDate}</span>
        </div>
      </div>

      <div className={styles.footer}>
        <Badge label={member.paymentStatus} tone={PAYMENT_TONE[member.paymentStatus] || 'neutral'} />
      </div>
    </motion.div>
  )
}

export default MemberCard