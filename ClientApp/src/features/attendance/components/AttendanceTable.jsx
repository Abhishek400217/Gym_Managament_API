// AttendanceTable.jsx — the main attendance records table.
// Columns: Member | Mobile | Status | Date | Actions
// Actions: View | Edit | Undo (no Delete)

import { motion } from 'framer-motion'
import { Eye, Pencil, RotateCcw } from 'lucide-react'
import Badge from '../../../components/common/Badge'
import styles from './AttendanceTable.module.css'

function formatDisplayDate(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr + 'T00:00:00') // avoid timezone shift
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

function AttendanceRow({ record, index, onAction }) {
  const statusTone = record.status === 'Present' ? 'success' : 'danger'

  return (
    <motion.tr
      className={styles.row}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.03 }}
    >
      <td className={styles.td}>
        <div className={styles.memberCell}>
          <div className={styles.avatar} aria-hidden="true">
            {record.memberName?.charAt(0) || '?'}
          </div>
          <span className={styles.memberName}>{record.memberName}</span>
        </div>
      </td>

      <td className={styles.td}>
        <span className={styles.mobile}>{record.mobile}</span>
      </td>

      <td className={styles.td}>
        <Badge label={record.status} tone={statusTone} />
      </td>

      <td className={styles.td}>
        <span className={styles.date}>{formatDisplayDate(record.date)}</span>
      </td>

      <td className={styles.td}>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.actionBtn}
            onClick={() => onAction('view', record)}
            aria-label={`View attendance for ${record.memberName}`}
            title="View"
          >
            <Eye size={14} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={styles.actionBtn}
            onClick={() => onAction('edit', record)}
            aria-label={`Edit attendance for ${record.memberName}`}
            title="Edit"
          >
            <Pencil size={14} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={`${styles.actionBtn} ${styles.undoBtn}`}
            onClick={() => onAction('undo', record)}
            aria-label={`Undo attendance for ${record.memberName}`}
            title="Undo"
          >
            <RotateCcw size={14} aria-hidden="true" />
          </button>
        </div>
      </td>
    </motion.tr>
  )
}

function AttendanceTable({ records, onAction }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table} aria-label="Attendance records">
        <thead>
          <tr className={styles.headerRow}>
            <th className={styles.th}>Member</th>
            <th className={styles.th}>Mobile Number</th>
            <th className={styles.th}>Attendance Status</th>
            <th className={styles.th}>Attendance Date</th>
            <th className={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <AttendanceRow key={record.id} record={record} index={index} onAction={onAction} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AttendanceTable
