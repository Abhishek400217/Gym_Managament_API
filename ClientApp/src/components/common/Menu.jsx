import { useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MoreVertical } from 'lucide-react'
import { useClickOutside } from '../../hooks/useClickOutside'
import styles from './Menu.module.css'

// Generic dropdown menu primitive: a trigger button + an animated panel of items. Closes on outside click
// or item selection. `items` is [{ id, label, icon, tone }] — tone: 'danger' styles destructive actions red.
function Menu({ items, onSelect, align = 'right' }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useClickOutside(ref, () => setOpen(false))

  const handleSelect = (id) => {
    setOpen(false)
    onSelect?.(id)
  }

  return (
    <div className={styles.wrapper} ref={ref}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Open actions menu"
      >
        <MoreVertical size={16} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className={`${styles.panel} ${align === 'left' ? styles.alignLeft : styles.alignRight}`}
            initial={{ opacity: 0, scale: 0.96, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -4 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            role="menu"
          >
            {items.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  type="button"
                  role="menuitem"
                  className={`${styles.item} ${item.tone === 'danger' ? styles.itemDanger : ''}`}
                  onClick={() => handleSelect(item.id)}
                >
                  {Icon && <Icon size={15} aria-hidden="true" />}
                  {item.label}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Menu