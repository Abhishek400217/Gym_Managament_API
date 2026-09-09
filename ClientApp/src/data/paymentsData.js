import { formatDurationLabel } from '../utils/planOrdering'
import { addDays, formatDate } from '../utils/dateHelpers'

const today = new Date()

// Snapshot of plan pricing at seed-generation time — a historical payment should reflect the price actually
// charged then, not whatever the Plans module's price happens to be today. NEW payments (via
// PaymentsContext.addPayment) instead look up LIVE pricing from usePlans(), so editing a plan's price in
// the Plans module correctly affects future payments without silently rewriting history.
const PLAN_PRICE_SNAPSHOT = { 1: 1500, 2: 2800, 3: 4000, 4: 5200, 6: 7000, 12: 12000, 5: 4500 }

let recordCounter = 0

function buildRecord({ id, name, mobile, planMonths, paidDaysAgo, dueOffsetDays }) {
    recordCounter += 1
    const amount = PLAN_PRICE_SNAPSHOT[planMonths] ?? planMonths * 1000
    const paymentDate = paidDaysAgo === null ? null : addDays(today, -paidDaysAgo)
    const nextDueDate = addDays(today, dueOffsetDays)

    return {
        id: `pay-${recordCounter}`,
        memberId: id,
        memberName: name,
        mobile,
        planMonths,
        planLabel: formatDurationLabel(planMonths),
        amount,
        method: paymentDate ? ['Cash', 'UPI', 'Card'][recordCounter % 3] : null,
        paymentDate,
        paymentDateLabel: paymentDate ? formatDate(paymentDate) : null,
        nextDueDate,
        nextDueDateLabel: formatDate(nextDueDate),
    }
}

// Payments owns its own compact, realistic roster rather than importing Members' 48-entry dummy list — see
// the note in the response above for why. paidDaysAgo: null means "not yet paid" (drives Pending/Overdue).
export const paymentMembers = [
    { id: 'mem-p1', name: 'Rahul Sharma', mobile: '+91 98765 43210' },
    { id: 'mem-p2', name: 'Priya Verma', mobile: '+91 98234 56781' },
    { id: 'mem-p3', name: 'Amit Patil', mobile: '+91 98123 45670' },
    { id: 'mem-p4', name: 'Sneha Joshi', mobile: '+91 98987 65432' },
    { id: 'mem-p5', name: 'Rohit Gupta', mobile: '+91 98451 23456' },
    { id: 'mem-p6', name: 'Neha Kulkarni', mobile: '+91 98345 67890' },
    { id: 'mem-p7', name: 'Vikram Rao', mobile: '+91 98567 81234' },
    { id: 'mem-p8', name: 'Ananya Iyer', mobile: '+91 98678 91230' },
    { id: 'mem-p9', name: 'Karan Shah', mobile: '+91 98781 23456' },
    { id: 'mem-p10', name: 'Ishita Malhotra', mobile: '+91 98890 12345' },
]

function m(name) {
    return paymentMembers.find((mem) => mem.name === name)
}

export const initialPayments = [
    buildRecord({ ...m('Rahul Sharma'), planMonths: 3, paidDaysAgo: 100, dueOffsetDays: -10 }),
    buildRecord({ ...m('Rahul Sharma'), planMonths: 3, paidDaysAgo: null, dueOffsetDays: -10 }),

    buildRecord({ ...m('Priya Verma'), planMonths: 1, paidDaysAgo: 65, dueOffsetDays: -35 }),
    buildRecord({ ...m('Priya Verma'), planMonths: 1, paidDaysAgo: 35, dueOffsetDays: -5 }),
    buildRecord({ ...m('Priya Verma'), planMonths: 1, paidDaysAgo: null, dueOffsetDays: -5 }),

    buildRecord({ ...m('Amit Patil'), planMonths: 6, paidDaysAgo: 150, dueOffsetDays: 30 }),

    buildRecord({ ...m('Sneha Joshi'), planMonths: 2, paidDaysAgo: 60, dueOffsetDays: 3 }),
    buildRecord({ ...m('Sneha Joshi'), planMonths: 2, paidDaysAgo: null, dueOffsetDays: 3 }),

    buildRecord({ ...m('Rohit Gupta'), planMonths: 4, paidDaysAgo: 140, dueOffsetDays: 8 }),
    buildRecord({ ...m('Rohit Gupta'), planMonths: 4, paidDaysAgo: null, dueOffsetDays: 8 }),

    buildRecord({ ...m('Neha Kulkarni'), planMonths: 12, paidDaysAgo: 370, dueOffsetDays: -5 }),
    buildRecord({ ...m('Neha Kulkarni'), planMonths: 12, paidDaysAgo: null, dueOffsetDays: -5 }),

    buildRecord({ ...m('Vikram Rao'), planMonths: 1, paidDaysAgo: 20, dueOffsetDays: 10 }),

    buildRecord({ ...m('Ananya Iyer'), planMonths: 5, paidDaysAgo: 200, dueOffsetDays: -50 }),
    buildRecord({ ...m('Ananya Iyer'), planMonths: 5, paidDaysAgo: 45, dueOffsetDays: 105 }),

    buildRecord({ ...m('Karan Shah'), planMonths: 1, paidDaysAgo: 8, dueOffsetDays: 22 }),

    buildRecord({ ...m('Ishita Malhotra'), planMonths: 3, paidDaysAgo: 95, dueOffsetDays: -5 }),
    buildRecord({ ...m('Ishita Malhotra'), planMonths: 3, paidDaysAgo: null, dueOffsetDays: -5 }),
]