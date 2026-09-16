// PlanPerformanceSection.jsx — plan-by-plan table with Most Used + Highest Revenue badges.

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import Badge from '../../../components/common/Badge'
import EmptyState from '../../../components/common/EmptyState'
import styles from './PlanPerformanceSection.module.css'

function fmtCurrency(n) {
  return `₹${n.toLocaleString('en-IN')}`
}

function PlanPerformanceSection({ data }) {
  const { planPerformance } = data
  const [search, setSearch] = useState('')

  const filtered = planPerformance.filter((p) =>
    !search.trim() || p.name.toLowerCase().includes(search.toLowerCase())
  )

  const totalMembers = planPerformance.reduce((s, p) => s + p.memberCount, 0)
  const totalRevenue = planPerformance.reduce((s, p) => s + p.revenue, 0)

  return (
    <div className={styles.section}>
      {/* Search */}
      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <Search size={14} className={styles.searchIcon} aria-hidden="true" />
          <input
            id="plan-search"
            type="text"
            className={styles.searchInput}
            placeholder="Search plan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search membership plans"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          headline="No Plans Found"
          subtext={search ? `No plans match "${search}".` : 'No membership plans have been created yet.'}
        />
      ) : (
        <div className={styles.tableCard}>
          <div className={styles.tableWrap}>
            <table className={styles.table} aria-label="Membership plan performance">
              <thead>
                <tr className={styles.headerRow}>
                  <th className={styles.th}>Plan Name</th>
                  <th className={styles.th}>Duration</th>
                  <th className={styles.th} style={{ textAlign: 'right' }}>Members</th>
                  <th className={styles.th} style={{ textAlign: 'right' }}>Revenue (Period)</th>
                  <th className={styles.th}>Indicators</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((plan, i) => (
                  <motion.tr
                    key={plan.id}
                    className={styles.row}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, delay: i * 0.03 }}
                  >
                    <td className={styles.td}>
                      <span className={styles.planName}>{plan.name}</span>
                    </td>
                    <td className={styles.td}>
                      <span className={styles.secondary}>
                        {plan.months === 1 ? '1 Month' : plan.months < 12 ? `${plan.months} Months` : `${plan.months / 12 >= 1 ? `${plan.months / 12} Year` : `${plan.months} Months`}`}
                      </span>
                    </td>
                    <td className={styles.td} style={{ textAlign: 'right' }}>
                      <span className={styles.numVal}>{plan.memberCount}</span>
                    </td>
                    <td className={styles.td} style={{ textAlign: 'right' }}>
                      <span className={plan.revenue > 0 ? styles.revVal : styles.zeroVal}>
                        {fmtCurrency(plan.revenue)}
                      </span>
                    </td>
                    <td className={styles.td}>
                      <div className={styles.badges}>
                        {plan.isMostUsed        && <Badge label="Most Used"        tone="accent"  />}
                        {plan.isHighestRevenue   && <Badge label="Highest Revenue"  tone="success" />}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
              {/* Totals footer */}
              <tfoot>
                <tr className={styles.footerRow}>
                  <td className={styles.footTd} colSpan={2}>
                    <span className={styles.footLabel}>Total</span>
                  </td>
                  <td className={styles.footTd} style={{ textAlign: 'right' }}>
                    <span className={styles.footVal}>{totalMembers}</span>
                  </td>
                  <td className={styles.footTd} style={{ textAlign: 'right' }}>
                    <span className={styles.footVal}>{fmtCurrency(totalRevenue)}</span>
                  </td>
                  <td className={styles.footTd} />
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default PlanPerformanceSection
