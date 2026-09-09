// Dummy data only — no API, no axios, no backend. Icon values are exact lucide-react export names
// (PascalCase) so components can index directly into their own named-import maps.

export const heroData = {
  gymStatus: 'open',
  activeMembersNow: 34,
  weather: { condition: 'sunny', tempC: 28 },
}

export const bentoStats = [
  { id: 'members', label: 'Active Members', value: 482, icon: 'Users', size: 'lg', trend: '+12 this month', trendDirection: 'up' },
  { id: 'revenue', label: 'Monthly Revenue', value: 482300, prefix: '₹', icon: 'TrendingUp', size: 'md', trend: '+8.4%', trendDirection: 'up' },
  { id: 'checkins', label: 'Current Check-ins', value: 57, icon: 'UserCheck', size: 'md', trend: '+5 this month', trendDirection: 'up' },
  { id: 'renewals', label: 'Renewals This Month', value: 18, icon: 'RefreshCw', size: 'sm' },
  { id: 'plans', label: 'Active Plans', value: 6, icon: 'CreditCard', size: 'sm' },
  { id: 'payments', label: 'Payments Received', value: 128, icon: 'Wallet', size: 'sm' },
  { id: 'reports', label: 'Reports Generated', value: 14, icon: 'FileText', size: 'sm' },
]

export const insights = [
  { id: 'new-members', label: 'New Members This Month', value: 23, icon: 'UserPlus', tone: 'success' },
  { id: 'month-revenue', label: 'This Month Revenue', value: 482300, prefix: '₹', icon: 'IndianRupee', tone: 'accent' },
  { id: 'pending-payments', label: 'Pending Payments', value: 9, icon: 'AlertCircle', tone: 'warning' },
  { id: 'expiring-memberships', label: 'Expiring Memberships', value: 18, suffix: ' Need Renewal', icon: 'CalendarClock', tone: 'warning' },
]

export const quickActions = [
  { id: 'add-member', label: 'Add Member', icon: 'UserPlus' },
  { id: 'record-payment', label: 'Record Payment', icon: 'Wallet' },
  { id: 'mark-attendance', label: 'Mark Attendance', icon: 'CheckSquare' },
  { id: 'add-plan', label: 'Add Membership Plan', icon: 'FilePlus' },
]

export const revenueTrend = [
  { month: 'Apr', revenue: 312000 }, { month: 'May', revenue: 338000 },
  { month: 'Jun', revenue: 356000 }, { month: 'Jul', revenue: 341000 },
  { month: 'Aug', revenue: 398000 }, { month: 'Sep', revenue: 425000 },
  { month: 'Oct', revenue: 412000 }, { month: 'Nov', revenue: 447000 },
  { month: 'Dec', revenue: 468000 }, { month: 'Jan', revenue: 455000 },
  { month: 'Feb', revenue: 470000 }, { month: 'Mar', revenue: 482300 },
]

export const upcomingRenewals = [
  { id: 1, name: 'Rohan Mehta', duration: '6 Month Membership', amount: 6000, expiry: '18 Sept', daysLeft: 2, initials: 'RM' },
  { id: 2, name: 'Priya Singh', duration: '12 Month Membership', amount: 8400, expiry: '20 Sept', daysLeft: 4, initials: 'PS' },
  { id: 3, name: 'Amit Verma', duration: '3 Month Membership', amount: 1800, expiry: '22 Sept', daysLeft: 6, initials: 'AV' },
  { id: 4, name: 'Sneha Kulkarni', duration: '6 Month Membership', amount: 6000, expiry: '25 Sept', daysLeft: 9, initials: 'SK' },
]

export const latestPayments = [
  { id: 1, name: 'Rahul Sharma', duration: '3 Month Membership', amount: 4500, method: 'UPI', time: '15 minutes ago' },
  { id: 2, name: 'Neha Joshi', duration: '12 Month Membership', amount: 8400, method: 'Card', time: '48 minutes ago' },
  { id: 3, name: 'Vikram Rao', duration: '3 Month Membership', amount: 1800, method: 'Cash', time: '2 hours ago' },
  { id: 4, name: 'Ananya Iyer', duration: '6 Month Membership', amount: 4500, method: 'UPI', time: '4 hours ago' },
]

export const newMembers = [
  { id: 1, name: 'Aarav Mehta', duration: '6 Month Membership', joined: 'Sep 08, 2026', amount: 4500, initials: 'AM' },
  { id: 2, name: 'Meera Kapoor', duration: '12 Month Membership', joined: 'Sep 07, 2026', amount: 8400, initials: 'MK' },
  { id: 3, name: 'Kabir Singh', duration: '3 Month Membership', joined: 'Sep 06, 2026', amount: 1800, initials: 'KS' },
  { id: 4, name: 'Ishita Rao', duration: '6 Month Membership', joined: 'Sep 05, 2026', amount: 4500, initials: 'IR' },
]

export const sidebarMenu = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutGrid', path: '/dashboard' },
  { id: 'members', label: 'Members', icon: 'Users', path: '/members' },
  { id: 'plans', label: 'Membership Plans', icon: 'CreditCard', path: '/plans' },
  { id: 'payments', label: 'Payments', icon: 'Wallet', path: '/payments' },
  { id: 'attendance', label: 'Attendance', icon: 'CheckSquare', path: '/attendance' },
  { id: 'reports', label: 'Reports', icon: 'BarChart3', path: '/reports' },
  { id: 'settings', label: 'Settings', icon: 'Settings', path: '/settings' },
]