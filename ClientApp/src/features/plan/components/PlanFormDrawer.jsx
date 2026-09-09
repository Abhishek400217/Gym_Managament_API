import { useEffect, useMemo, useState } from 'react'
import Drawer from '../../../components/common/Drawer'
import Select from '../../../components/common/Select'
import FormField from '../../../components/common/FormField'
import ActionButton from '../../../components/common/ActionButton'
import { usePlans } from '../../../context/PlansContext'
import { STANDARD_DURATIONS, formatDurationLabel } from '../../../utils/planOrdering'
import styles from './PlanFormDrawer.module.css'

const BASE_OPTIONS = STANDARD_DURATIONS.map((m) => ({ value: String(m), label: formatDurationLabel(m) }))
const ALL_OPTIONS = [...BASE_OPTIONS, { value: 'custom', label: 'Custom' }]

function resolveInitialSelection(plan) {
    if (!plan) return { durationSelection: '', customMonths: '' }
    const isStandard = STANDARD_DURATIONS.includes(plan.months)
    return isStandard
        ? { durationSelection: String(plan.months), customMonths: '' }
        : { durationSelection: 'custom', customMonths: String(plan.months) }
}

// Add mode: description is an auto-generated, read-only preview — the owner never types a plan name or
// description when creating. Edit mode: price, description, and duration are all editable per spec.
// Changing duration re-syncs the description to the new auto text UNLESS the owner already hand-edited it
// in this session (tracked via descriptionTouched) — simple, predictable, no diffing needed.
function PlanFormDrawer({ open, onClose, mode, plan }) {
    const { plans, addPlan, updatePlan } = usePlans()

    const [durationSelection, setDurationSelection] = useState('')
    const [customMonths, setCustomMonths] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [descriptionTouched, setDescriptionTouched] = useState(false)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (!open) return
        const initial = resolveInitialSelection(plan)
        setDurationSelection(initial.durationSelection)
        setCustomMonths(initial.customMonths)
        setPrice(plan ? String(plan.price) : '')
        setDescription(plan ? plan.description : '')
        setDescriptionTouched(false)
        setErrors({})
    }, [open, plan])

    const resolvedMonths = durationSelection === 'custom' ? Number(customMonths) : Number(durationSelection || 0)
    const autoDescription = resolvedMonths > 0 ? `Valid for ${formatDurationLabel(resolvedMonths)}` : ''

    useEffect(() => {
        if (mode === 'add') {
            setDescription(autoDescription)
        } else if (mode === 'edit' && !descriptionTouched) {
            setDescription(autoDescription)
        }
        // Reacting only to duration/mode — description edits are tracked via descriptionTouched instead, so
        // this doesn't re-fire on every keystroke in the description field.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resolvedMonths, mode])

    const durationOptions = useMemo(() => {
        return ALL_OPTIONS.map((option) => {
            if (option.value === 'custom') return option
            const months = Number(option.value)
            const takenBy = plans.find((p) => p.months === months && p.id !== plan?.id)
            return takenBy ? { ...option, disabled: true, hint: 'Already exists' } : option
        })
    }, [plans, plan])

    const handleSubmit = (e) => {
        e.preventDefault()
        const nextErrors = {}

        if (!durationSelection) {
            nextErrors.duration = 'Select a duration'
        } else if (durationSelection === 'custom') {
            const numericMonths = Number(customMonths)
            if (!customMonths || numericMonths <= 0 || !Number.isInteger(numericMonths)) {
                nextErrors.duration = 'Enter a valid number of months'
            }
        }

        const numericPrice = Number(price)
        if (!price || numericPrice <= 0) {
            nextErrors.price = 'Enter a valid price'
        }

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors)
            return
        }

        const payload = { months: resolvedMonths, price: numericPrice, description }
        const result = mode === 'edit' ? updatePlan(plan.id, payload) : addPlan(payload)

        if (!result.success) {
            setErrors({ duration: result.error })
            return
        }

        onClose()
    }

    return (
        <Drawer open={open} onClose={onClose} title={mode === 'edit' ? 'Edit Plan' : 'Add Plan'}>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <Select
                    id="plan-duration"
                    label="Duration"
                    value={durationSelection}
                    onChange={(val) => {
                        setDurationSelection(val)
                        setErrors((prev) => ({ ...prev, duration: undefined }))
                    }}
                    options={durationOptions}
                    placeholder="Select duration"
                    error={errors.duration}
                />

                {durationSelection === 'custom' && (
                    <FormField
                        id="plan-custom-months"
                        label="Enter Months"
                        type="number"
                        value={customMonths}
                        onChange={(e) => setCustomMonths(e.target.value)}
                        placeholder="e.g. 5"
                    />
                )}

                <FormField
                    id="plan-price"
                    label="Price"
                    type="number"
                    prefix="₹"
                    value={price}
                    onChange={(e) => {
                        setPrice(e.target.value)
                        setErrors((prev) => ({ ...prev, price: undefined }))
                    }}
                    placeholder="e.g. 4000"
                    error={errors.price}
                />

                <FormField
                    id="plan-description"
                    label="Description"
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value)
                        setDescriptionTouched(true)
                    }}
                    readOnly={mode === 'add'}
                />

                <div className={styles.actions}>
                    <ActionButton variant="secondary" type="button" onClick={onClose}>Cancel</ActionButton>
                    <ActionButton type="submit">{mode === 'edit' ? 'Save Changes' : 'Add Plan'}</ActionButton>
                </div>
            </form>
        </Drawer>
    )
}

export default PlanFormDrawer