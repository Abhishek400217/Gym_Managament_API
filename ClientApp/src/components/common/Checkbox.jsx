import styles from './Checkbox.module.css'

// A real <input type="checkbox"> under the hood — fully keyboard/screen-reader accessible — just visually
// restyled to match the glass UI instead of showing the browser's default checkbox.
function Checkbox({ id, checked, onChange, label }) {
  return (
    <label htmlFor={id} className={styles.wrapper}>
      <input id={id} type="checkbox" checked={checked} onChange={onChange} className={styles.input} />
      <span className={styles.box} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
    </label>
  )
}

export default Checkbox