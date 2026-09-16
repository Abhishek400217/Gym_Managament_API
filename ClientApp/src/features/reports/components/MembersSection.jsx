// MembersSection.jsx — Total members count + membership duration breakdown table.

import { motion } from 'framer-motion'
import { Users } from 'lucide-react'
import EmptyState from '../../../components/common/EmptyState'
import styles from './MembersSection.module.css'

function MembersSection({ data, onDrill }) {
  const { totalMembers, newMembersCount, durationBreakdown } = data

  return (
    <div className={styles.section}>
      {/* Header row with 2 stat tiles */}
      <div className={styles.statRow}>
        <motion.div
          className={`${styles.statTile} ${styles.clickable}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
          onClick={() => onDrill('members')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onDrill('members')}
        >
          <div className={styles.tileIcon}>
            <Users size={18} aria-hidden="true" />
          </div>
          <div>
            <p className={styles.tileValue}>{totalMembers}</p>
            <p className={styles.tileLabel}>Total Members</p>
          </div>
          <span className={styles.drillHint}>View All ›</span>
        </motion.div>

        <motion.div
          className={styles.statTile}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, delay: 0.06 }}
        >
          <div className={`${styles.tileIcon} ${styles.tileIconSuccess}`}>
            <Users size={18} aria-hidden="true" />
          </div>
          <div>
            <p className={styles.tileValue}>{newMembersCount}</p>
            <p className={styles.tileLabel}>New Members <span className={styles.tileNote}>(in period)</span></p>
          </div>
        </motion.div>
      </div>

      {/* Duration breakdown table */}
      <div className={styles.tableCard}>
        <h3 className={styles.tableTitle}>Membership Duration Breakdown</h3>
        {durationBreakdown.length === 0 ? (
          <EmptyState headline="No Members" subtext="No member data available." />
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.headerRow}>
                  <th className={styles.th}>Duration</th>
                  <th className={styles.th} style={{ textAlign: 'right' }}>Members</th>
                  <th className={styles.th} style={{ textAlign: 'right' }}>% of Total</th>
                  <th className={styles.th}>Share</th>
                </tr>
              </thead>
              <tbody>
                {durationBreakdown.map((row, i) => (
                  <motion.tr
                    key={row.label}
                    className={styles.row}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.22, delay: i * 0.03 }}
                  >
                    <td className={styles.td}>
                      <span className={styles.durationLabel}>{row.label}</span>
                    </td>
                    <td className={styles.td} style={{ textAlign: 'right' }}>
                      <span className={styles.countVal}>{row.count}</span>
                    </td>
                    <td className={styles.td} style={{ textAlign: 'right' }}>
                      <span className={styles.pctVal}>{row.pct}%</span>
                    </td>
                    <td className={styles.td}>
                      <div className={styles.barTrack}>
                        <motion.div
                          className={styles.barFill}
                          initial={{ width: 0 }}
                          animate={{ width: `${row.pct}%` }}
                          transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default MembersSection
