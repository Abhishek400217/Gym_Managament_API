import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ThemeProvider } from '../../../context/ThemeContext'
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

function Dashboard() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const handleLogout = () => navigate('/login')

  return (
    <ThemeProvider>
      <div className={styles.layout}>
        <Sidebar onLogout={handleLogout} />

        <main className={styles.main}>
          <Header searchQuery={searchQuery} onSearch={setSearchQuery} />
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
    </ThemeProvider>
  )
}

export default Dashboard