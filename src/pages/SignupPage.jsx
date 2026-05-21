import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PageTransition from '../components/ui/PageTransition.jsx'
import StateNotice from '../components/ui/StateNotice.jsx'
import { useAuth } from '../context/useAuth.js'

function SignupPage() {
  const { signUp, user } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const adminEmail = (import.meta.env.VITE_ADMIN_EMAIL ?? '').toLowerCase()

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')

    const { data, error } = await signUp(email, password)
    if (error) {
      setErrorMessage(error.message || 'Unable to create account.')
      setIsSubmitting(false)
      return
    }

    const signedUpEmail = data?.user?.email?.toLowerCase() || email.toLowerCase()
    navigate(signedUpEmail === adminEmail ? '/admin' : '/', { replace: true })
  }

  return (
    <PageTransition className="py-12">
      <section className="luxury-container max-w-xl">
        <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
          <p className="section-kicker">Create Account</p>
          <h1 className="section-title mt-2">Join VYOM Veloce</h1>
          <p className="section-description mt-4">
            Build your premium account to request modifications, manage
            bookings, and access exclusive updates.
          </p>

          {user ? (
            <div className="mt-6">
              <StateNotice
                title="Already signed in"
                description="Your account session is active."
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
                minLength={6}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password (minimum 6 characters)"
                className="luxury-input"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="luxury-button w-full"
              >
                {isSubmitting ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>
          )}

          {errorMessage ? (
            <div className="mt-5">
              <StateNotice
                title="Sign up failed"
                description={errorMessage}
                variant="error"
              />
            </div>
          ) : null}

          <p className="mt-6 text-sm text-[var(--color-muted)]">
            Already have an account?{' '}
            <Link to="/login" className="text-[var(--color-gold)]">
              Login here
            </Link>
            .
          </p>
        </div>
      </section>
    </PageTransition>
  )
}

export default SignupPage
