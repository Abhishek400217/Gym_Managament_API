import { motion } from 'framer-motion'
import { Users } from 'lucide-react'
import { heroData } from '../../../../data/dashboardData'
import styles from './OccupancyCard.module.css'

const capacity = 100
const activeMembers = heroData.activeMembersNow
const capacityPercent = 68

function OccupancyCard() {
  return (
    <motion.section className={styles.card} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <div className={styles.header}><div><p className={styles.kicker}>LIVE CAPACITY</p><h2>Current Occupancy</h2></div><Users className={styles.icon} aria-hidden="true" /></div>
      <div className={styles.content}>
        <div className={styles.ring} style={{ '--progress': `${capacityPercent * 3.6}deg` }}><div className={styles.ringInner}><strong>{capacityPercent}%</strong><span>capacity</span></div></div>
        <div className={styles.metrics}><div><strong>{activeMembers}</strong><span>Active Members</span></div><div><strong>{capacity}</strong><span>Max Capacity</span></div><p>Balanced traffic across the floor today.</p></div>
      </div>
    </motion.section>
  )
}

export default OccupancyCard
