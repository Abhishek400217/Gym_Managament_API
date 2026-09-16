// DrillDownDrawer.jsx — generic right-side drawer for report drill-down.
// Reuses the existing Drawer primitive. Shows different lists depending on `type`.

import { useState } from 'react'
import { Search } from 'lucide-react'
import Drawer from '../../../components/common/Drawer'
import Badge from '../../../components/common/Badge'
import EmptyState from '../../../components/common/EmptyState'
import { getPaymentStatus } from '../../../utils/paymentStatus'
import { formatDate } from '../../../utils/dateHelpers'
import { useDebouncedValue } from '../../../hooks/useDebouncedValue'
import styles from './DrillDownDrawer.module.css'

// ── Payment status badge tone mapping ────────────────────────────────────────
function statusTone(status) {
  if (status === 'Paid')    return 'success'
  if (status === 'Overdue') return 'danger'
  return 'warning'
}

function fmtCurrency(n) {
  return `₹${n.toLocaleString('en-IN')}`
}

// ── Payment list ─────────────────────────────────────────────────────────────
function PaymentList({ payments, filterDate }) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [methodFilter, setMethodFilter] = useState('all')
  const q = useDebouncedValue(search, 200)

  let items = payments
  if (filterDate) {
    items = payments.filter((p) => {
      if (!p.paymentDate) return false
      return new Date(p.paymentDate).toISOString().slice(0, filterDate.length) === filterDate
    })
  }
  if (q.trim()) {
    const lower = q.toLowerCase()
    items = items.filter((p) =>
      p.memberName?.toLowerCase().includes(lower) || p.mobile?.toLowerCase().includes(lower)
    )
  }
  if (statusFilter !== 'all') {
    items = items.filter((p) => getPaymentStatus(p) === statusFilter)
  }
  if (methodFilter !== 'all') {
    items = items.filter((p) => p.method === methodFilter)
  }

  return (
    <div className={styles.listWrap}>
      {/* Filters */}
      <div className={styles.drawerFilters}>
        <div className={styles.searchWrap}>
          <Search size={13} className={styles.searchIcon} aria-hidden="true" />
          <input
            type="text" className={styles.searchInput}
            placeholder="Name or mobile…"
            value={search} onChange={(e) => setSearch(e.target.value)}
            aria-label="Search payments"
          />
        </div>
        <select
          className={styles.filterSelect}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          aria-label="Filter by status"
        >
          <option value="all">All Status</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Overdue">Overdue</option>
        </select>
        <select
          className={styles.filterSelect}
          value={methodFilter}
          onChange={(e) => setMethodFilter(e.target.value)}
          aria-label="Filter by payment method"
        >
          <option value="all">All Methods</option>
          <option value="Cash">Cash</option>
          <option value="UPI">UPI</option>
          <option value="Card">Card</option>
        </select>
      </div>

      {items.length === 0 ? (
        <EmptyState headline="No Payments Found" subtext="No payments match the current filters." />
      ) : (
        <div className={styles.cardList}>
          {items.map((p) => {
            const status = getPaymentStatus(p)
            return (
              <div key={p.id} className={styles.listItem}>
                <div className={styles.listItemTop}>
                  <span className={styles.listName}>{p.memberName}</span>
                  <Badge label={status} tone={statusTone(status)} />
                </div>
                <div className={styles.listItemMeta}>
                  <span>{p.mobile}</span>
                  <span>{p.planLabel}</span>
                  <span className={styles.listAmount}>{fmtCurrency(p.amount)}</span>
                </div>
                <div className={styles.listItemMeta}>
                  {p.paymentDate && <span>Paid: {formatDate(new Date(p.paymentDate))}</span>}
                  {p.method && <span>via {p.method}</span>}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ── Member list ──────────────────────────────────────────────────────────────
function MemberList({ members }) {
  const [search, setSearch] = useState('')
  const q = useDebouncedValue(search, 200)

  const items = q.trim()
    ? members.filter((m) => m.name?.toLowerCase().includes(q.toLowerCase()) || m.mobile?.toLowerCase().includes(q.toLowerCase()))
    : members

  return (
    <div className={styles.listWrap}>
      <div className={styles.drawerFilters}>
        <div className={styles.searchWrap} style={{ width: '100%' }}>
          <Search size={13} className={styles.searchIcon} aria-hidden="true" />
          <input
            type="text" className={styles.searchInput}
            placeholder="Name or mobile…"
            value={search} onChange={(e) => setSearch(e.target.value)}
            aria-label="Search members"
          />
        </div>
      </div>

      {items.length === 0 ? (
        <EmptyState headline="No Members Found" subtext="No members match the search." />
      ) : (
        <div className={styles.cardList}>
          {items.map((m) => (
            <div key={m.id} className={styles.listItem}>
              <div className={styles.listItemTop}>
                <div className={styles.memberCell}>
                  <div className={styles.avatar}>
                    {m.name?.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase()}
                  </div>
                  <span className={styles.listName}>{m.name}</span>
                </div>
                <Badge
                  label={m.paymentStatus || 'Paid'}
                  tone={m.paymentStatus === 'Paid' ? 'success' : m.paymentStatus === 'Overdue' ? 'danger' : 'warning'}
                />
              </div>
              <div className={styles.listItemMeta}>
                <span>{m.mobile}</span>
                <span>{m.membershipDuration}</span>
              </div>
              <div className={styles.listItemMeta}>
                <span>Joined: {m.joinDate}</span>
                <span>Expires: {m.expiryDate}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Drawer titles ────────────────────────────────────────────────────────────
const DRILL_TITLES = {
  members:          'All Members',
  new_members:      'New Members (Period)',
  paid_payments:    'Paid Payments',
  pending_payments: 'Pending Payments',
  overdue_payments: 'Overdue Payments',
  expiring:         'Expiring Soon',
  expired:          'Expired Memberships',
  payments_on_date: 'Payments on Selected Date',
}

// ── Main component ────────────────────────────────────────────────────────────
function DrillDownDrawer({ open, onClose, type, data, extra }) {
  if (!open || !type) return null

  const title = DRILL_TITLES[type] || 'Report Details'
  const count = (() => {
    if (!data) return 0
    if (Array.isArray(data)) return data.length
    return 0
  })()

  const isPaymentType = ['paid_payments', 'pending_payments', 'overdue_payments', 'payments_on_date'].includes(type)
  const isMemberType  = ['members', 'new_members', 'expiring', 'expired'].includes(type)

  return (
    <Drawer open={open} onClose={onClose} title={`${title} (${count})`}>
      {isPaymentType && (
        <PaymentList
          payments={Array.isArray(data) ? data : []}
          filterDate={extra?.date}
        />
      )}
      {isMemberType && (
        <MemberList members={Array.isArray(data) ? data : []} />
      )}
    </Drawer>
  )
}

export default DrillDownDrawer
