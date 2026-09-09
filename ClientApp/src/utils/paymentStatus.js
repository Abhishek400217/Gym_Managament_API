// Status is derived from data, never stored. A record is 'Paid' if it has a paymentDate; otherwise it's
// 'Pending' or 'Overdue' depending on whether nextDueDate has already passed. This means status is always
// correct relative to "now" — it can't go stale the way a stored status field would.
export function getPaymentStatus(record) {
    if (record.paymentDate) return 'Paid'
    return new Date(record.nextDueDate) < new Date() ? 'Overdue' : 'Pending'
}

export function isToday(date) {
    const d = new Date(date)
    const now = new Date()
    return d.toDateString() === now.toDateString()
}

export function isThisMonth(date) {
    const d = new Date(date)
    const now = new Date()
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()
}