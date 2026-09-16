// AttendanceContext.jsx — single source of truth for attendance records.
// Records shape: { id, memberId, memberName, mobile, status, date, notes, createdAt }
// status: 'Present' | 'Absent'
// date: 'YYYY-MM-DD' string (ISO date for easy comparison)
// eslint-disable-next-line react-refresh/only-export-components -- context files must export provider + hook together

import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const AttendanceContext = createContext(null)

// Generate a few seed records for the current and last month so the UI has data to display.
function buildSeedRecords() {
  const records = []
  const today = new Date()

  // Helper: format date as YYYY-MM-DD
  const fmt = (d) => d.toISOString().slice(0, 10)

  // Seed ~20 records spread across today + last 30 days
  const sampleMembers = [
    { memberId: 'mem-1', memberName: 'Rohan Mehta', mobile: '+91 9800000000' },
    { memberId: 'mem-2', memberName: 'Priya Singh', mobile: '+91 9800000091' },
    { memberId: 'mem-3', memberName: 'Amit Verma', mobile: '+91 9800000182' },
    { memberId: 'mem-4', memberName: 'Sneha Kulkarni', mobile: '+91 9800000273' },
    { memberId: 'mem-5', memberName: 'Karan Shah', mobile: '+91 9800000364' },
    { memberId: 'mem-6', memberName: 'Neha Joshi', mobile: '+91 9800000455' },
    { memberId: 'mem-7', memberName: 'Vikram Rao', mobile: '+91 9800000546' },
    { memberId: 'mem-8', memberName: 'Ananya Iyer', mobile: '+91 9800000637' },
  ]

  let id = 1
  for (let daysAgo = 0; daysAgo <= 30; daysAgo += 1) {
    const d = new Date(today)
    d.setDate(today.getDate() - daysAgo)
    const dateStr = fmt(d)

    sampleMembers.forEach((m, idx) => {
      if ((daysAgo + idx) % 3 === 0) return // skip some to make it realistic
      records.push({
        id: `att-seed-${id++}`,
        memberId: m.memberId,
        memberName: m.memberName,
        mobile: m.mobile,
        status: idx % 4 === 0 ? 'Absent' : 'Present',
        date: dateStr,
        notes: '',
        createdAt: d.toISOString(),
      })
    })
  }

  return records
}

const SEED_RECORDS = buildSeedRecords()

export function AttendanceProvider({ children }) {
  const [records, setRecords] = useState(SEED_RECORDS)

  // Check if a record already exists for this member on this date
  const isDuplicate = useCallback(
    (memberId, date, excludeId = null) =>
      records.some(
        (r) => r.memberId === memberId && r.date === date && r.id !== excludeId
      ),
    [records]
  )

  const addRecord = useCallback(
    ({ memberId, memberName, mobile, status, date, notes }) => {
      if (isDuplicate(memberId, date)) {
        return { success: false, error: 'Attendance already marked for this member on this date.' }
      }
      const rec = {
        id: `att-${Date.now()}`,
        memberId,
        memberName,
        mobile,
        status,
        date,
        notes: notes || '',
        createdAt: new Date().toISOString(),
      }
      setRecords((prev) => [rec, ...prev])
      return { success: true, record: rec }
    },
    [isDuplicate]
  )

  const updateRecord = useCallback(
    (id, updates) => {
      const existing = records.find((r) => r.id === id)
      if (!existing) return { success: false, error: 'Record not found.' }

      // Check for duplicate on the new date (excluding self)
      const newDate = updates.date ?? existing.date
      if (isDuplicate(existing.memberId, newDate, id)) {
        return { success: false, error: 'Another attendance record already exists for this member on this date.' }
      }

      setRecords((prev) => prev.map((r) => (r.id === id ? { ...r, ...updates } : r)))
      return { success: true }
    },
    [records, isDuplicate]
  )

  // Undo: remove the record entirely
  const undoRecord = useCallback((id) => {
    setRecords((prev) => prev.filter((r) => r.id !== id))
    return { success: true }
  }, [])

  const value = useMemo(
    () => ({ records, addRecord, updateRecord, undoRecord, isDuplicate }),
    [records, addRecord, updateRecord, undoRecord, isDuplicate]
  )

  return (
    <AttendanceContext.Provider value={value}>
      {children}
    </AttendanceContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAttendance() {
  const ctx = useContext(AttendanceContext)
  if (!ctx) throw new Error('useAttendance must be used within AttendanceProvider')
  return ctx
}
