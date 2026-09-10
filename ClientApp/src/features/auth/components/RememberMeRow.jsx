import Checkbox from '../../../components/common/Checkbox'
import styles from './RememberMeRow.module.css'

// Sits between the password field and the submit button. `remember` state lives in the parent form —
// Feature 3 will read it to decide whether the JWT persists in localStorage vs. memory-only.
function RememberMeRow({ remember, onRememberChange }) {
  return (
    <div className={styles.row}>
      <Checkbox id="remember-me" checked={remember} onChange={onRememberChange} label="Remember me" />
    </div>
  )
}

export default RememberMeRow