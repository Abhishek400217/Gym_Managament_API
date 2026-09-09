import { motion } from 'framer-motion'
import styles from './SettingsSection.module.css'

// Animated card wrapper for each settings panel. The key-based remount drives the entry animation when
// the user switches sections in SettingsNav.
function SettingsSection({ title, description, children }) {
    return (
        <motion.section
            className={styles.section}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
            {(title || description) && (
                <div className={styles.header}>
                    {title && <h2 className={styles.title}>{title}</h2>}
                    {description && <p className={styles.description}>{description}</p>}
                </div>
            )}
            <div className={styles.body}>
                {children}
            </div>
        </motion.section>
    )
}

export default SettingsSection
