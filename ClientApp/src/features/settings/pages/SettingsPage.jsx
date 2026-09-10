import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Activity, Upload,
} from 'lucide-react'
import AppShell from '../../../components/layoout/AppShell'
import ActionButton from '../../../components/common/ActionButton'
import SettingsNav from '../components/SettingsNav'
import SettingsSection from '../components/SettingsSection'
import ReadOnlyField from '../components/ReadOnlyField'
import TimeInput from '../components/TimeInput'
import SuccessToast from '../components/SuccessToast'
import styles from './SettingsPage.module.css'

// ─── Persistent defaults ────────────────────────────────────────────────────
const STORAGE_KEY = 'pulsefit-settings'

function loadSettings() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) return JSON.parse(raw)
    } catch { /* ignore */ }
    return null
}

const DEFAULT_SETTINGS = {
    logoUrl: null,
    openingTime: '06:00',
    closingTime: '22:00',
}

// ─── Static gym info (read-only, realistic dummy data) ──────────────────────
const GYM_INFO = {
    name: 'PulseFit Gym',
    address: '14, Fitness Hub Road, Kothrud, Pune, Maharashtra – 411038',
    ownerName: 'Abhishek Karande',
    ownerMobile: '+91 98765 43210',
    ownerEmail: 'abhishek@pulsefitgym.in',
    gstNumber: '27AABCP1234A1Z5',
    website: 'www.pulsefitgym.in',
    mapsLink: 'maps.google.com/?q=PulseFit+Gym+Kothrud+Pune',
}



// ────────────────────────────────────────────────────────────────────────────
function SettingsPage() {
    const saved = loadSettings()
    const [activeSection, setActiveSection] = useState('general')
    const [logoUrl, setLogoUrl] = useState(saved?.logoUrl ?? DEFAULT_SETTINGS.logoUrl)
    const [openingTime, setOpeningTime] = useState(saved?.openingTime ?? DEFAULT_SETTINGS.openingTime)
    const [closingTime, setClosingTime] = useState(saved?.closingTime ?? DEFAULT_SETTINGS.closingTime)
    const [toastVisible, setToastVisible] = useState(false)
    const toastTimerRef = useRef(null)
    const fileInputRef = useRef(null)

    const handleLogoChange = (e) => {
        const file = e.target.files?.[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = (ev) => setLogoUrl(ev.target.result)
        reader.readAsDataURL(file)
    }

    const handleSave = () => {
        const data = { logoUrl, openingTime, closingTime }
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)) } catch { /* ignore */ }
        clearTimeout(toastTimerRef.current)
        setToastVisible(true)
        toastTimerRef.current = setTimeout(() => setToastVisible(false), 3000)
    }

    useEffect(() => () => clearTimeout(toastTimerRef.current), [])

    // ── Section renderers ────────────────────────────────────────────────────
    const renderSection = () => {
        switch (activeSection) {
            // ── GENERAL ──────────────────────────────────────────────────────
            case 'general':
                return (
                    <div key="general" className={styles.sectionsStack}>
                        <SettingsSection title="General" description="Core application settings. These values are fixed and cannot be changed.">
                            <ReadOnlyField label="Gym Name" value="PulseFit Gym" />
                            <ReadOnlyField label="Renewal Reminder" value="Always 3 Days Before Expiry" />
                        </SettingsSection>
                    </div>
                )

            // ── GYM INFORMATION ───────────────────────────────────────────────
            case 'gym-info':
                return (
                    <div key="gym-info" className={styles.sectionsStack}>
                        <SettingsSection title="Gym Logo" description="Upload your gym logo. Displayed in the app header and receipts.">
                            <div className={styles.logoRow}>
                                <div className={styles.logoPreview}>
                                    {logoUrl ? (
                                        <img src={logoUrl} alt="Gym logo" className={styles.logoImg} />
                                    ) : (
                                        <Activity size={28} className={styles.logoPlaceholderIcon} aria-hidden="true" />
                                    )}
                                </div>
                                <div className={styles.logoActions}>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        className={styles.fileInputHidden}
                                        onChange={handleLogoChange}
                                        aria-label="Upload gym logo"
                                    />
                                    <ActionButton icon={Upload} onClick={() => fileInputRef.current?.click()}>
                                        {logoUrl ? 'Change Logo' : 'Upload Logo'}
                                    </ActionButton>
                                    {logoUrl && (
                                        <ActionButton variant="secondary" onClick={() => setLogoUrl(null)}>
                                            Remove
                                        </ActionButton>
                                    )}
                                    <p className={styles.logoHint}>PNG, JPG or SVG. Max 2 MB.</p>
                                </div>
                            </div>
                        </SettingsSection>

                        <SettingsSection title="Gym Details" description="Business information. Contact your administrator to update these fields.">
                            <div className={styles.fieldGrid}>
                                <ReadOnlyField label="Gym Name" value={GYM_INFO.name} />
                                <ReadOnlyField label="Owner Name" value={GYM_INFO.ownerName} />
                                <ReadOnlyField label="Owner Mobile" value={GYM_INFO.ownerMobile} />
                                <ReadOnlyField label="Owner Email" value={GYM_INFO.ownerEmail} />
                                <ReadOnlyField label="GST Number" value={GYM_INFO.gstNumber} mono />
                                <ReadOnlyField label="Website" value={GYM_INFO.website} />
                            </div>
                            <ReadOnlyField label="Gym Address" value={GYM_INFO.address} />
                            <ReadOnlyField label="Google Maps Link" value={GYM_INFO.mapsLink} />
                        </SettingsSection>

                        <SettingsSection title="Working Hours" description="Set your gym's daily opening and closing times.">
                            <div className={styles.timeRow}>
                                <TimeInput
                                    id="opening-time"
                                    label="Opening Time"
                                    value={openingTime}
                                    onChange={(e) => setOpeningTime(e.target.value)}
                                />
                                <TimeInput
                                    id="closing-time"
                                    label="Closing Time"
                                    value={closingTime}
                                    onChange={(e) => setClosingTime(e.target.value)}
                                />
                            </div>
                        </SettingsSection>
                    </div>
                )

            // ── ABOUT ─────────────────────────────────────────────────────────
            case 'about':
                return (
                    <div key="about" className={styles.sectionsStack}>
                        <SettingsSection>
                            <div className={styles.aboutCard}>
                                <motion.div
                                    className={styles.aboutIconWrap}
                                    animate={{ rotate: [0, 8, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                >
                                    <Activity size={28} aria-hidden="true" />
                                </motion.div>
                                <h2 className={styles.aboutAppName}>PulseFit</h2>
                                <p className={styles.aboutFullName}>Gym Management System</p>
                                <p className={styles.aboutVersion}>v1.0.0</p>

                                <div className={styles.aboutDivider} aria-hidden="true" />

                                <p className={styles.aboutCredit}>
                                    Made with{' '}
                                    <motion.span
                                        className={styles.heart}
                                        animate={{ scale: [1, 1.25, 1] }}
                                        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                                        aria-label="love"
                                    >
                                        ❤️
                                    </motion.span>{' '}
                                    by
                                </p>
                                <p className={styles.aboutDeveloper}>Abhishek Karande</p>

                                <div className={styles.aboutBadges}>
                                    <span className={styles.aboutBadge}>React 19</span>
                                    <span className={styles.aboutBadge}>Vite</span>
                                    <span className={styles.aboutBadge}>Framer Motion</span>
                                    <span className={styles.aboutBadge}>Lucide Icons</span>
                                </div>
                            </div>
                        </SettingsSection>
                    </div>
                )

            default:
                return null
        }
    }

    return (
        <AppShell>
            <div className={styles.page}>
                {/* Page Header */}
                <div className={styles.pageHeader}>
                    <div>
                        <h1 className={styles.pageTitle}>Settings</h1>
                        <p className={styles.pageSubtitle}>Manage your gym preferences and application settings.</p>
                    </div>
                    <ActionButton onClick={handleSave}>Save Changes</ActionButton>
                </div>

                {/* Two-column layout */}
                <div className={styles.layout}>
                    {/* Left settings nav */}
                    <aside className={styles.sidebar}>
                        <div className={styles.sidebarInner}>
                            <SettingsNav active={activeSection} onChange={setActiveSection} />
                        </div>
                    </aside>

                    {/* Right content area */}
                    <div className={styles.content}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeSection}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {renderSection()}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <SuccessToast visible={toastVisible} />
        </AppShell>
    )
}

export default SettingsPage
