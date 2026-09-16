// AttendanceViewDrawer.jsx — Read-only view of a single attendance record.
// Uses the same Drawer component as Members and Payments.

import Drawer from '../../../components/common/Drawer'
import Badge from '../../../components/common/Badge'
import styles from './AttendanceViewDrawer.module.css'

function formatDisplayDate(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-IN', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })
}

function Row({ label, children }) {
  return (
    <div className={styles.row}>
      <span className={styles.rowLabel}>{label}</span>
      <span className={styles.rowValue}>{children}</span>
    </div>
  )
}

function AttendanceViewDrawer({ open, onClose, record }) {
  if (!record) return null

  const statusTone = record.status === 'Present' ? 'success' : 'danger'

  return (
    <Drawer open={open} onClose={onClose} title="Attendance Details">
      <div className={styles.content}>
        {/* Member avatar + name */}
        <div className={styles.memberHeader}>
          <div className={styles.avatar} aria-hidden="true">
            {record.memberName?.charAt(0) || '?'}
          </div>
          <div>
            <p className={styles.memberName}>{record.memberName}</p>
            <p className={styles.memberId}>{record.mobile}</p>
          </div>
        </div>

        <div className={styles.divider} aria-hidden="true" />

        <div className={styles.rows}>
          <Row label="Attendance Status">
            <Badge label={record.status} tone={statusTone} />
          </Row>
          <Row label="Attendance Date">{formatDisplayDate(record.date)}</Row>
          <Row label="Recorded At">
            {record.createdAt
              ? new Date(record.createdAt).toLocaleString('en-IN', {
                  day: '2-digit', month: 'short', year: 'numeric',
                  hour: '2-digit', minute: '2-digit',
                })
              : '—'}
          </Row>
          {record.notes && <Row label="Notes">{record.notes}</Row>}
        </div>
      </div>
    </Drawer>
  )
}

export default AttendanceViewDrawer
