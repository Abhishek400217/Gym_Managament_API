// RenewalSection.jsx — Expiring Soon + Expired member tables.
// Threshold: expiring = expiryDate within 7 days of today (same rule as Header alert).

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import Badge from '../../../components/common/Badge'
import TabFilter from '../../../components/common/TabFilter'
import EmptyState from '../../../components/common/EmptyState'
import { useDebouncedValue } from '../../../hooks/useDebouncedValue'
import styles from './RenewalSection.module.css'

const TABS = [
  { id: 'expiring', label: 'Expiring Soon' },
  { id: 'expired',  label: 'Expired'       },
]

function fmtCurrency(n) {
  return `₹${n.toLocaleString('en-IN')}`
}

// Days difference from today for display
function daysLabel(expiryDate) {
  if (!expiryDate) return ''
  const d = new Date(expiryDate)
  if (isNaN(d)) return ''
  const days = Math.round((d - new Date()) / 86400000)
  if (days < 0) return `${Math.abs(days)} day${Math.abs(days) !== 1 ? 's' : ''} ago`
  if (days === 0) return 'Today'
  return `in ${days} day${days !== 1 ? 's' : ''}`
}

function RenewalTable({ members, tab, onRowClick }) {
  if (members.length === 0) {
    return (
      <EmptyState
        headline={tab === 'expiring' ? 'No Expiring Memberships' : 'No Expired Memberships'}
        subtext="All memberships are active and up to date."
      />
    )
  }

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table} aria-label={tab === 'expiring' ? 'Expiring soon members' : 'Expired members'}>
        <thead>
          <tr className={styles.headerRow}>
            <th className={styles.th}>Member Name</th>
            <th className={styles.th}>Mobile Number</th>
            <th className={styles.th}>Current Plan</th>
            <th className={styles.th}>Expiry Date</th>
            <th className={styles.th}>Status</th>
            <th className={styles.th} style={{ textAlign: 'right' }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m, i) => (
            <motion.tr
              key={m.id}
              className={`${styles.row} ${onRowClick ? styles.clickableRow : ''}`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.03 }}
              onClick={() => onRowClick?.(m)}
              tabIndex={onRowClick ? 0 : undefined}
              onKeyDown={onRowClick ? (e) => e.key === 'Enter' && onRowClick?.(m) : undefined}
            >
              <td className={styles.td}>
                <div className={styles.memberCell}>
                  <div className={styles.avatar}>
                    {m.name ? m.name.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase() : '?'}
                  </div>
                  <span className={styles.memberName}>{m.name}</span>
                </div>
              </td>
              <td className={styles.td}>
                <span className={styles.secondary}>{m.mobile}</span>
              </td>
              <td className={styles.td}>
                <span className={styles.secondary}>{m.membershipDuration}</span>
              </td>
              <td className={styles.td}>
                <div>
                  <span className={styles.expiryDate}>{m.expiryDate}</span>
                  <span className={styles.daysAgo}>{daysLabel(m.expiryDate)}</span>
                </div>
              </td>
              <td className={styles.td}>
                {tab === 'expiring'
                  ? <Badge label="Expiring Soon" tone="warning" />
                  : <Badge label="Expired" tone="danger" />
                }
              </td>
              <td className={styles.td} style={{ textAlign: 'right' }}>
                <span className={styles.amountVal}>{fmtCurrency(m.membershipFee ?? 0)}</span>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function RenewalSection({ data, onMemberClick }) {
  const { expiringMembers, expiredMembers } = data
  const [activeTab, setActiveTab] = useState('expiring')
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebouncedValue(search, 200)

  const activeMembers = activeTab === 'expiring' ? expiringMembers : expiredMembers

  const filtered = activeMembers.filter((m) => {
    if (!debouncedSearch.trim()) return true
    const q = debouncedSearch.toLowerCase()
    return m.name?.toLowerCase().includes(q) || m.mobile?.toLowerCase().includes(q)
  })

  return (
    <div className={styles.section}>
      <div className={styles.toolbar}>
        <TabFilter
          options={TABS.map((t) => ({
            ...t,
            label: `${t.label} (${t.id === 'expiring' ? expiringMembers.length : expiredMembers.length})`,
          }))}
          activeId={activeTab}
          onChange={setActiveTab}
        />
        <div className={styles.searchWrap}>
          <Search size={14} className={styles.searchIcon} aria-hidden="true" />
          <input
            id="renewal-search"
            type="text"
            className={styles.searchInput}
            placeholder="Search name or mobile..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search members"
          />
        </div>
      </div>

      <div className={styles.tableCard}>
        <RenewalTable
          members={filtered}
          tab={activeTab}
          onRowClick={onMemberClick}
        />
      </div>
    </div>
  )
}

export default RenewalSection
