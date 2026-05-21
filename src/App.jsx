import { AnimatePresence } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout.jsx'
import CustomCursor from './components/ui/CustomCursor.jsx'
import ScrollToTop from './components/ui/ScrollToTop.jsx'
import HomePage from './pages/HomePage.jsx'
import CollectionPage from './pages/CollectionPage.jsx'
import VehicleDetailPage from './pages/VehicleDetailPage.jsx'
import ModificationsPage from './pages/ModificationsPage.jsx'
import ListVehiclePage from './pages/ListVehiclePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import AdminPage from './pages/AdminPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import UnauthorizedPage from './pages/UnauthorizedPage.jsx'
import ProtectedAdminRoute from './routes/ProtectedAdminRoute.jsx'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/collection/:id" element={<VehicleDetailPage />} />
          <Route path="/modifications" element={<ModificationsPage />} />
          <Route path="/list" element={<ListVehiclePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminPage />
              </ProtectedAdminRoute>
            }
          />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <>
      <CustomCursor />
      <ScrollToTop />
      <AnimatedRoutes />
    </>
  )
}

export default App
