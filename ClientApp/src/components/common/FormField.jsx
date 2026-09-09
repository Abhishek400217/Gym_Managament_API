import styles from './FormField.module.css'

// Generic labeled input for dashboard-area forms — text or number, optional currency `prefix`, optional
// read-only state (used for the auto-generated description in "Add Plan" mode).
function FormField({ label, id, type = 'text', value, onChange, placeholder, error, readOnly = false, prefix }) {
    return (
        <div className={styles.wrapper}>
            {label && <label htmlFor={id} className={styles.label}>{label}</label>}
            <div className={`${styles.inputWrap} ${error ? styles.inputWrapError : ''} ${readOnly ? styles.readOnly : ''}`}>
                {prefix && <span className={styles.prefix}>{prefix}</span>}
                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    readOnly={readOnly}
                    className={styles.input}
                    aria-invalid={!!error}
                />
            </div>
            {error && <span className={styles.errorText} role="alert">{error}</span>}
        </div>
    )
}

export default FormField