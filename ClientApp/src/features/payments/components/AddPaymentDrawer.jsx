import { useEffect, useState } from 'react'
import Drawer from '../../../components/common/Drawer'
import Select from '../../../components/common/Select'
import ActionButton from '../../../components/common/ActionButton'
import { usePayments } from '../../../context/PaymentsContext'
import { getPaymentStatus } from '../../../utils/paymentStatus'
import styles from './AddPaymentDrawer.module.css'

const METHOD_OPTIONS = [
    { value: 'Cash', label: 'Cash' },
    { value: 'UPI', label: 'UPI' },
    { value: 'Card', label: 'Card' },
]

// Member dropdown drives everything else. Plan, Amount, and Due Date are derived and shown read-only — per
// spec, amount is never editable and there's no partial/advance payment. If the selected member is already
// paid up (not due), the Payment Method field and Confirm button are hidden entirely rather than letting
// the owner hit an error after the fact.
function AddPaymentDrawer({ open, onClose }) {
    const { paymentMembers, getCurrentRecordForMember, addPayment } = usePayments()

    const [memberId, setMemberId] = useState('')
    const [method, setMethod] = useState('')
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (!open) return
        setMemberId('')
        setMethod('')
        setErrors({})
    }, [open])

    const memberOptions = paymentMembers.map((mem) => ({ value: mem.id, label: mem.name }))
    const reference = memberId ? getCurrentRecordForMember(memberId) : null
    const referenceStatus = reference ? getPaymentStatus(reference) : null
    const isUpToDate = referenceStatus === 'Paid'

    const handleSubmit = (e) => {
        e.preventDefault()
        const nextErrors = {}
        if (!memberId) nextErrors.member = 'Select a member'
        if (!isUpToDate && !method) nextErrors.method = 'Select a payment method'
        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors)
            return
        }

        const result = addPayment({ memberId, method })
        if (!result.success) {
            setErrors({ member: result.error })
            return
        }
        onClose()
    }

    return (
        <Drawer open={open} onClose={onClose} title="Add Payment">
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <Select
                    id="payment-member"
                    label="Member"
                    value={memberId}
                    onChange={(val) => {
                        setMemberId(val)
                        setMethod('')
                        setErrors({})
                    }}
                    options={memberOptions}
                    placeholder="Select a member"
                    error={errors.member}
                />

                {reference && (
                    <div className={styles.autoFill}>
                        <div className={styles.autoFillRow}>
                            <span className={styles.autoFillLabel}>Membership Plan</span>
                            <span className={styles.autoFillValue}>{reference.planLabel}</span>
                        </div>
                        <div className={styles.autoFillRow}>
                            <span className={styles.autoFillLabel}>Amount</span>
                            <span className={styles.autoFillValue}>₹{reference.amount.toLocaleString()}</span>
                        </div>
                        <div className={styles.autoFillRow}>
                            <span className={styles.autoFillLabel}>{isUpToDate ? 'Active Until' : 'Due Date'}</span>
                            <span className={styles.autoFillValue}>{reference.nextDueDateLabel}</span>
                        </div>
                    </div>
                )}

                {reference && isUpToDate && (
                    <p className={styles.upToDateNote}>
                        This membership is already active — no payment is due yet. Advance payments aren't allowed.
                    </p>
                )}

                {reference && !isUpToDate && (
                    <Select
                        id="payment-method"
                        label="Payment Method"
                        value={method}
                        onChange={(val) => {
                            setMethod(val)
                            setErrors((prev) => ({ ...prev, method: undefined }))
                        }}
                        options={METHOD_OPTIONS}
                        placeholder="Select payment method"
                        error={errors.method}
                    />
                )}

                <div className={styles.actions}>
                    <ActionButton variant="secondary" type="button" onClick={onClose}>Cancel</ActionButton>
                    {reference && !isUpToDate && <ActionButton type="submit">Confirm Payment</ActionButton>}
                </div>
            </form>
        </Drawer>
    )
}

export default AddPaymentDrawer