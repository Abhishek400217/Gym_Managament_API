import { motion } from 'framer-motion'
import { Banknote, Smartphone, CreditCard } from 'lucide-react'
import Avatar from '../../../components/common/Avatar'
import Badge from '../../../components/common/Badge'
import { getPaymentStatus } from '../../../utils/paymentStatus'
import styles from './PaymentCard.module.css'

const STATUS_TONE = { Paid: 'success', Pending: 'warning', Overdue: 'danger' }
const METHOD_ICON = { Cash: Banknote, UPI: Smartphone, Card: CreditCard }

function PaymentCard({ payment, index, onOpenHistory }) {
    const status = getPaymentStatus(payment)
    const MethodIcon = payment.method ? METHOD_ICON[payment.method] : null

    return (
        <motion.button
            type="button"
            className={styles.card}
            onClick={onOpenHistory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: Math.min(index, 10) * 0.03 }}
            whileHover={{ y: -3 }}
        >
            <div className={styles.top}>
                <div className={styles.identity}>
                    <Avatar name={payment.memberName} size={40} />
                    <div>
                        <p className={styles.name}>{payment.memberName}</p>
                        <p className={styles.mobile}>{payment.mobile}</p>
                    </div>
                </div>
                <Badge label={status} tone={STATUS_TONE[status]} pulse={status === 'Overdue'} />
            </div>

            <div className={styles.details}>
                <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Plan</span>
                    <span className={styles.detailValue}>{payment.planLabel}</span>
                </div>
                <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Amount</span>
                    <span className={styles.detailValue}>₹{payment.amount.toLocaleString()}</span>
                </div>
                <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Method</span>
                    <span className={styles.detailValue}>
                        {payment.method ? (
                            <span className={styles.methodCell}>
                                {MethodIcon && <MethodIcon size={12} aria-hidden="true" />}
                                {payment.method}
                            </span>
                        ) : '—'}
                    </span>
                </div>
                <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Next Due</span>
                    <span className={styles.detailValue}>{payment.nextDueDateLabel}</span>
                </div>
            </div>
        </motion.button>
    )
}

export default PaymentCard