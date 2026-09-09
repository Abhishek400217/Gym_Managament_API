import styles from './Avatar.module.css'

const PALETTE = ['#4F8CFF', '#3DDC84', '#F7B500', '#FF4D67', '#8B5CF6', '#22C1DC']

function getInitials(name) {
  const parts = name.trim().split(' ').filter(Boolean)
  return parts.slice(0, 2).map((p) => p[0]).join('').toUpperCase()
}

function getColorForName(name) {
  let hash = 0
  for (let i = 0; i < name.length; i += 1) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return PALETTE[Math.abs(hash) % PALETTE.length]
}

// Generated-initials avatar — no image upload needed. Color is deterministically derived from the name so
// the same member always gets the same color everywhere, without storing a color field in the data.
function Avatar({ name, size = 38 }) {
  const initials = getInitials(name)
  const color = getColorForName(name)

  return (
    <span
      className={styles.avatar}
      style={{ width: size, height: size, fontSize: size * 0.36, background: `linear-gradient(135deg, ${color}, ${color}99)` }}
      aria-hidden="true"
    >
      {initials}
    </span>
  )
}

export default Avatar