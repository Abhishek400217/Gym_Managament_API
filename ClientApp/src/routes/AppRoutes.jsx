import { Routes, Route } from 'react-router-dom'
import LoginPage from '../features/auth/pages/LoginPage'
import Dashboard from '../features/dashboard/pages/Dashboard'
import MembersPage from '../features/members/pages/MembersPage'
import MembershipPlansPage from '../features/plan/pages/MembershipPlansPage'
import PaymentsPage from '../features/payments/pages/PaymentsPage'
import SettingsPage from '../features/settings/pages/SettingsPage'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/members" element={<MembersPage />} />
      <Route path="/plans" element={<MembershipPlansPage />} />
      <Route path="/payments" element={<PaymentsPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  )
}

export default AppRoutes