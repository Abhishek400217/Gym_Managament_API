import styles from './ReadOnlyField.module.css'

// Displays a labeled read-only value in the same visual language as FormField but without an <input> —
// avoids the disabled/readonly quirks and communicates "this is informational" more clearly.
function ReadOnlyField({ label, value, mono = false }) {
    return (
        <div className={styles.wrapper}>
            <span className={styles.label}>{label}</span>
            <span className={`${styles.value} ${mono ? styles.mono : ''}`}>{value}</span>
        </div>
    )
}

export default ReadOnlyField
