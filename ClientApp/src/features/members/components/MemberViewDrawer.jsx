import Drawer from '../../../components/common/Drawer'
import Avatar from '../../../components/common/Avatar'
import Badge from '../../../components/common/Badge'
import styles from './MemberViewDrawer.module.css'

const PAYMENT_TONE = { Paid: 'success', Pending: 'warning', Overdue: 'danger' }

function Row({ label, value }) {
    return (
        <div className={styles.row}>
            <span className={styles.label}>{label}</span>
            <span className={styles.value}>{value}</span>
        </div>
    )
}

// Read-only member profile view in a right-side drawer.
function MemberViewDrawer({ open, onClose, member }) {
    if (!member) return null

    return (
        <Drawer open={open} onClose={onClose} title="Member Details">
            <div className={styles.content}>
                {/* Profile header */}
                <div className={styles.profile}>
                    <Avatar name={member.name} size={56} />
                    <div className={styles.profileInfo}>
                        <p className={styles.name}>{member.name}</p>
                        <p className={styles.memberId}>{member.memberId}</p>
                        <Badge
                            label={member.paymentStatus}
                            tone={PAYMENT_TONE[member.paymentStatus] || 'neutral'}
                        />
                    </div>
                </div>

                <div className={styles.divider} />

                {/* Details grid */}
                <div className={styles.details}>
                    <Row label="Mobile" value={member.mobile} />
                    <Row label="Gender" value={member.gender} />
                    <Row label="Membership" value={member.membershipDuration} />
                    <Row label="Fee" value={`₹${member.membershipFee?.toLocaleString()}`} />
                    <Row label="Join Date" value={member.joinDate} />
                    <Row label="Expiry Date" value={member.expiryDate} />
                    {member.isExpiringSoon && (
                        <div className={styles.alert}>⚠️ Membership expiring soon</div>
                    )}
                    {member.isBirthdayThisWeek && (
                        <div className={styles.birthday}>🎂 Birthday this week!</div>
                    )}
                </div>
            </div>
        </Drawer>
    )
}

export default MemberViewDrawer
