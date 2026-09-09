import { motion } from 'framer-motion'
import { Banknote, Smartphone, CreditCard } from 'lucide-react'
import Avatar from '../../../components/common/Avatar'
import Badge from '../../../components/common/Badge'
import { getPaymentStatus } from '../../../utils/paymentStatus'
import styles from './PaymentRow.module.css'

const STATUS_TONE = { Paid: 'success', Pending: 'warning', Overdue: 'danger' }
const METHOD_ICON = { Cash: Banknote, UPI: Smartphone, Card: CreditCard }

// The whole row is clickable, opening that member's Payment History drawer — there's no Actions column per
// spec, so delete lives inside that drawer instead of here.
function PaymentRow({ payment, index, onClick }) {
    const status = getPaymentStatus(payment)
    const MethodIcon = payment.method ? METHOD_ICON[payment.method] : null

    return (
        <motion.tr
            className={styles.row}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: Math.min(index, 10) * 0.02 }}
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') onClick() }}
        >
            <td className={styles.td}>
                <div className={styles.memberCell}>
                    <Avatar name={payment.memberName} size={36} />
                    <div>
                        <p className={styles.name}>{payment.memberName}</p>
                        <Badge label={status} tone={STATUS_TONE[status]} pulse={status === 'Overdue'} />
                    </div>
                </div>
            </td>
            <td className={styles.td}>{payment.mobile}</td>
            <td className={styles.td}>{payment.planLabel}</td>
            <td className={styles.td}>₹{payment.amount.toLocaleString()}</td>
            <td className={styles.td}>
                {payment.method ? (
                    <span className={styles.methodCell}>
                        {MethodIcon && <MethodIcon size={13} aria-hidden="true" />}
                        {payment.method}
                    </span>
                ) : (
                    <span className={styles.dash}>—</span>
                )}
            </td>
            <td className={styles.td}>{payment.paymentDateLabel || <span className={styles.dash}>—</span>}</td>
            <td className={styles.td}>{payment.nextDueDateLabel}</td>
        </motion.tr>
    )
}

export default PaymentRow