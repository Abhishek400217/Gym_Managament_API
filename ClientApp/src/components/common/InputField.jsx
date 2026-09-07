import { useId, useState } from 'react'
import { motion } from 'framer-motion'
import { FiEye, FiEyeOff, FiCheck } from 'react-icons/fi'
import styles from './InputField.module.css'

// Floating-label input: left icon, password toggle, shake on error, check mark on valid entry.
function InputField({ label, type = 'text', name, value, onChange, icon: Icon, error, success = false }) {
  const id = useId()
  const [showPassword, setShowPassword] = useState(false)
  const [focused, setFocused] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && showPassword ? 'text' : type
  const isFloating = focused || value.length > 0

  return (
    <motion.div
      className={styles.wrapper}
      animate={error ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }}
      transition={{ duration: 0.4 }}
    >
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
          className={styles.input}
          autoComplete={isPassword ? 'current-password' : 'email'}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />

        <label htmlFor={id} className={`${styles.label} ${isFloating ? styles.labelFloating : ''}`}>
          {label}
        </label>

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