import { useEffect, useState } from 'react'
import Drawer from '../../../components/common/Drawer'
import FormField from '../../../components/common/FormField'
import Select from '../../../components/common/Select'
import ActionButton from '../../../components/common/ActionButton'
import { useMembers } from '../../../context/MembersContext'
import { usePlans } from '../../../context/PlansContext'
import { sortPlansForDisplay } from '../../../utils/planOrdering'
import styles from './MemberFormDrawer.module.css'

const GENDER_OPTIONS = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' },
]

function getTodayStr() {
    const d = new Date()
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

function addDaysToDate(dateStr, days) {
    // dateStr: "10 Sep 2026"
    const d = new Date(dateStr)
    if (isNaN(d)) return dateStr
    d.setDate(d.getDate() + days)
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

// Handles both Add (mode='add') and Edit (mode='edit') flows.
// In edit mode, fields are pre-filled from the existing member object.
function MemberFormDrawer({ open, onClose, mode = 'add', member = null }) {
    const { addMember, updateMember } = useMembers()
    const { plans } = usePlans()

    const sortedPlans = sortPlansForDisplay(plans)
    const planOptions = sortedPlans.map((p) => ({
        value: String(p.months),
        label: `${p.name} — ₹${p.price.toLocaleString()}`,
        months: p.months,
        price: p.price,
    }))

    const getDefaultForm = () => ({
        name: '',
        mobile: '',
        gender: '',
        planMonths: '',
        joinDate: getTodayStr(),
    })

    const [form, setForm] = useState(getDefaultForm)
    const [errors, setErrors] = useState({})

    // Pre-fill from member when editing
    useEffect(() => {
        if (!open) return
        if (mode === 'edit' && member) {
            const matchedPlan = sortedPlans.find((p) =>
                member.membershipDuration?.toLowerCase().includes(
                    p.months === 12 ? 'year' : `${p.months} month`
                )
            )
            setForm({
                name: member.name || '',
                mobile: member.mobile || '',
                gender: member.gender || '',
                planMonths: matchedPlan ? String(matchedPlan.months) : '',
                joinDate: member.joinDate || getTodayStr(),
            })
        } else {
            setForm(getDefaultForm())
        }
        setErrors({})
    }, [open, mode, member])

    const set = (field) => (val) => {
        setForm((prev) => ({ ...prev, [field]: val }))
        setErrors((prev) => ({ ...prev, [field]: undefined }))
    }

    const handleFieldChange = (field) => (e) => set(field)(e.target.value)

    const validate = () => {
        const errs = {}
        if (!form.name.trim()) errs.name = 'Name is required'
        if (!form.mobile.trim()) errs.mobile = 'Mobile is required'
        if (!form.gender) errs.gender = 'Select a gender'
        if (!form.planMonths) errs.planMonths = 'Select a membership plan'
        return errs
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const errs = validate()
        if (Object.keys(errs).length > 0) { setErrors(errs); return }

        const selectedPlan = sortedPlans.find((p) => String(p.months) === form.planMonths)
        const months = Number(form.planMonths)
        const expiryDate = addDaysToDate(form.joinDate, months * 30)
        const memberData = {
            name: form.name.trim(),
            mobile: form.mobile.trim(),
            gender: form.gender,
            membershipDuration: selectedPlan ? selectedPlan.name : `${months} Month(s)`,
            membershipFee: selectedPlan ? selectedPlan.price : 0,
            joinDate: form.joinDate,
            expiryDate,
        }

        if (mode === 'edit' && member) {
            updateMember(member.id, memberData)
        } else {
            addMember(memberData)
        }
        onClose()
    }

    return (
        <Drawer open={open} onClose={onClose} title={mode === 'edit' ? 'Edit Member' : 'Add Member'}>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <FormField
                    id="member-name"
                    label="Full Name"
                    value={form.name}
                    onChange={handleFieldChange('name')}
                    placeholder="e.g. Rahul Sharma"
                    error={errors.name}
                />
                <FormField
                    id="member-mobile"
                    label="Mobile Number"
                    value={form.mobile}
                    onChange={handleFieldChange('mobile')}
                    placeholder="+91 9XXXXXXXXX"
                    error={errors.mobile}
                />
                <Select
                    id="member-gender"
                    label="Gender"
                    value={form.gender}
                    onChange={set('gender')}
                    options={GENDER_OPTIONS}
                    placeholder="Select gender"
                    error={errors.gender}
                />
                <Select
                    id="member-plan"
                    label="Membership Plan"
                    value={form.planMonths}
                    onChange={set('planMonths')}
                    options={planOptions}
                    placeholder="Select a plan"
                    error={errors.planMonths}
                />
                {form.planMonths && (
                    <div className={styles.derived}>
                        <span className={styles.derivedLabel}>Join Date</span>
                        <span className={styles.derivedValue}>{form.joinDate}</span>
                        <span className={styles.derivedLabel}>Expiry Date</span>
                        <span className={styles.derivedValue}>
                            {addDaysToDate(form.joinDate, Number(form.planMonths) * 30)}
                        </span>
                        <span className={styles.derivedLabel}>Fee</span>
                        <span className={styles.derivedValue}>
                            ₹{(sortedPlans.find((p) => String(p.months) === form.planMonths)?.price || 0).toLocaleString()}
                        </span>
                    </div>
                )}
                <div className={styles.actions}>
                    <ActionButton variant="secondary" type="button" onClick={onClose}>Cancel</ActionButton>
                    <ActionButton type="submit">{mode === 'edit' ? 'Save Changes' : 'Add Member'}</ActionButton>
                </div>
            </form>
        </Drawer>
    )
}

export default MemberFormDrawer
