import { useNavigate } from 'react-router-dom'
import Sidebar from '../../features/dashboard/pages/components/Sidebar'
import Header from '../../features/dashboard/pages/components/Header'
import styles from './AppShell.module.css'

// Shared page shell (sidebar + header). ThemeProvider is now at the app root (main.jsx), so it is NOT
// re-instantiated here — every page already inherits the single global theme context.
function AppShell({ children }) {
  const navigate = useNavigate()
  const handleLogout = () => navigate('/login')

  return (
    <div className={styles.layout}>
      <Sidebar onLogout={handleLogout} />
      <main className={styles.main}>
        <Header />
        {children}
      </main>
    </div>
  )
}

export default AppShell