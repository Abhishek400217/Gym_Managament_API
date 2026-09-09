import BentoCard from '../../../../components/common/BentoCard'
import { bentoStats } from '../../../../data/dashboardData'
import styles from './BentoStats.module.css'

// The asymmetric bento stats grid. Card sizes come from each entry's `size` field in dashboardData — this
// component is pure layout, so adding an 8th metric later means editing the data file, not this file.
function BentoStats() {
  return (
    <section className={styles.grid} aria-label="Key metrics">
      {bentoStats.map((stat, index) => (
        <BentoCard key={stat.id} index={index} {...stat} />
      ))}
    </section>
  )
}

export default BentoStats