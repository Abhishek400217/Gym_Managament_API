import MemberRow from './MemberRow'
import styles from './MembersTable.module.css'

const COLUMNS = ['Member', 'Mobile Number', 'Gender', 'Duration', 'Fee', 'Join Date', 'Expiry Date', 'Payment Status', '']

function MembersTable({ members, onAction }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            {COLUMNS.map((col) => (
              <th key={col} className={styles.th}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <MemberRow key={member.id} member={member} index={index} onAction={onAction} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MembersTable