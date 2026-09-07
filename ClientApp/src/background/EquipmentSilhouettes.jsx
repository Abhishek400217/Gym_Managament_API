import styles from './EquipmentSilhouettes.module.css'

// Heavily blurred, low-opacity shapes suggesting a squat rack, a weight-plate stack, and a bench — left-
// weighted to match the reference composition. Intentionally abstract: no hard edges, no line-art, no
// recognizable icon silhouette. This is a depth cue that says "gym equipment sits here in shadow," not a
// literal illustration — per the brief's own instruction to keep this "in the background... never distract."
function EquipmentSilhouettes() {
  return (
    <svg
      className={styles.silhouettes}
      viewBox="0 0 800 1000"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <defs>
        <filter id="softBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <linearGradient id="gearFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#04060a" stopOpacity="0" />
          <stop offset="35%" stopColor="#04060a" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#04060a" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      <g filter="url(#softBlur)" fill="url(#gearFade)">
        <rect x="60" y="260" width="18" height="480" rx="6" />
        <rect x="150" y="260" width="18" height="480" rx="6" />
        <rect x="60" y="400" width="108" height="14" rx="6" />
        <rect x="60" y="470" width="108" height="10" rx="5" />

        <ellipse cx="120" cy="880" rx="66" ry="16" />
        <ellipse cx="120" cy="858" rx="60" ry="14" />
        <ellipse cx="120" cy="838" rx="52" ry="12" />

        <rect x="220" y="800" width="230" height="34" rx="17" />
        <rect x="240" y="834" width="14" height="60" rx="6" />
        <rect x="420" y="834" width="14" height="60" rx="6" />
      </g>
    </svg>
  )
}

export default EquipmentSilhouettes