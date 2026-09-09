import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Activity, LayoutGrid, Users, CreditCard, Wallet, CheckSquare,
  BarChart3, Settings, LogOut, ChevronLeft, ChevronRight,
} from 'lucide-react'
import { sidebarMenu } from '../../../../data/dashboardData'
import styles from './Sidebar.module.css'

const ICON_MAP = { LayoutGrid, Users, CreditCard, Wallet, CheckSquare, BarChart3, Settings }

// Floating glass sidebar with a manual collapse toggle and an animated width transition. Below 900px it
// auto-collapses to icon-only via CSS regardless of the manual toggle state.
function Sidebar({ onLogout }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <motion.aside
      className={styles.sidebar}
      animate={{ width: collapsed ? 84 : 250 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.brandRow}>
        <motion.span
          className={styles.brandIconWrap}
          animate={{ rotate: [0, 8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Activity className={styles.brandIcon} aria-hidden="true" />
        </motion.span>

        <AnimatePresence>
          {!collapsed && (
            <motion.div
              className={styles.brandText}
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
            >
              <span className={styles.brandName}>PULSEFIT</span>
              <span className={styles.brandCredit}>Made by Abhishek Karande</span>
            </motion.div>
          )}
        </AnimatePresence>
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
                  {!collapsed && <span className={styles.navLabel}>{item.label}</span>}
                </>
              )}
            </NavLink>
          )
        })}
      </nav>

      <button type="button" className={styles.logoutButton} onClick={onLogout}>
        <LogOut className={styles.navIcon} strokeWidth={1.8} aria-hidden="true" />
        {!collapsed && <span className={styles.navLabel}>Logout</span>}
      </button>

      <button
        type="button"
        className={styles.collapseToggle}
        onClick={() => setCollapsed((prev) => !prev)}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </motion.aside>
  )
}

export default Sidebar