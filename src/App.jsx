import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { AdminLoginPage, AdminDashboardPage } from './pages/AdminPage'
import ProtectedRoute from './components/ProtectedRoute'

/**
 * Root App — Routing utama aplikasi
 *
 * Routes:
 *  /             → Halaman undangan (publik)
 *  /admin/login  → Login admin
 *  /admin        → Dashboard admin (protected)
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Halaman Undangan Publik */}
        <Route path="/" element={<HomePage />} />

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Admin Dashboard (Protected) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
