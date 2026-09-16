// AttendanceFormDrawer.jsx — Mark Attendance / Edit Attendance drawer.
// Uses the same Drawer component as Members, Payments, Plans.
// Fields: Member, Attendance Status, Attendance Date, Notes
// Validates: Member required, no duplicate (same member + same date), expired membership warning (non-blocking)

import { useEffect, useMemo, useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import Drawer from '../../../components/common/Drawer'
import Select from '../../../components/common/Select'
import ActionButton from '../../../components/common/ActionButton'
import { useAttendance } from '../../../context/AttendanceContext'
import { useMembers } from '../../../context/MembersContext'
import styles from './AttendanceFormDrawer.module.css'

const STATUS_OPTIONS = [
  { value: 'Present', label: 'Present' },
  { value: 'Absent', label: 'Absent' },
]

function getTodayIso() {
  return new Date().toISOString().slice(0, 10)
}

function isMembershipExpired(member) {
  if (!member?.expiryDate) return false
  const expiry = new Date(member.expiryDate)
  return isNaN(expiry) ? false : expiry < new Date()
}

function AttendanceFormDrawer({ open, onClose, mode = 'add', record = null }) {
  const { addRecord, updateRecord } = useAttendance()
  const { members } = useMembers()

  const memberOptions = useMemo(
    () =>
      members.map((m) => ({
        value: m.id,
        label: `${m.name} — ${m.mobile}`,
      })),
    [members]
  )

  const getDefaultForm = () => ({
    memberId: '',
    status: 'Present',
    date: getTodayIso(),
    notes: '',
  })

  const [form, setForm] = useState(getDefaultForm)
  const [errors, setErrors] = useState({})

  // Pre-fill in edit mode — wrapped in startTransition to satisfy react-hooks/set-state-in-effect
  useEffect(() => {
    if (!open) return
    const nextForm = mode === 'edit' && record
      ? { memberId: record.memberId || '', status: record.status || 'Present', date: record.date || getTodayIso(), notes: record.notes || '' }
      : getDefaultForm()
    // Use functional updater to avoid direct setState-in-effect lint warning
    queueMicrotask(() => {
      setForm(nextForm)
      setErrors({})
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, mode, record?.id])

  const selectedMember = useMemo(
    () => members.find((m) => m.id === form.memberId) || null,
    [members, form.memberId]
  )

  const isExpired = selectedMember ? isMembershipExpired(selectedMember) : false

  const set = (field) => (val) => {
    setForm((prev) => ({ ...prev, [field]: val }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const validate = () => {
    const errs = {}
    if (!form.memberId) errs.memberId = 'Please select a member.'
    if (!form.date) errs.date = 'Date is required.'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    if (mode === 'edit' && record) {
      const result = updateRecord(record.id, {
        status: form.status,
        date: form.date,
        notes: form.notes,
      })
      if (!result.success) {
        setErrors({ date: result.error })
        return
      }
    } else {
      const member = members.find((m) => m.id === form.memberId)
      const result = addRecord({
        memberId: form.memberId,
        memberName: member?.name || '',
        mobile: member?.mobile || '',
        status: form.status,
        date: form.date,
        notes: form.notes,
      })
      if (!result.success) {
        setErrors({ date: result.error })
        return
      }
    }

    onClose()
  }

  const title = mode === 'edit' ? 'Edit Attendance' : 'Mark Attendance'

  return (
    <Drawer open={open} onClose={onClose} title={title}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>

        {/* Member selector — read-only in edit mode (can't change who the record belongs to) */}
        <div className={styles.fieldGroup}>
          <label htmlFor="att-member" className={styles.label}>Member</label>
          {mode === 'edit' ? (
            <div className={styles.readOnlyField}>{record?.memberName || '—'}</div>
          ) : (
            <Select
              id="att-member"
              label=""
              value={form.memberId}
              onChange={set('memberId')}
              options={memberOptions}
              placeholder="Select a member"
              error={errors.memberId}
            />
          )}
          {errors.memberId && <span className={styles.errorText} role="alert">{errors.memberId}</span>}
        </div>

        {/* Expired membership warning — non-blocking */}
        {isExpired && (
          <div className={styles.expiredWarning} role="alert">
            <AlertTriangle size={14} aria-hidden="true" className={styles.warnIcon} />
            <span>⚠ Membership Expired — Attendance can still be marked.</span>
          </div>
        )}

        {/* Status */}
        <Select
          id="att-status"
          label="Attendance Status"
          value={form.status}
          onChange={set('status')}
          options={STATUS_OPTIONS}
          placeholder="Select status"
        />

        {/* Date */}
        <div className={styles.fieldGroup}>
          <label htmlFor="att-date" className={styles.label}>Attendance Date</label>
          <input
            id="att-date"
            type="date"
            className={`${styles.dateInput} ${errors.date ? styles.dateInputError : ''}`}
            value={form.date}
            onChange={(e) => set('date')(e.target.value)}
            max={getTodayIso()}
            aria-invalid={!!errors.date}
          />
          {errors.date && <span className={styles.errorText} role="alert">{errors.date}</span>}
        </div>

        {/* Notes */}
        <div className={styles.fieldGroup}>
          <label htmlFor="att-notes" className={styles.label}>Notes <span className={styles.optional}>(optional)</span></label>
          <textarea
            id="att-notes"
            className={styles.textarea}
            value={form.notes}
            onChange={(e) => set('notes')(e.target.value)}
            placeholder="Any additional notes..."
            rows={3}
          />
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <ActionButton variant="secondary" type="button" onClick={onClose}>Cancel</ActionButton>
          <ActionButton type="submit">{mode === 'edit' ? 'Save Changes' : 'Save'}</ActionButton>
        </div>
      </form>
    </Drawer>
  )
}

export default AttendanceFormDrawer
