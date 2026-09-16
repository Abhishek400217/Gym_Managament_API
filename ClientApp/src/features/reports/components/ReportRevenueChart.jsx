// ReportRevenueChart.jsx — Recharts AreaChart for revenue trend.
// Uses the same visual language as the Dashboard's RevenueChart.
// Supports daily (≤31 days) and monthly modes; chart points are clickable.

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import styles from './ReportRevenueChart.module.css'

function fmt(v) {
  if (v >= 100000) return `₹${(v / 100000).toFixed(1)}L`
  if (v >= 1000)   return `₹${(v / 1000).toFixed(1)}k`
  return `₹${v}`
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className={styles.tooltip}>
      <p className={styles.tooltipLabel}>{label}</p>
      <p className={styles.tooltipValue}>{fmt(payload[0].value)}</p>
    </div>
  )
}

function ReportRevenueChart({ data, mode, onPointClick }) {
  if (!data || data.length === 0) return null

  const handleClick = (chartData) => {
    if (chartData?.activePayload?.[0]) {
      const point = chartData.activePayload[0].payload
      onPointClick?.(point.date)
    }
  }

  // Determine tick interval for daily charts with many points
  const tickCount = data.length
  const interval = mode === 'daily' && tickCount > 14
    ? Math.floor(tickCount / 7) - 1
    : 0

  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart
        data={data}
        margin={{ top: 8, right: 12, left: 0, bottom: 0 }}
        onClick={handleClick}
        style={{ cursor: onPointClick ? 'pointer' : 'default' }}
      >
        <defs>
          <linearGradient id="reportRevFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#4F8CFF" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#4F8CFF" stopOpacity={0}   />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
        <XAxis
          dataKey="label"
          stroke="#6b7280"
          fontSize={11}
          tickLine={false}
          axisLine={false}
          interval={interval}
        />
        <YAxis
          stroke="#6b7280"
          fontSize={11}
          tickLine={false}
          axisLine={false}
          tickFormatter={fmt}
          width={52}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#4F8CFF"
          strokeWidth={2}
          fill="url(#reportRevFill)"
          dot={false}
          activeDot={{ r: 5, fill: '#4F8CFF', strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default ReportRevenueChart
