import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import styles from './SuccessToast.module.css'

// Animated success toast that auto-dismisses. The parent controls visibility via `visible` prop.
function SuccessToast({ visible, message = 'Settings saved successfully!' }) {
    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className={styles.toast}
                    initial={{ opacity: 0, y: 32, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 16, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    role="status"
                    aria-live="polite"
                >
                    <span className={styles.iconWrap}>
                        <CheckCircle2 size={17} aria-hidden="true" />
                    </span>
                    <span className={styles.message}>{message}</span>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default SuccessToast
