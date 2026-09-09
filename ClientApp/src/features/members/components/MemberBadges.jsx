import { Cake, Clock, AlertCircle, Sparkles } from 'lucide-react'
import Badge from '../../../components/common/Badge'
import styles from './MemberBadges.module.css'

// Reads the derived boolean flags on a member and renders whichever status badges apply. A member can carry
// zero, one, or several at once (e.g. new AND expiring soon).
function MemberBadges({ member }) {
  const badges = []
  if (member.isBirthdayThisWeek) badges.push({ id: 'birthday', label: 'Birthday', tone: 'accent', icon: Cake })
  if (member.isExpiringSoon) badges.push({ id: 'expiring', label: 'Expiring Soon', tone: 'warning', icon: Clock })
  if (member.isPendingPayment) badges.push({ id: 'pending', label: 'Pending Payment', tone: 'danger', icon: AlertCircle })
  if (member.isNewMember) badges.push({ id: 'new', label: 'New Member', tone: 'success', icon: Sparkles })

  if (badges.length === 0) return null

  return (
    <div className={styles.row}>
      {badges.map((badge) => (
        <Badge key={badge.id} label={badge.label} tone={badge.tone} icon={badge.icon} />
      ))}
    </div>
  )
}

export default MemberBadges