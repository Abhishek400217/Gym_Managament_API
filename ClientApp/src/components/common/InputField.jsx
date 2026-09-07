import { useId, useState } from 'react'
import { motion } from 'framer-motion'
import { FiEye, FiEyeOff, FiCheck } from 'react-icons/fi'
import styles from './InputField.module.css'

// Icon-led glass input. `label` doubles as the visible prompt (rendered as the placeholder, matching the
// reference's minimal single-line style) and the accessible name, via a visually-hidden <label> — so removing
// the floating-label chip doesn't cost screen-reader users anything.
function InputField({ label, type = 'text', name, value, onChange, icon: Icon, error, success = false }) {
  const id = useId()
  const [showPassword, setShowPassword] = useState(false)
  const [focused, setFocused] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && showPassword ? 'text' : type

  return (
    <motion.div
      className={styles.wrapper}
      animate={error ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <label htmlFor={id} className={styles.srOnly}>{label}</label>

      <div className={`${styles.field} ${error ? styles.fieldError : ''} ${focused ? styles.fieldFocused : ''}`}>
        {Icon && <Icon className={styles.leadingIcon} aria-hidden="true" />}

        <input
          id={id}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={label}
          className={styles.input}
          autoComplete={isPassword ? 'current-password' : 'email'}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />

        {isPassword && (
          <button
            type="button"
            className={styles.toggleButton}
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPassword ? <FiEyeOff aria-hidden="true" /> : <FiEye aria-hidden="true" />}
          </button>
        )}

        {success && !error && (
          <motion.span initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={styles.successIcon}>
            <FiCheck aria-hidden="true" />
          </motion.span>
        )}
      </div>

      {error && (
        <motion.span id={`${id}-error`} className={styles.errorText} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} role="alert">
          {error}
        </motion.span>
      )}
    </motion.div>
  )
}

export default InputField