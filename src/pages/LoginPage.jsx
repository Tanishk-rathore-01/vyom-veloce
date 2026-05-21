import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import PageTransition from '../components/ui/PageTransition.jsx'
import StateNotice from '../components/ui/StateNotice.jsx'
import { useAuth } from '../context/useAuth.js'

function LoginPage() {
  const { signIn, user } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const redirectPath = location.state?.from || '/'
  const adminEmail = (import.meta.env.VITE_ADMIN_EMAIL ?? '').toLowerCase()

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')

    const { data, error } = await signIn(email, password)
    if (error) {
      setErrorMessage(error.message || 'Unable to login with these credentials.')
      setIsSubmitting(false)
      return
    }

    const loggedInEmail = data?.user?.email?.toLowerCase() || email.toLowerCase()
    navigate(loggedInEmail === adminEmail ? '/admin' : redirectPath, {
      replace: true,
    })
  }

  return (
    <PageTransition className="py-12">
      <section className="luxury-container max-w-xl">
        <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
          <p className="section-kicker">Secure Access</p>
          <h1 className="section-title mt-2">Welcome Back</h1>
          <p className="section-description mt-4">
            Sign in to manage your bookings and access the VYOM Veloce dashboard.
          </p>

          {user ? (
            <div className="mt-6">
              <StateNotice
                title="Already logged in"
                description="You already have an active session."
                action={
                  <Link to="/" className="outline-button text-xs">
                    Go to Homepage
                  </Link>
                }
              />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
              <input
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email address"
                className="luxury-input"
              />
              <input
                required
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
                className="luxury-input"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="luxury-button w-full"
              >
                {isSubmitting ? 'Signing In...' : 'Login'}
              </button>
            </form>
          )}

          {errorMessage ? (
            <div className="mt-5">
              <StateNotice
                title="Login failed"
                description={errorMessage}
                variant="error"
              />
            </div>
          ) : null}

          <p className="mt-6 text-sm text-[var(--color-muted)]">
            New to VYOM Veloce?{' '}
            <Link to="/signup" className="text-[var(--color-gold)]">
              Create an account
            </Link>
            .
          </p>
        </div>
      </section>
    </PageTransition>
  )
}

export default LoginPage
