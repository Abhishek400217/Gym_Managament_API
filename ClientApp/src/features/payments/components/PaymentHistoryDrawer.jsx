import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Trash2 } from 'lucide-react'
import Drawer from '../../../components/common/Drawer'
import Badge from '../../../components/common/Badge'
import { usePayments } from '../../../context/PaymentsContext'
import { getPaymentStatus } from '../../../utils/paymentStatus'
import styles from './PaymentHistoryDrawer.module.css'

const STATUS_TONE = { Paid: 'success', Pending: 'warning', Overdue: 'danger' }

// Full chronological timeline for one member, opened by clicking their row/card. Delete lives here — not in
// the main table, which explicitly has no Actions column — guarded by the page's ConfirmDialog.
function PaymentHistoryDrawer({ memberId, open, onClose, onDeleteRequest }) {
    const { payments } = usePayments()

    const memberPayments = useMemo(() => {
        if (!memberId) return []
        return payments
            .filter((p) => p.memberId === memberId)
            .slice()
            .sort((a, b) => new Date(a.paymentDate || a.nextDueDate) - new Date(b.paymentDate || b.nextDueDate))
    }, [payments, memberId])

    const memberName = memberPayments[0]?.memberName || ''

    return (
        <Drawer open={open} onClose={onClose} title={memberName ? `${memberName} — Payment History` : 'Payment History'}>
            {memberPayments.length === 0 && <p className={styles.emptyText}>No payment records for this member.</p>}

            <div className={styles.timeline}>
                {memberPayments.map((payment, index) => {
                    const status = getPaymentStatus(payment)
                    return (
                        <motion.div
                            key={payment.id}
                            className={styles.row}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.25, delay: index * 0.04 }}
                        >
                            <div className={styles.markerColumn}>
                                <span className={`${styles.dot} ${styles[STATUS_TONE[status]]}`} />
                                {index < memberPayments.length - 1 && <span className={styles.line} />}
                            </div>

                            <div className={styles.content}>
                                <div className={styles.top}>
                                    <Badge label={status} tone={STATUS_TONE[status]} pulse={status === 'Overdue'} />
                                    <button type="button" className={styles.deleteButton} onClick={() => onDeleteRequest(payment)} aria-label="Delete this payment record">
                                        <Trash2 size={13} aria-hidden="true" />
                                    </button>
                                </div>
                                <p className={styles.amount}>₹{payment.amount.toLocaleString()}</p>
                                <p className={styles.plan}>{payment.planLabel}</p>
                                <p className={styles.date}>
                                    {status === 'Paid' ? `Paid on ${payment.paymentDateLabel}` : `Due on ${payment.nextDueDateLabel}`}
                                </p>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </Drawer>
    )
}

export default PaymentHistoryDrawer