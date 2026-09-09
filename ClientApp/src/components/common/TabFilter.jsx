import styles from './TabFilter.module.css'

// Generic single-select pill-tab filter group — not specific to Payments; any module can reuse this.
function TabFilter({ options, activeId, onChange }) {
    return (
        <div className={styles.row} role="tablist">
            {options.map((option) => (
                <button
                    key={option.id}
                    type="button"
                    role="tab"
                    aria-selected={option.id === activeId}
                    className={`${styles.tab} ${option.id === activeId ? styles.tabActive : ''}`}
                    onClick={() => onChange(option.id)}
                >
                    {option.label}
                </button>
            ))}
        </div>
    )
}

export default TabFilter