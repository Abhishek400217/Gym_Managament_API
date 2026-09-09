// src/routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom'
import LoginPage from '../features/auth/pages/LoginPage'
import Dashboard from '../features/dashboard/pages/Dashboard'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default AppRoutes