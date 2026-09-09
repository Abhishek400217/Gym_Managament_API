import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import styles from './Drawer.module.css'

// Generic right-slide-in drawer: backdrop + panel, mount/unmount handled by AnimatePresence so enter/exit
// animate instead of popping instantly. Reusable for any future "add/edit X" flow, not just plans.
function Drawer({ open, onClose, title, children }) {
    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        className={styles.backdrop}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                    />
                    <motion.div
                        className={styles.panel}
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 320, damping: 34 }}
                        role="dialog"
                        aria-modal="true"
                        aria-label={title}
                    >
                        <div className={styles.header}>
                            <h2 className={styles.title}>{title}</h2>
                            <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Close">
                                <X size={18} aria-hidden="true" />
                            </button>
                        </div>
                        <div className={styles.content}>{children}</div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default Drawer