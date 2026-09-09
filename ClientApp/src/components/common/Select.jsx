import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Check } from 'lucide-react'
import { useClickOutside } from '../../hooks/useClickOutside'
import styles from './Select.module.css'

// Custom-styled select matching the app's premium panel language (same trigger/panel shape as Menu).
// Options may be individually disabled (e.g. a duration already taken by another plan) with an optional
// `hint` shown alongside the label — this is what powers the "prevent duplicate duration" UX.
function Select({ label, value, onChange, options, placeholder = 'Select...', error, id }) {
    const [open, setOpen] = useState(false)
    const ref = useRef(null)
    useClickOutside(ref, () => setOpen(false))

    const selected = options.find((opt) => opt.value === value)

    const handleSelect = (option) => {
        if (option.disabled) return
        onChange(option.value)
        setOpen(false)
    }

    return (
        <div className={styles.wrapper} ref={ref}>
            {label && <label className={styles.label} htmlFor={id}>{label}</label>}

            <button
                type="button"
                id={id}
                className={`${styles.trigger} ${error ? styles.triggerError : ''}`}
                onClick={() => setOpen((prev) => !prev)}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <span className={selected ? styles.value : styles.placeholder}>
                    {selected ? selected.label : placeholder}
                </span>
                <ChevronDown size={16} className={styles.chevron} aria-hidden="true" />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.ul
                        className={styles.panel}
                        role="listbox"
                        initial={{ opacity: 0, scale: 0.97, y: -4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.97, y: -4 }}
                        transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {options.map((option) => (
                            <li key={option.value}>
                                <button
                                    type="button"
                                    role="option"
                                    aria-selected={option.value === value}
                                    className={`${styles.option} ${option.disabled ? styles.optionDisabled : ''}`}
                                    onClick={() => handleSelect(option)}
                                    disabled={option.disabled}
                                >
                                    <span>{option.label}</span>
                                    {option.hint && <span className={styles.hint}>{option.hint}</span>}
                                    {option.value === value && <Check size={14} aria-hidden="true" />}
                                </button>
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>

            {error && <span className={styles.errorText} role="alert">{error}</span>}
        </div>
    )
}

export default Select