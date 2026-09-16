// ReportPeriodBar.jsx — period selector for the Reports module.
// Supports: This Month | Last Month | This Year | Custom (month-to-month range).

import { useState } from 'react'
import { CalendarRange, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './ReportPeriodBar.module.css'

const PRESETS = [
  { id: 'this_month', label: 'This Month' },
  { id: 'last_month', label: 'Last Month' },
  { id: 'this_year',  label: 'This Year'  },
  { id: 'custom',     label: 'Custom'     },
]

function formatPeriodLabel(period) {
  const opts = { month: 'long', year: 'numeric' }
  const start = period.startDate.toLocaleDateString('en-IN', opts)
  const end   = period.endDate.toLocaleDateString('en-IN', opts)
  if (start === end) return start
  // Same year
  if (period.startDate.getFullYear() === period.endDate.getFullYear() &&
      period.startDate.getMonth() === period.endDate.getMonth()) return start
  return `${start} – ${end}`
}

// "2026-09" from a Date
function toMonthInput(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}
// Date from "2026-09" → first day of that month
function fromMonthInput(str) {
  const [y, m] = str.split('-').map(Number)
  return new Date(y, m - 1, 1)
}

function ReportPeriodBar({ period, onPeriodChange }) {
  const [customOpen, setCustomOpen] = useState(false)
  const [customStart, setCustomStart] = useState(toMonthInput(period.startDate))
  const [customEnd,   setCustomEnd]   = useState(toMonthInput(period.endDate))
  const now = new Date()
  const maxMonth = toMonthInput(now)

  const handlePreset = (id) => {
    if (id === 'custom') {
      setCustomOpen((v) => !v)
      return
    }
    setCustomOpen(false)
    onPeriodChange(id, null, null)
  }

  const applyCustom = () => {
    const s = fromMonthInput(customStart)
    let   e = fromMonthInput(customEnd)
    // End = last day of chosen month
    e = new Date(e.getFullYear(), e.getMonth() + 1, 0)
    if (s > e) { setCustomEnd(customStart); return }
    onPeriodChange('custom', s, e)
    setCustomOpen(false)
  }

  return (
    <div className={styles.bar}>
      <div className={styles.left}>
        <CalendarRange size={15} className={styles.calIcon} aria-hidden="true" />
        <span className={styles.periodLabel}>{formatPeriodLabel(period)}</span>
      </div>

      <div className={styles.right}>
        {/* Preset tabs */}
        <div className={styles.presetRow} role="tablist" aria-label="Report period">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={period.type === p.id}
              className={`${styles.presetBtn} ${period.type === p.id ? styles.presetBtnActive : ''}`}
              onClick={() => handlePreset(p.id)}
            >
              {p.label}
              {p.id === 'custom' && <ChevronDown size={13} className={`${styles.chevron} ${customOpen ? styles.chevronOpen : ''}`} aria-hidden="true" />}
            </button>
          ))}
        </div>

        {/* Custom range picker */}
        <AnimatePresence>
          {customOpen && (
            <motion.div
              className={styles.customPanel}
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.customRow}>
                <div className={styles.customField}>
                  <label htmlFor="report-start" className={styles.customLabel}>From</label>
                  <input
                    id="report-start"
                    type="month"
                    className={styles.monthInput}
                    value={customStart}
                    max={customEnd}
                    onChange={(e) => setCustomStart(e.target.value)}
                  />
                </div>
                <span className={styles.customSep}>→</span>
                <div className={styles.customField}>
                  <label htmlFor="report-end" className={styles.customLabel}>To</label>
                  <input
                    id="report-end"
                    type="month"
                    className={styles.monthInput}
                    value={customEnd}
                    min={customStart}
                    max={maxMonth}
                    onChange={(e) => setCustomEnd(e.target.value)}
                  />
                </div>
                <button type="button" className={styles.applyBtn} onClick={applyCustom}>
                  Apply
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ReportPeriodBar
