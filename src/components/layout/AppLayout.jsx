import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

function AppLayout() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <Navbar />
      <main className="relative z-10 pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default AppLayout
