import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Activity, LayoutGrid, Users, CreditCard, Wallet, CheckSquare,
  BarChart3, Settings, LogOut,
} from 'lucide-react'
import { sidebarMenu } from '../../../../data/dashboardData'
import styles from './Sidebar.module.css'

const ICON_MAP = { LayoutGrid, Users, CreditCard, Wallet, CheckSquare, BarChart3, Settings }

// Floating glass sidebar — always expanded, no collapse toggle.
function Sidebar({ onLogout }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brandRow}>
        <motion.span
          className={styles.brandIconWrap}
          animate={{ rotate: [0, 8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Activity className={styles.brandIcon} aria-hidden="true" />
        </motion.span>

        <div className={styles.brandText}>
          <span className={styles.brandName}>PULSEFIT</span>
          <span className={styles.brandCredit}>Made by Abhishek Karande</span>
        </div>
      </div>

      <nav className={styles.nav}>
        {sidebarMenu.map((item) => {
          const Icon = ICON_MAP[item.icon] || LayoutGrid
          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) => `${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="sidebar-active-indicator"
                      className={styles.activeIndicator}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <Icon className={styles.navIcon} strokeWidth={1.8} aria-hidden="true" />
                  <span className={styles.navLabel}>{item.label}</span>
                </>
              )}
            </NavLink>
          )
        })}
      </nav>

      <button type="button" className={styles.logoutButton} onClick={onLogout}>
        <LogOut className={styles.navIcon} strokeWidth={1.8} aria-hidden="true" />
        <span className={styles.navLabel}>Logout</span>
      </button>
    </aside>
  )
}

export default Sidebar