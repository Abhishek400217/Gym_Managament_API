import { useEffect, useMemo, useState } from 'react'
import Drawer from '../../../components/common/Drawer'
import Select from '../../../components/common/Select'
import ActionButton from '../../../components/common/ActionButton'
import { usePayments } from '../../../context/PaymentsContext'
import { usePlans } from '../../../context/PlansContext'
import { getPaymentStatus } from '../../../utils/paymentStatus'
import { addDays, formatDate } from '../../../utils/dateHelpers'
import { sortPlansForDisplay } from '../../../utils/planOrdering'
import styles from './AddPaymentDrawer.module.css'

const METHOD_OPTIONS = [
    { value: 'Cash', label: 'Cash' },
    { value: 'UPI', label: 'UPI' },
    { value: 'Card', label: 'Card' },
]

// Member dropdown → Plan dropdown (editable) → Amount/Due Date auto-compute from selected plan.
// On submit the chosen planMonths override is passed to addPayment() so the context records the new plan.
function AddPaymentDrawer({ open, onClose }) {
    const { paymentMembers, getCurrentRecordForMember, addPayment } = usePayments()
    const { plans } = usePlans()

    const [memberId, setMemberId] = useState('')
    const [selectedPlanMonths, setSelectedPlanMonths] = useState('')
    const [method, setMethod] = useState('')
    const [errors, setErrors] = useState({})

    // Reset on open
    useEffect(() => {
        if (!open) return
        setMemberId('')
        setSelectedPlanMonths('')
        setMethod('')
        setErrors({})
    }, [open])

    // Pre-fill plan from member's existing record when member changes
    useEffect(() => {
        if (!memberId) { setSelectedPlanMonths(''); return }
        const reference = getCurrentRecordForMember(memberId)
        if (reference) setSelectedPlanMonths(String(reference.planMonths))
    }, [memberId])

    const memberOptions = paymentMembers.map((mem) => ({ value: mem.id, label: mem.name }))

    // Plan dropdown options — sorted in standard order, Custom plans appended
    const sortedPlans = useMemo(() => sortPlansForDisplay(plans), [plans])
    const planOptions = sortedPlans.map((p) => ({
        value: String(p.months),
        label: `${p.name} — ₹${p.price.toLocaleString()}`,
    }))

    // Derive amount + due date from the currently selected plan
    const derivedInfo = useMemo(() => {
        if (!memberId || !selectedPlanMonths) return null
        const months = Number(selectedPlanMonths)
        const plan = plans.find((p) => p.months === months)
        const amount = plan ? plan.price : null
        const dueDate = formatDate(addDays(new Date(), months * 30))
        return { planLabel: plan ? plan.name : `${months} Month(s)`, amount, dueDate }
    }, [memberId, selectedPlanMonths, plans])

    const handleSubmit = (e) => {
        e.preventDefault()
        const nextErrors = {}
        if (!memberId) nextErrors.member = 'Select a member'
        if (!selectedPlanMonths) nextErrors.plan = 'Select a membership plan'
        if (!method) nextErrors.method = 'Select a payment method'
        if (Object.keys(nextErrors).length > 0) { setErrors(nextErrors); return }

        const result = addPayment({
            memberId,
            method,
            planMonths: Number(selectedPlanMonths),
        })
        if (!result.success) { setErrors({ member: result.error }); return }
        onClose()
    }

    return (
        <Drawer open={open} onClose={onClose} title="Add Payment">
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
                {/* 1 – Member */}
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

                {/* 2 – Membership Plan (editable) */}
                {memberId && (
                    <Select
                        id="payment-plan"
                        label="Membership Plan"
                        value={selectedPlanMonths}
                        onChange={(val) => {
                            setSelectedPlanMonths(val)
                            setErrors((prev) => ({ ...prev, plan: undefined }))
                        }}
                        options={planOptions}
                        placeholder="Select a plan"
                        error={errors.plan}
                    />
                )}

                {/* 3 – Auto-derived info */}
                {derivedInfo && (
                    <div className={styles.autoFill}>
                        <div className={styles.autoFillRow}>
                            <span className={styles.autoFillLabel}>Plan</span>
                            <span className={styles.autoFillValue}>{derivedInfo.planLabel}</span>
                        </div>
                        <div className={styles.autoFillRow}>
                            <span className={styles.autoFillLabel}>Amount</span>
                            <span className={styles.autoFillValue}>
                                {derivedInfo.amount !== null ? `₹${derivedInfo.amount.toLocaleString()}` : '—'}
                            </span>
                        </div>
                        <div className={styles.autoFillRow}>
                            <span className={styles.autoFillLabel}>Next Due Date</span>
                            <span className={styles.autoFillValue}>{derivedInfo.dueDate}</span>
                        </div>
                    </div>
                )}

                {/* 4 – Payment Method */}
                {memberId && selectedPlanMonths && (
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
                    {memberId && selectedPlanMonths && (
                        <ActionButton type="submit">Confirm Payment</ActionButton>
                    )}
                </div>
            </form>
        </Drawer>
    )
}

export default AddPaymentDrawer