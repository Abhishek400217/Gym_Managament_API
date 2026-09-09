import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Plus } from 'lucide-react'
import ActionButton from '../../../components/common/ActionButton'
import styles from './PaymentsToolbar.module.css'

function PaymentsToolbar({ searchValue, onSearchChange, onAddPayment }) {
    const [focused, setFocused] = useState(false)

    return (
        <div className={styles.toolbar}>
            <motion.div
                className={styles.searchWrap}
                animate={{
                    borderColor: focused ? 'rgba(79, 140, 255, 0.5)' : 'rgba(255, 255, 255, 0.06)',
                    boxShadow: focused ? '0 0 0 3px rgba(79, 140, 255, 0.14)' : '0 0 0 0px rgba(79, 140, 255, 0)',
                }}
                transition={{ duration: 0.2 }}
            >
                <Search className={styles.searchIcon} size={16} aria-hidden="true" />
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Search by member name or mobile number"
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />
            </motion.div>

            <ActionButton icon={Plus} onClick={onAddPayment}>Add Payment</ActionButton>
        </div>
    )
}

export default PaymentsToolbar