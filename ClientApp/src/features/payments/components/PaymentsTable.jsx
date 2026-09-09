import PaymentRow from './PaymentRow'
import styles from './PaymentsTable.module.css'

const COLUMNS = ['Member', 'Mobile Number', 'Membership Plan', 'Amount', 'Payment Method', 'Payment Date', 'Next Due Date']

function PaymentsTable({ payments, onRowClick }) {
    return (
        <div className={styles.tableWrap}>
            <table className={styles.table}>
                <thead>
                    <tr>{COLUMNS.map((col) => <th key={col} className={styles.th}>{col}</th>)}</tr>
                </thead>
                <tbody>
                    {payments.map((payment, index) => (
                        <PaymentRow key={payment.id} payment={payment} index={index} onClick={() => onRowClick(payment)} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default PaymentsTable