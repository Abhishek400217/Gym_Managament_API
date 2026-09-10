import { useEffect, useMemo, useState } from 'react'
import Drawer from '../../../components/common/Drawer'
import Select from '../../../components/common/Select'
import ActionButton from '../../../components/common/ActionButton'
import { useMembers } from '../../../context/MembersContext'
import { usePlans } from '../../../context/PlansContext'
import { sortPlansForDisplay } from '../../../utils/planOrdering'
import styles from './MemberRenewDrawer.module.css'

function addDaysToDate(days) {
    const d = new Date()
    d.setDate(d.getDate() + days)
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

// Renew / Update Membership drawer — lets the admin pick a new plan for an existing member.
// mode='renew' | 'upgrade' — both do the same thing but show different titles/labels.
function MemberRenewDrawer({ open, onClose, member, mode = 'renew' }) {
    const { updateMember } = useMembers()
    const { plans } = usePlans()

    const sortedPlans = useMemo(() => sortPlansForDisplay(plans), [plans])
    const planOptions = sortedPlans.map((p) => ({
        value: String(p.months),
        label: `${p.name} — ₹${p.price.toLocaleString()}`,
    }))

    const [selectedPlanMonths, setSelectedPlanMonths] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        if (!open) return
        // Pre-select current plan if possible
        if (member) {
            const matched = sortedPlans.find((p) =>
                member.membershipDuration?.toLowerCase().includes(
                    p.months === 12 ? 'year' : `${p.months} month`
                )
            )
            setSelectedPlanMonths(matched ? String(matched.months) : '')
        } else {
            setSelectedPlanMonths('')
        }
        setError('')
    }, [open, member])

    const selectedPlan = sortedPlans.find((p) => String(p.months) === selectedPlanMonths)
    const newExpiry = selectedPlanMonths ? addDaysToDate(Number(selectedPlanMonths) * 30) : null

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!selectedPlanMonths) { setError('Please select a plan'); return }
        if (!selectedPlan) { setError('Selected plan not found'); return }

        updateMember(member.id, {
            membershipDuration: selectedPlan.name,
            membershipFee: selectedPlan.price,
            expiryDate: newExpiry,
            paymentStatus: 'Paid',
            isExpiringSoon: false,
            isPendingPayment: false,
        })
        onClose()
    }

    if (!member) return null

    const title = mode === 'upgrade' ? 'Update Membership' : 'Renew Membership'
    const actionLabel = mode === 'upgrade' ? 'Update Plan' : 'Renew Now'

    return (
        <Drawer open={open} onClose={onClose} title={title}>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
                {/* Current member info */}
                <div className={styles.memberInfo}>
                    <p className={styles.memberName}>{member.name}</p>
                    <p className={styles.memberCurrent}>
                        Current: {member.membershipDuration} · Expires {member.expiryDate}
                    </p>
                </div>

                <Select
                    id="renew-plan"
                    label="New Membership Plan"
                    value={selectedPlanMonths}
                    onChange={(val) => { setSelectedPlanMonths(val); setError('') }}
                    options={planOptions}
                    placeholder="Select a plan"
                    error={error}
                />

                {selectedPlan && newExpiry && (
                    <div className={styles.summary}>
                        <div className={styles.summaryRow}>
                            <span className={styles.summaryLabel}>Plan</span>
                            <span className={styles.summaryValue}>{selectedPlan.name}</span>
                        </div>
                        <div className={styles.summaryRow}>
                            <span className={styles.summaryLabel}>Amount</span>
                            <span className={styles.summaryValue}>₹{selectedPlan.price.toLocaleString()}</span>
                        </div>
                        <div className={styles.summaryRow}>
                            <span className={styles.summaryLabel}>New Expiry</span>
                            <span className={styles.summaryValue}>{newExpiry}</span>
                        </div>
                    </div>
                )}

                <div className={styles.actions}>
                    <ActionButton variant="secondary" type="button" onClick={onClose}>Cancel</ActionButton>
                    <ActionButton type="submit">{actionLabel}</ActionButton>
                </div>
            </form>
        </Drawer>
    )
}

export default MemberRenewDrawer
