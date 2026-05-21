import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth.js'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/collection', label: 'Collection' },
  { to: '/modifications', label: 'Modifications' },
  { to: '/list', label: 'List Your Vehicle' },
  { to: '/about', label: 'About' },
]

function getNavLinkClass({ isActive }) {
  return `px-3 py-2 text-sm tracking-[0.16em] uppercase transition duration-300 ${
    isActive
      ? 'text-[var(--color-gold)]'
      : 'text-[var(--color-text)] hover:text-[var(--color-saffron)]'
  }`
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const adminEmail = (import.meta.env.VITE_ADMIN_EMAIL ?? '').toLowerCase()
  const isAdmin = user?.email?.toLowerCase() === adminEmail

  async function handleLogout() {
    await signOut()
    setOpen(false)
    navigate('/')
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--color-border)] bg-[rgba(10,10,10,0.84)] backdrop-blur-xl">
      <div className="luxury-container flex h-20 items-center justify-between">
        <Link
          to="/"
          className="brand-logo text-2xl text-[var(--color-gold)] sm:text-3xl"
        >
          VYOM Veloce
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={getNavLinkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {!user && (
            <>
              <Link to="/login" className="outline-button px-5 py-2 text-xs">
                Login
              </Link>
              <Link to="/signup" className="luxury-button px-5 py-2 text-xs">
                Sign Up
              </Link>
            </>
          )}
          {user && (
            <>
              {isAdmin && (
                <Link to="/admin" className="outline-button px-4 py-2 text-xs">
                  Admin
                </Link>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="luxury-button px-4 py-2 text-xs"
              >
                Logout
              </button>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-gold)] lg:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          {open ? (
            <span className="text-xl leading-none">✕</span>
          ) : (
            <span className="text-xl leading-none">☰</span>
          )}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-[var(--color-border)] bg-[var(--color-surface)] lg:hidden"
          >
            <div className="luxury-container flex flex-col py-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={getNavLinkClass}
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="mt-3 flex flex-wrap gap-3 px-3">
                {!user && (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setOpen(false)}
                      className="outline-button px-4 py-2 text-xs"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setOpen(false)}
                      className="luxury-button px-4 py-2 text-xs"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
                {user && (
                  <>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setOpen(false)}
                        className="outline-button px-4 py-2 text-xs"
                      >
                        Admin
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="luxury-button px-4 py-2 text-xs"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
