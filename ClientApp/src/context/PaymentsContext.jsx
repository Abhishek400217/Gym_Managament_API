import { createContext, useContext, useMemo, useState } from 'react'
import { initialPayments, paymentMembers } from '../data/paymentsData'
import { usePlans } from './PlansContext'
import { getPaymentStatus, isThisMonth } from '../utils/paymentStatus'
import { addDays, formatDate } from '../utils/dateHelpers'

const PaymentsContext = createContext(null)

// Single source of truth for payment records. In-memory only, per spec — no localStorage, no backend.
// Must be nested inside PlansProvider (see main.jsx) since addPayment reads LIVE plan pricing via usePlans().
export function PaymentsProvider({ children }) {
    const [payments, setPayments] = useState(initialPayments)
    const { plans } = usePlans()

    // A member's "current" record is whichever one is still unpaid (Pending/Overdue); if none, it's their
    // most recently-dated Paid record — used to auto-fill the Add Payment drawer.
    const getCurrentRecordForMember = (memberId) => {
        const memberPayments = payments.filter((p) => p.memberId === memberId)
        const outstanding = memberPayments.find((p) => getPaymentStatus(p) !== 'Paid')
        if (outstanding) return outstanding
        return memberPayments.slice().sort((a, b) => new Date(b.nextDueDate) - new Date(a.nextDueDate))[0] || null
    }

    // Recording a payment always settles the member's existing outstanding (Pending/Overdue) record in place —
    // it never creates a second parallel record for the same cycle. If the member has nothing outstanding
    // (already Paid and not due), this is blocked: no advance payments, per spec.
    const addPayment = ({ memberId, method }) => {
        const member = paymentMembers.find((p) => p.id === memberId)
        if (!member) return { success: false, error: 'Select a member.' }

        const reference = getCurrentRecordForMember(memberId)
        if (!reference) return { success: false, error: 'This member has no membership plan on file.' }

        const status = getPaymentStatus(reference)
        if (status === 'Paid') {
            return {
                success: false,
                error: `${member.name}'s membership is active until ${reference.nextDueDateLabel}. Advance payments aren't allowed.`,
            }
        }

        const planMonths = reference.planMonths
        const livePlan = plans.find((p) => p.months === planMonths)
        const amount = livePlan ? livePlan.price : reference.amount

        const paymentDate = new Date()
        const nextDueDate = addDays(paymentDate, planMonths * 30)

        setPayments((prev) =>
            prev.map((p) =>
                p.id === reference.id
                    ? {
                        ...p,
                        amount,
                        method,
                        paymentDate,
                        paymentDateLabel: formatDate(paymentDate),
                        nextDueDate,
                        nextDueDateLabel: formatDate(nextDueDate),
                    }
                    : p
            )
        )

        return { success: true }
    }

    const deletePayment = (id) => {
        setPayments((prev) => prev.filter((p) => p.id !== id))
        return { success: true }
    }

    const summary = useMemo(() => {
        const collectionThisMonth = payments
            .filter((p) => getPaymentStatus(p) === 'Paid' && isThisMonth(p.paymentDate))
            .reduce((sum, p) => sum + p.amount, 0)

        const pendingAmount = payments
            .filter((p) => getPaymentStatus(p) !== 'Paid')
            .reduce((sum, p) => sum + p.amount, 0)

        const paidCount = payments.filter((p) => getPaymentStatus(p) === 'Paid').length
        const overdueCount = payments.filter((p) => getPaymentStatus(p) === 'Overdue').length

        return { collectionThisMonth, pendingAmount, paidCount, overdueCount }
    }, [payments])

    const value = useMemo(
        () => ({ payments, paymentMembers, getCurrentRecordForMember, addPayment, deletePayment, summary }),
        [payments, summary]
    )

    return <PaymentsContext.Provider value={value}>{children}</PaymentsContext.Provider>
}

export function usePayments() {
    const context = useContext(PaymentsContext)
    if (!context) throw new Error('usePayments must be used within a PaymentsProvider')
    return context
}