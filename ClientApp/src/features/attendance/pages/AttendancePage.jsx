// AttendancePage.jsx — complete Attendance module
// Follows the same pattern as MembersPage / PaymentsPage.

import { useMemo, useState } from 'react'
import { CheckSquare } from 'lucide-react'
import AppShell from '../../../components/layoout/AppShell'
import AttendanceSummaryCards from '../components/AttendanceSummaryCards'
import AttendanceToolbar from '../components/AttendanceToolbar'
import AttendanceTable from '../components/AttendanceTable'
import AttendanceFormDrawer from '../components/AttendanceFormDrawer'
import AttendanceViewDrawer from '../components/AttendanceViewDrawer'
import EmptyState from '../../../components/common/EmptyState'
import ConfirmDialog from '../../../components/common/ConfirmDialog'
import MonthlyReportCard from '../components/MonthlyReportCard'
import { useAttendance } from '../../../context/AttendanceContext'
import { useDebouncedValue } from '../../../hooks/useDebouncedValue'
import styles from './AttendancePage.module.css'

function getTodayStr() {
  return new Date().toISOString().slice(0, 10)
}

function getLastMonthRange() {
  const now = new Date()
  const start = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const end = new Date(now.getFullYear(), now.getMonth(), 0)
  return {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
  }
}

function isThisMonth(dateStr) {
  const now = new Date()
  const d = new Date(dateStr)
  return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()
}

function isLastMonth(dateStr) {
  const { start, end } = getLastMonthRange()
  return dateStr >= start && dateStr <= end
}

const FILTERS = [
  { id: 'today', label: 'Today' },
  { id: 'month', label: 'This Month' },
  { id: 'lastMonth', label: 'Last Month' },
]

function AttendancePage() {
  const { records, undoRecord } = useAttendance()

  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebouncedValue(searchTerm, 250)
  const [activeFilter, setActiveFilter] = useState('today')

  // Drawer state
  const [addDrawerOpen, setAddDrawerOpen] = useState(false)
  const [editingRecord, setEditingRecord] = useState(null)
  const [viewingRecord, setViewingRecord] = useState(null)
  const [undoTarget, setUndoTarget] = useState(null)

  const todayStr = getTodayStr()

  // Summary counts
  const todayRecords = useMemo(() => records.filter((r) => r.date === todayStr), [records, todayStr])
  const monthRecords = useMemo(() => records.filter((r) => isThisMonth(r.date)), [records])
  const presentToday = useMemo(() => todayRecords.filter((r) => r.status === 'Present').length, [todayRecords])
  const absentToday = useMemo(() => todayRecords.filter((r) => r.status === 'Absent').length, [todayRecords])

  // Filtered records
  const filteredRecords = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase()

    let base = records
    if (activeFilter === 'today') base = base.filter((r) => r.date === todayStr)
    else if (activeFilter === 'month') base = base.filter((r) => isThisMonth(r.date))
    else if (activeFilter === 'lastMonth') base = base.filter((r) => isLastMonth(r.date))

    if (!query) return base
    return base.filter(
      (r) =>
        r.memberName.toLowerCase().includes(query) ||
        r.mobile.replace(/\s/g, '').includes(query.replace(/\s/g, ''))
    )
  }, [records, activeFilter, debouncedSearch, todayStr])

  const handleAction = (actionId, record) => {
    if (actionId === 'view') setViewingRecord(record)
    else if (actionId === 'edit') setEditingRecord(record)
    else if (actionId === 'undo') setUndoTarget(record)
  }

  const confirmUndo = () => {
    if (undoTarget) undoRecord(undoTarget.id)
    setUndoTarget(null)
  }

  return (
    <AppShell>
      <div className={styles.page}>
        {/* Page Header */}
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.pageTitle}>Attendance</h1>
            <p className={styles.pageSubtitle}>Track daily member check-in and absence records.</p>
          </div>
        </div>

        {/* Summary Cards */}
        <AttendanceSummaryCards
          todayTotal={todayRecords.length}
          monthTotal={monthRecords.length}
          presentToday={presentToday}
          absentToday={absentToday}
        />

        {/* Monthly Report */}
        <MonthlyReportCard monthTotal={monthRecords.length} presentCount={monthRecords.filter((r) => r.status === 'Present').length} absentCount={monthRecords.filter((r) => r.status === 'Absent').length} />

        {/* Toolbar: search + filters + Mark Attendance button */}
        <AttendanceToolbar
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          filters={FILTERS}
          onMarkAttendance={() => setAddDrawerOpen(true)}
        />

        {/* Table or Empty State */}
        {filteredRecords.length === 0 ? (
          <EmptyState
            icon={CheckSquare}
            headline={debouncedSearch ? 'No matches found' : 'No Attendance Records'}
            subtext={
              debouncedSearch
                ? `Nothing matches "${debouncedSearch}". Try a different name or mobile.`
                : 'Mark attendance using the button above.'
            }
            actionLabel="Mark Attendance"
            onAction={() => setAddDrawerOpen(true)}
          />
        ) : (
          <AttendanceTable records={filteredRecords} onAction={handleAction} />
        )}
      </div>

      {/* Mark Attendance Drawer */}
      <AttendanceFormDrawer
        open={addDrawerOpen}
        onClose={() => setAddDrawerOpen(false)}
        mode="add"
      />

      {/* Edit Attendance Drawer */}
      <AttendanceFormDrawer
        open={!!editingRecord}
        onClose={() => setEditingRecord(null)}
        mode="edit"
        record={editingRecord}
      />

      {/* View Attendance Drawer */}
      <AttendanceViewDrawer
        open={!!viewingRecord}
        onClose={() => setViewingRecord(null)}
        record={viewingRecord}
      />

      {/* Undo Confirm Dialog */}
      <ConfirmDialog
        open={!!undoTarget}
        title="Undo this attendance record?"
        message={
          undoTarget
            ? `This will revert the attendance record for ${undoTarget.memberName} on ${undoTarget.date}. The record will be removed.`
            : ''
        }
        confirmLabel="Undo Record"
        onConfirm={confirmUndo}
        onCancel={() => setUndoTarget(null)}
      />
    </AppShell>
  )
}

export default AttendancePage
