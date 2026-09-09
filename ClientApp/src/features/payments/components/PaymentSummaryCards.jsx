import BentoCard from '../../../components/common/BentoCard'
import { usePayments } from '../../../context/PaymentsContext'
import styles from './PaymentSummaryCards.module.css'

// Four equal metric tiles reusing the Dashboard's BentoCard primitive. Icons are all rendered in the same
// blue accent color as every other BentoCard on the app, by design — the existing component never
// color-codes icons by meaning, and introducing that here would be a new visual pattern, not "the same
// design language." Semantic color-coding happens via Badge tones elsewhere instead.
function PaymentSummaryCards() {
    const { summary } = usePayments()

    const cards = [
        { id: 'collection', label: 'Total Collection This Month', value: summary.collectionThisMonth, prefix: '₹', icon: 'Wallet' },
        { id: 'pending', label: 'Pending Amount', value: summary.pendingAmount, prefix: '₹', icon: 'AlertCircle' },
        { id: 'paid', label: 'Paid Payments', value: summary.paidCount, icon: 'CheckCircle2' },
        { id: 'overdue', label: 'Overdue Payments', value: summary.overdueCount, icon: 'AlertTriangle' },
    ]

    return (
        <div className={styles.grid}>
            {cards.map((card, index) => (
                <BentoCard key={card.id} index={index} size="sm" {...card} />
            ))}
        </div>
    )
}

export default PaymentSummaryCards