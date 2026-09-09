import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import ActionButton from './ActionButton'
import styles from './ConfirmDialog.module.css'

// Centered warning modal for destructive actions — distinct from Drawer (a side panel for forms). Reusable
// anywhere a "are you sure?" confirmation is needed.
function ConfirmDialog({ open, title, message, confirmLabel = 'Delete', onConfirm, onCancel }) {
    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div className={styles.backdrop} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} onClick={onCancel} />
                    <motion.div
                        className={styles.dialog}
                        initial={{ opacity: 0, scale: 0.94, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.94, y: 8 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        role="alertdialog"
                        aria-modal="true"
                        aria-label={title}
                    >
                        <span className={styles.iconWrap}>
                            <AlertTriangle size={20} aria-hidden="true" />
                        </span>
                        <h3 className={styles.title}>{title}</h3>
                        <p className={styles.message}>{message}</p>
                        <div className={styles.actions}>
                            <ActionButton variant="secondary" onClick={onCancel}>Cancel</ActionButton>
                            <button type="button" className={styles.confirmButton} onClick={onConfirm}>{confirmLabel}</button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default ConfirmDialog