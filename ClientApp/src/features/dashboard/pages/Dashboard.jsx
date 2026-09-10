import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import BentoStats from './components/BentoStats'
import InsightsGrid from './components/InsightsGrid'
import RevenueChart from './components/RevenueChart'
import MembersPaymentsRenewals from './components/MembersPaymentsRenewals'
import OccupancyCard from './components/OccupancyCard'
import SearchResults from './components/SearchResults'
import styles from './Dashboard.module.css'

// ThemeProvider is now at the app root (main.jsx) — Dashboard no longer needs its own.
function Dashboard() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const handleLogout = () => navigate('/login')

  return (
    <div className={styles.layout}>
      <Sidebar onLogout={handleLogout} />

      <main className={styles.main}>
        {/* Header no longer takes search props — search bar is removed globally */}
        <Header />
        <SearchResults query={searchQuery} />
        <HeroSection />
        <BentoStats />
        <InsightsGrid searchQuery={searchQuery} />

        <div className={styles.chartsRow}>
          <RevenueChart />
          <OccupancyCard />
        </div>

        <MembersPaymentsRenewals searchQuery={searchQuery} />
      </main>
    </div>
  )
}

export default Dashboard