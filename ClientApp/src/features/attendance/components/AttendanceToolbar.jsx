// AttendanceToolbar.jsx — search + filter tabs + Mark Attendance CTA.
// Mirrors PaymentsToolbar / MembersToolbar pattern.

import { Search, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import styles from './AttendanceToolbar.module.css'

function AttendanceToolbar({ searchValue, onSearchChange, activeFilter, onFilterChange, filters, onMarkAttendance }) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.left}>
        {/* Search input */}
        <div className={styles.searchWrap}>
          <Search size={15} className={styles.searchIcon} aria-hidden="true" />
          <input
            id="attendance-search"
            type="text"
            className={styles.search}
            placeholder="Search member or mobile..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search attendance records"
          />
        </div>

        {/* Filter tabs */}
        <div className={styles.filters} role="tablist" aria-label="Attendance filter">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              className={`${styles.filterTab} ${activeFilter === f.id ? styles.filterTabActive : ''}`}
              onClick={() => onFilterChange(f.id)}
              aria-selected={activeFilter === f.id}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mark Attendance CTA */}
      <motion.button
        id="mark-attendance-btn"
        type="button"
        className={styles.addButton}
        onClick={onMarkAttendance}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <Plus size={16} aria-hidden="true" />
        Mark Attendance
      </motion.button>
    </div>
  )
}

export default AttendanceToolbar
