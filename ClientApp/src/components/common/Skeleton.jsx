import styles from './Skeleton.module.css'

// Shimmering placeholder block. Width/height/radius are overridable so one primitive approximates any
// shape — an avatar circle, a text line, a full row — rather than needing a bespoke skeleton per shape.
function Skeleton({ width = '100%', height = 14, radius = 8, className = '' }) {
  return (
    <span
      className={`${styles.skeleton} ${className}`}
      style={{ width, height, borderRadius: radius }}
      aria-hidden="true"
    />
  )
}

export default Skeleton