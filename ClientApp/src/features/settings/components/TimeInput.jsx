import styles from './TimeInput.module.css'

// Styled native <input type="time"> that matches the app's FormField visual language.
function TimeInput({ id, label, value, onChange }) {
    return (
        <div className={styles.wrapper}>
            <label htmlFor={id} className={styles.label}>{label}</label>
            <input
                id={id}
                type="time"
                value={value}
                onChange={onChange}
                className={styles.input}
            />
        </div>
    )
}

export default TimeInput
