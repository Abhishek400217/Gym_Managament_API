import { motion } from 'framer-motion'
import styles from './ActionButton.module.css'

// Solid primary CTA for dashboard-area pages — distinct from the pill-shaped ActionPills on the Dashboard,
// and separate from the auth feature's full-width Button. Generic enough for any page's primary action.
function ActionButton({ children, icon: Icon, onClick, type = 'button', variant = 'primary' }) {
  return (
    <motion.button
      type={type}
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {Icon && <Icon size={16} aria-hidden="true" />}
      {children}
    </motion.button>
  )
}

export default ActionButton