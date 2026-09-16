// RevenueSection.jsx — Revenue metrics mini-cards + trend chart.

import { motion } from 'framer-motion'
import { IndianRupee, CheckCircle2, AlertCircle, AlertTriangle, TrendingUp } from 'lucide-react'
import ReportRevenueChart from './ReportRevenueChart'
import EmptyState from '../../../components/common/EmptyState'
import styles from './RevenueSection.module.css'

function fmtCurrency(n) {
  return `₹${n.toLocaleString('en-IN')}`
}

const METRIC_CARDS = [
  { key: 'revenue',       label: 'Total Revenue',     prefix: true, icon: IndianRupee,  tone: 'accent' },
  { key: 'paidCount',     label: 'Paid Payments',     prefix: false, icon: CheckCircle2, tone: 'success' },
  { key: 'pendingCount',  label: 'Pending',           prefix: false, icon: AlertCircle,  tone: 'warning' },
  { key: 'pendingAmount', label: 'Pending Amount',    prefix: true,  icon: AlertCircle,  tone: 'warning' },
  { key: 'overdueCount',  label: 'Overdue',           prefix: false, icon: AlertTriangle, tone: 'danger' },
  { key: 'avgPayment',    label: 'Avg Payment',       prefix: true,  icon: TrendingUp,   tone: 'accent' },
]

const TONE_COLORS = {
  accent:  { icon: '#4F8CFF', bg: 'rgba(79, 140, 255, 0.12)' },
  success: { icon: '#3DDC84', bg: 'rgba(61, 220, 132, 0.10)' },
  warning: { icon: '#F7B500', bg: 'rgba(247, 181, 0, 0.12)'  },
  danger:  { icon: '#FF4D67', bg: 'rgba(255, 77, 103, 0.10)' },
}

function MetricCard({ label, value, prefix, icon: Icon, tone, index, onClick }) {
  const colors = TONE_COLORS[tone] || TONE_COLORS.accent
  const display = prefix ? fmtCurrency(value) : value

  return (
    <motion.div
      className={`${styles.metricCard} ${onClick ? styles.clickable : ''}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: index * 0.04 }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className={styles.metricIcon} style={{ background: colors.bg }}>
        <Icon size={15} style={{ color: colors.icon }} aria-hidden="true" />
      </div>
      <p className={styles.metricValue}>{display}</p>
      <p className={styles.metricLabel}>{label}</p>
    </motion.div>
  )
}

function RevenueSection({ data, onDrill }) {
  const { revenueChartData, chartMode, paidCount } = data

  const metricValues = {
    revenue:       data.revenue,
    paidCount:     data.paidCount,
    pendingCount:  data.pendingCount,
    pendingAmount: data.pendingAmount,
    overdueCount:  data.overdueCount,
    avgPayment:    data.avgPayment,
  }

  const drillMap = {
    revenue:       'paid_payments',
    paidCount:     'paid_payments',
    pendingCount:  'pending_payments',
    pendingAmount: 'pending_payments',
    overdueCount:  'overdue_payments',
    avgPayment:    null,
  }

  const handleChartClick = (date) => {
    onDrill('payments_on_date', { date })
  }

  return (
    <div className={styles.section}>
      {/* Metric mini-cards */}
      <div className={styles.metricGrid}>
        {METRIC_CARDS.map((card, i) => (
          <MetricCard
            key={card.key}
            index={i}
            label={card.label}
            value={metricValues[card.key]}
            prefix={card.prefix}
            icon={card.icon}
            tone={card.tone}
            onClick={drillMap[card.key] ? () => onDrill(drillMap[card.key]) : undefined}
          />
        ))}
      </div>

      {/* Revenue trend chart */}
      <div className={styles.chartCard}>
        <div className={styles.chartHeader}>
          <div>
            <h3 className={styles.chartTitle}>Revenue Trend</h3>
            <p className={styles.chartSub}>
              {chartMode === 'daily' ? 'Daily breakdown for selected period' : 'Monthly breakdown for selected period'}
            </p>
          </div>
          <span className={styles.chartModeBadge}>
            {chartMode === 'daily' ? 'Daily' : 'Monthly'}
          </span>
        </div>

        {paidCount === 0 ? (
          <div className={styles.chartEmpty}>
            <EmptyState
              headline="No Revenue Data"
              subtext="No paid payments found for the selected period."
            />
          </div>
        ) : (
          <ReportRevenueChart
            data={revenueChartData}
            mode={chartMode}
            onPointClick={(date) => handleChartClick(date)}
          />
        )}
      </div>
    </div>
  )
}

export default RevenueSection
