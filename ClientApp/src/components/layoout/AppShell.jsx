import { useNavigate } from 'react-router-dom'
import { ThemeProvider } from '../../context/ThemeContext'
import Sidebar from '../../features/dashboard/pages/components/Sidebar'
import Header from '../../features/dashboard/pages/components/Header'
import styles from './AppShell.module.css'

// Shared page shell (sidebar + header + theme scope). Dashboard.jsx predates this and still wires
// Sidebar/Header inline — left untouched per instructions — but every new page starting with Members uses
// this shared shell instead of duplicating that wiring.
function AppShell({ children }) {
  const navigate = useNavigate()
  const handleLogout = () => navigate('/login')

  return (
    <ThemeProvider>
      <div className={styles.layout}>
        <Sidebar onLogout={handleLogout} />
        <main className={styles.main}>
          <Header />
          {children}
        </main>
      </div>
    </ThemeProvider>
  )
}

export default AppShell