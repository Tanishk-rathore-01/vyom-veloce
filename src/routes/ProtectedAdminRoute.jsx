import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/useAuth.js'
import { InlineLoadingSkeleton } from '../components/ui/LoadingSkeleton.jsx'

function ProtectedAdminRoute({ children }) {
  const { user, isLoading } = useAuth()
  const location = useLocation()
  const adminEmail = (import.meta.env.VITE_ADMIN_EMAIL ?? '').toLowerCase()

  if (isLoading) {
    return (
      <div className="luxury-container py-24">
        <InlineLoadingSkeleton />
      </div>
    )
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: `${location.pathname}${location.search}` }}
      />
    )
  }

  if (user.email?.toLowerCase() !== adminEmail) {
    return <Navigate to="/unauthorized" replace />
  }

  return children
}

export default ProtectedAdminRoute
