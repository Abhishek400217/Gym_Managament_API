import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Plus } from 'lucide-react'
import ActionButton from '../../../components/common/ActionButton'
import styles from './MembersToolbar.module.css'

// Page header: title + subtitle on the left, search + primary action on the right. `onSearchChange` fires
// on every keystroke — the parent (MembersPage) is responsible for debouncing.
function MembersToolbar({ searchValue, onSearchChange, onAddMember, resultCount }) {
  const [focused, setFocused] = useState(false)

  return (
    <div className={styles.toolbar}>
      <div className={styles.titleBlock}>
        <h1 className={styles.title}>Members</h1>
        <p className={styles.subtitle}>{resultCount} member{resultCount === 1 ? '' : 's'} in your gym</p>
      </div>

      <div className={styles.controls}>
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
            placeholder="Search by name, mobile number, or member ID"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </motion.div>

        <ActionButton icon={Plus} onClick={onAddMember}>Add Member</ActionButton>
      </div>
    </div>
  )
}

export default MembersToolbar