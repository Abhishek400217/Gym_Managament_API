import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Button.module.css'

// Premium CTA: gradient fill, ripple on click, swaps between label+icon / spinner / success check.
// `icon` is a generic optional prop (not hardcoded to an arrow) so this stays reusable for any future button.
function Button({ children, type = 'button', onClick, disabled = false, loading = false, success = false, icon: Icon }) {
  const [ripples, setRipples] = useState([])

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const ripple = { id: Date.now(), x: e.clientX - rect.left, y: e.clientY - rect.top }
    setRipples((prev) => [...prev, ripple])
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== ripple.id))
    }, 600)
    if (onClick) onClick(e)
  }

  return (
    <motion.button
      type={type}
      className={styles.button}
      onClick={handleClick}
      disabled={disabled || loading}
      whileHover={disabled ? {} : { y: -2, boxShadow: '0 14px 34px rgba(79, 140, 255, 0.4)' }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <span className={styles.content}>
        <AnimatePresence mode="wait">
          {success ? (
            <motion.span key="success" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} className={styles.icon}>
              ✓
            </motion.span>
          ) : loading ? (
            <motion.span key="loading" className={styles.spinner} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          ) : (
            <motion.span key="label" className={styles.labelRow} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}>
              {children}
              {Icon && <Icon className={styles.trailingIcon} aria-hidden="true" />}
            </motion.span>
          )}
        </AnimatePresence>
      </span>

      {ripples.map((r) => (
        <span key={r.id} className={styles.ripple} style={{ left: r.x, top: r.y }} />
      ))}
    </motion.button>
  )
}

export default Button