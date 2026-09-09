// Small shared date helpers for the Payments module. Members' and Plans' seed files each already had their
// own local equivalents — left untouched since editing them isn't in scope — but any new module imports
// from here instead of re-declaring the same two functions again.
export function addDays(date, days) {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
}

export function formatDate(date) {
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}