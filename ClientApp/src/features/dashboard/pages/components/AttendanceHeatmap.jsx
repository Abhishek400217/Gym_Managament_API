import { motion } from 'framer-motion'
import { attendanceHeatmap } from '../../../../data/dashboardData'
import styles from './AttendanceHeatmap.module.css'

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

// GitHub-contributions-style heatmap. attendanceHeatmap is a 6-week x 7-day grid of intensity values (0-4);
// each cell's opacity maps to intensity so busy days visibly stand out without a label on every cell.
function AttendanceHeatmap() {
  return (
    <motion.section
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className={styles.heading}>Attendance Heatmap</h2>

      <div className={styles.grid}>
        <div className={styles.dayLabels}>
          {DAY_LABELS.map((day) => (
            <span key={day} className={styles.dayLabel}>{day}</span>
          ))}
        </div>

        <div className={styles.weeks}>
          {attendanceHeatmap.map((week, weekIndex) => (
            <div className={styles.week} key={weekIndex}>
              {week.map((intensity, dayIndex) => (
                <motion.span
                  key={dayIndex}
                  className={styles.cell}
                  style={{ opacity: 0.15 + intensity * 0.2 }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, delay: (weekIndex * 7 + dayIndex) * 0.01 }}
                  title={`${DAY_LABELS[dayIndex]}, week ${weekIndex + 1}: intensity ${intensity}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.legend}>
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <span key={level} className={styles.legendCell} style={{ opacity: 0.15 + level * 0.2 }} />
        ))}
        <span>More</span>
      </div>
    </motion.section>
  )
}

export default AttendanceHeatmap