import TabFilter from '../../../components/common/TabFilter'
import styles from './PaymentFilters.module.css'

function PaymentFilters({ options, activeId, onChange }) {
    return (
        <div className={styles.wrapper}>
            <TabFilter options={options} activeId={activeId} onChange={onChange} />
        </div>
    )
}

export default PaymentFilters