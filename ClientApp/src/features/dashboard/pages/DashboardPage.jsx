import { FiBarChart2, FiCheckCircle, FiCreditCard, FiDollarSign, FiGrid, FiLogOut, FiSettings, FiUsers } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import styles from './DashboardPage.module.css'

const cards = [
  { title: 'Dashboard', description: 'Overview of your gym operations.', icon: FiGrid },
  { title: 'Members', description: 'Manage your active member base.', icon: FiUsers },
  { title: 'Membership Plans', description: 'Review plans and subscriptions.', icon: FiCreditCard },
  { title: 'Payments', description: 'Track recent payment activity.', icon: FiDollarSign },
  { title: 'Attendance', description: 'Monitor daily gym check-ins.', icon: FiCheckCircle },
  { title: 'Reports', description: 'View useful performance summaries.', icon: FiBarChart2 },
  { title: 'Settings', description: 'Configure your admin workspace.', icon: FiSettings },
]

function DashboardPage() {
  const navigate = useNavigate()

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>PULSEFIT STUDIO OS</p>
          <h1>Admin Dashboard</h1>
          <p className={styles.subtitle}>Manage your gym from one focused workspace.</p>
        </div>
        <button type="button" className={styles.logoutButton} onClick={() => navigate('/login')}>
          <FiLogOut aria-hidden="true" />
          Log out
        </button>
      </header>

      <section className={styles.cardGrid} aria-label="Gym management sections">
        {cards.map(({ title, description, icon: Icon }) => (
          <article className={styles.card} key={title}>
            <div className={styles.icon}><Icon aria-hidden="true" /></div>
            <h2>{title}</h2>
            <p>{description}</p>
          </article>
        ))}
      </section>
    </main>
  )
}

export default DashboardPage
