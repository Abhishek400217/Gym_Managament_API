import { motion } from 'framer-motion'
import Avatar from '../../../components/common/Avatar'
import Badge from '../../../components/common/Badge'
import MemberBadges from './MemberBadges'
import MemberActionsMenu from './MemberActionsMenu'
import styles from './MemberRow.module.css'

const PAYMENT_TONE = { Paid: 'success', Pending: 'warning', Overdue: 'danger' }

function MemberRow({ member, index, onAction }) {
  return (
    <motion.tr
      className={styles.row}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index, 10) * 0.02 }}
    >
      <td className={styles.td}>
        <div className={styles.memberCell}>
          <Avatar name={member.name} size={38} />
          <div>
            <p className={styles.name}>{member.name}</p>
            <MemberBadges member={member} />
          </div>
        </div>
      </td>
      <td className={styles.td}>{member.mobile}</td>
      <td className={styles.td}>{member.gender}</td>
      <td className={styles.td}>{member.membershipDuration}</td>
      <td className={styles.td}>₹{member.membershipFee.toLocaleString()}</td>
      <td className={styles.td}>{member.joinDate}</td>
      <td className={styles.td}>{member.expiryDate}</td>
      <td className={styles.td}>
        <Badge label={member.paymentStatus} tone={PAYMENT_TONE[member.paymentStatus] || 'neutral'} />
      </td>
      <td className={`${styles.td} ${styles.actionsCell}`}>
        <MemberActionsMenu member={member} onAction={onAction} />
      </td>
    </motion.tr>
  )
}

export default MemberRow