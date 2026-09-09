import { useMemo, useState } from 'react'
import { Wallet } from 'lucide-react'
import AppShell from '../../../components/layoout/AppShell'
import PaymentSummaryCards from '../components/PaymentSummaryCards'
import PaymentsToolbar from '../components/PaymentsToolbar'
import PaymentFilters from '../components/PaymentFilters'
import PaymentsTable from '../components/PaymentsTable'
import PaymentCard from '../components/PaymentCard'
import PaymentHistoryDrawer from '../components/PaymentHistoryDrawer'
import AddPaymentDrawer from '../components/AddPaymentDrawer'
import EmptyState from '../../../components/common/EmptyState'
import Pagination from '../../../components/common/Pagination'
import ConfirmDialog from '../../../components/common/ConfirmDialog'
import { usePayments } from '../../../context/PaymentsContext'
import { usePagination } from '../../../hooks/usePagination'
import { useDebouncedValue } from '../../../hooks/useDebouncedValue'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { getPaymentStatus, isToday, isThisMonth } from '../../../utils/paymentStatus'
import styles from './PaymentsPage.module.css'

// "All" added as a default 5th filter alongside the requested four — without it there was no way to clear
// Pending/Paid/Today/This Month back to the full list.
const FILTERS = [
    { id: 'all', label: 'All' },
    { id: 'today', label: 'Today' },
    { id: 'month', label: 'This Month' },
    { id: 'pending', label: 'Pending' },
    { id: 'paid', label: 'Paid' },
]

function PaymentsPage() {
    const { payments, deletePayment } = usePayments()
    const isMobile = useMediaQuery('(max-width: 900px)')

    const [searchTerm, setSearchTerm] = useState('')
    const debouncedSearch = useDebouncedValue(searchTerm, 250)
    const [activeFilter, setActiveFilter] = useState('all')

    const [addDrawerOpen, setAddDrawerOpen] = useState(false)
    const [historyMemberId, setHistoryMemberId] = useState(null)
    const [deleteTarget, setDeleteTarget] = useState(null)

    const filteredPayments = useMemo(() => {
        const query = debouncedSearch.trim().toLowerCase()
        return payments.filter((payment) => {
            const matchesQuery =
                !query ||
                payment.memberName.toLowerCase().includes(query) ||
                payment.mobile.replace(/\s/g, '').includes(query.replace(/\s/g, ''))

            if (!matchesQuery) return false

            const status = getPaymentStatus(payment)
            if (activeFilter === 'pending') return status === 'Pending' || status === 'Overdue'
            if (activeFilter === 'paid') return status === 'Paid'
            if (activeFilter === 'today') return Boolean(payment.paymentDate) && isToday(payment.paymentDate)
            if (activeFilter === 'month') return Boolean(payment.paymentDate) && isThisMonth(payment.paymentDate)
            return true
        })
    }, [payments, debouncedSearch, activeFilter])

    const { page, setPage, totalPages, pageItems } = usePagination(filteredPayments, 8)

    const confirmDelete = () => {
        if (deleteTarget) deletePayment(deleteTarget.id)
        setDeleteTarget(null)
    }

    return (
        <AppShell>
            <div className={styles.page}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Payments</h1>
                    <p className={styles.subtitle}>Manage member payments, renewals and payment history.</p>
                </div>

                <PaymentSummaryCards />

                <PaymentsToolbar
                    searchValue={searchTerm}
                    onSearchChange={setSearchTerm}
                    onAddPayment={() => setAddDrawerOpen(true)}
                />

                <PaymentFilters options={FILTERS} activeId={activeFilter} onChange={setActiveFilter} />

                {pageItems.length === 0 ? (
                    <EmptyState
                        icon={Wallet}
                        headline="No Payments Found"
                        subtext="Try a different search or filter, or record a new payment."
                        actionLabel="Add Payment"
                        onAction={() => setAddDrawerOpen(true)}
                    />
                ) : isMobile ? (
                    <div>
                        {pageItems.map((payment, index) => (
                            <PaymentCard key={payment.id} payment={payment} index={index} onOpenHistory={() => setHistoryMemberId(payment.memberId)} />
                        ))}
                    </div>
                ) : (
                    <PaymentsTable payments={pageItems} onRowClick={(payment) => setHistoryMemberId(payment.memberId)} />
                )}

                <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
            </div>

            <PaymentHistoryDrawer
                memberId={historyMemberId}
                open={!!historyMemberId}
                onClose={() => setHistoryMemberId(null)}
                onDeleteRequest={setDeleteTarget}
            />

            <AddPaymentDrawer open={addDrawerOpen} onClose={() => setAddDrawerOpen(false)} />

            <ConfirmDialog
                open={!!deleteTarget}
                title="Delete this payment record?"
                message={deleteTarget ? `This will permanently remove the ${deleteTarget.planLabel} payment record for ${deleteTarget.memberName}. This cannot be undone.` : ''}
                confirmLabel="Delete Payment"
                onConfirm={confirmDelete}
                onCancel={() => setDeleteTarget(null)}
            />
        </AppShell>
    )
}

export default PaymentsPage