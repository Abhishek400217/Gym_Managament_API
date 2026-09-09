import { Routes, Route } from 'react-router-dom'
import LoginPage from '../features/auth/pages/LoginPage'
import Dashboard from '../features/dashboard/pages/Dashboard'
import MembersPage from '../features/members/pages/MembersPage'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/members" element={<MembersPage />} />
    </Routes>
  )
}

export default AppRoutes