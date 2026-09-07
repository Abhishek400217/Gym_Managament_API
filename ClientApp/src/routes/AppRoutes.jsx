// src/routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom'
import LoginPage from '../features/auth/pages/LoginPage'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}

export default AppRoutes