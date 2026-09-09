import Skeleton from '../../../components/common/Skeleton'
import styles from './MembersTableSkeleton.module.css'

// Premium shimmer placeholder shown while the (simulated) member list loads. Mirrors the real table/card
// shape so layout doesn't jump once real content arrives.
function MembersTableSkeleton({ isMobile, rows = 6 }) {
  if (isMobile) {
    return (
      <div>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className={styles.cardSkeleton}>
            <div className={styles.cardTop}>
              <Skeleton width={42} height={42} radius={999} />
              <div className={styles.cardTopText}>
                <Skeleton width="60%" height={13} />
                <Skeleton width="40%" height={11} />
              </div>
            </div>
            <Skeleton width="100%" height={50} radius={12} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={styles.tableSkeleton}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className={styles.rowSkeleton}>
          <div className={styles.rowIdentity}>
            <Skeleton width={38} height={38} radius={999} />
            <Skeleton width={130} height={13} />
          </div>
          <Skeleton width={100} height={12} />
          <Skeleton width={60} height={12} />
          <Skeleton width={70} height={12} />
          <Skeleton width={70} height={12} />
          <Skeleton width={80} height={12} />
          <Skeleton width={80} height={12} />
          <Skeleton width={70} height={22} radius={20} />
        </div>
      ))}
    </div>
  )
}

export default MembersTableSkeleton