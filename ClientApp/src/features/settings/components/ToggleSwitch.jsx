import styles from './ToggleSwitch.module.css'

// Reusable pill toggle for boolean settings. Purely visual — state is managed by the parent.
function ToggleSwitch({ id, label, description, checked, onChange, disabled = false }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.text}>
                <label htmlFor={id} className={styles.label}>{label}</label>
                {description && <p className={styles.description}>{description}</p>}
            </div>
            <button
                id={id}
                type="button"
                role="switch"
                aria-checked={checked}
                disabled={disabled}
                className={`${styles.toggle} ${checked ? styles.on : styles.off} ${disabled ? styles.disabled : ''}`}
                onClick={() => !disabled && onChange(!checked)}
            >
                <span className={styles.thumb} />
            </button>
        </div>
    )
}

export default ToggleSwitch
