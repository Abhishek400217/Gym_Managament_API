import { motion } from 'framer-motion'
import styles from './SettingsNav.module.css'

const NAV_ITEMS = [
    { id: 'general',      label: 'General' },
    { id: 'gym-info',     label: 'Gym Information' },
    { id: 'about',        label: 'About' },
]

// Left-rail settings navigation with animated active pill indicator — mirrors the Sidebar's NavLink pattern.
function SettingsNav({ active, onChange }) {
    return (
        <nav className={styles.nav} aria-label="Settings navigation">
            {NAV_ITEMS.map((item) => {
                const isActive = item.id === active
                return (
                    <button
                        key={item.id}
                        type="button"
                        className={`${styles.item} ${isActive ? styles.itemActive : ''}`}
                        onClick={() => onChange(item.id)}
                        aria-current={isActive ? 'page' : undefined}
                    >
                        {isActive && (
                            <motion.span
                                layoutId="settings-nav-indicator"
                                className={styles.indicator}
                                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                            />
                        )}
                        <span className={styles.label}>{item.label}</span>
                    </button>
                )
            })}
        </nav>
    )
}

export default SettingsNav
