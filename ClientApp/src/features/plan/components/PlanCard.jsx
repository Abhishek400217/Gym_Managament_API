import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Pencil, Trash2, Users, Check, X } from 'lucide-react'
import Badge from '../../../components/common/Badge'
import { isCustomDuration } from '../../../utils/planOrdering'
import styles from './PlanCard.module.css'

// Delete is a two-step confirm (click arms it, click the check to confirm, click X or wait 4s to cancel) —
// avoids a native confirm() dialog and avoids a separate modal for a single destructive button.
function PlanCard({ plan, index, onEdit, onDelete }) {
    const [confirming, setConfirming] = useState(false)
    const [blockedMessage, setBlockedMessage] = useState('')
    const timeoutRef = useRef(null)

    useEffect(() => () => clearTimeout(timeoutRef.current), [])

    const handleDeleteClick = () => {
        if (!confirming) {
            setConfirming(true)
            timeoutRef.current = setTimeout(() => setConfirming(false), 4000)
            return
        }
        const result = onDelete(plan.id)
        setConfirming(false)
        if (!result.success) {
            setBlockedMessage(result.error)
            timeoutRef.current = setTimeout(() => setBlockedMessage(''), 4000)
        }
    }

    const cancelConfirm = () => {
        clearTimeout(timeoutRef.current)
        setConfirming(false)
    }

    return (
        <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, delay: Math.min(index, 8) * 0.05, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -5 }}
        >
            <div className={styles.top}>
                <div>
                    <p className={styles.duration}>{plan.name}</p>
                    <p className={styles.description}>{plan.description}</p>
                </div>
                {isCustomDuration(plan.months) && <Badge label="Custom" tone="accent" />}
            </div>

            <p className={styles.price}>
                ₹{plan.price.toLocaleString()}
                <span className={styles.priceUnit}>/ plan</span>
            </p>

            <div className={styles.footer}>
                <span className={styles.memberCount}>
                    <Users size={14} aria-hidden="true" />
                    {plan.memberCount.toLocaleString()} Member{plan.memberCount === 1 ? '' : 's'}
                </span>

                <div className={styles.buttons}>
                    <button type="button" className={styles.editButton} onClick={() => onEdit(plan)}>
                        <Pencil size={14} aria-hidden="true" />
                        Edit
                    </button>

                    {confirming ? (
                        <div className={styles.confirmRow}>
                            <button type="button" className={styles.confirmYes} onClick={handleDeleteClick} aria-label="Confirm delete">
                                <Check size={14} aria-hidden="true" />
                            </button>
                            <button type="button" className={styles.confirmNo} onClick={cancelConfirm} aria-label="Cancel delete">
                                <X size={14} aria-hidden="true" />
                            </button>
                        </div>
                    ) : (
                        <button type="button" className={styles.deleteButton} onClick={handleDeleteClick}>
                            <Trash2 size={14} aria-hidden="true" />
                            Delete
                        </button>
                    )}
                </div>
            </div>

            {blockedMessage && (
                <motion.p
                    className={styles.blockedMessage}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="alert"
                >
                    {blockedMessage}
                </motion.p>
            )}
        </motion.div>
    )
}

export default PlanCard