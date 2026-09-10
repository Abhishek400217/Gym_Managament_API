import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../../../hooks/useTheme'
import styles from './Header.module.css'

// Global TopBar — search bar removed. Only Theme Toggle + User Avatar remain.
// Used by both Dashboard (inline) and all AppShell pages (via AppShell.jsx).
function Header({ userName = 'Abhishek' }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className={styles.header}>
      <div className={styles.actions}>
        <motion.button
          type="button"
          className={styles.iconButton}
          onClick={toggleTheme}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.92 }}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
        </motion.button>

        <div className={styles.profileCircle} aria-hidden="true">{userName.charAt(0)}</div>
      </div>
    </header>
  )
}

export default Header