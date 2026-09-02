import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { isAdmin, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin"
          style={{ borderColor: 'var(--primary) transparent var(--primary) transparent' }} />
      </div>
    )
  }

  return isAdmin ? children : <Navigate to="/admin/login" state={{ from: location.pathname }} replace />
}
