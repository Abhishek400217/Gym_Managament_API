import { motion } from 'framer-motion'
import { UserPlus, Wallet, CheckSquare, FilePlus, Circle } from 'lucide-react'
import { useMagneticHover } from '../../../../hooks/useMagneticHover'
import { quickActions } from '../../../../data/dashboardData'
import styles from './ActionPills.module.css'

const ICON_MAP = { UserPlus, Wallet, CheckSquare, FilePlus }

function ActionPill({ label, icon, onClick, index }) {
  const Icon = ICON_MAP[icon] || Circle
  const { ref, x, y, handlePointerMove, handlePointerLeave } = useMagneticHover(10)

  return (
    <motion.button
      ref={ref}
      type="button"
      className={styles.pill}
      style={{ x, y }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className={styles.icon} strokeWidth={1.8} aria-hidden="true" />
      <span>{label}</span>
    </motion.button>
  )
}

// Premium pill-shaped quick actions with a magnetic hover pull — replaces the old equal-size boxy cards.
function ActionPills({ onAction }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Quick Actions</h2>
      <div className={styles.row}>
        {quickActions.map((action, index) => (
          <ActionPill key={action.id} label={action.label} icon={action.icon} index={index} onClick={() => onAction?.(action.id)} />
        ))}
      </div>
    </section>
  )
}

export default ActionPills