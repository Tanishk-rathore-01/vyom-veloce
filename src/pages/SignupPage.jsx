import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FormField from '../components/ui/FormField.jsx'
import PageTransition from '../components/ui/PageTransition.jsx'
import StateNotice from '../components/ui/StateNotice.jsx'
import { useAuth } from '../context/useAuth.js'
import { isEmail, requiredMessage } from '../lib/validation.js'

function getAuthErrorMessage(error) {
  if (!error) return 'An unexpected error occurred.'

  const code = error?.code || error?.status?.toString() || ''
  const msg = error?.message?.toLowerCase() || ''

  if (code === 'user_already_exists' || msg.includes('user already registered') || msg.includes('email already')) {
    return 'An account with this email already exists. Try logging in instead.'
  }
  if (code === 'email_not_confirmed' || msg.includes('email not confirmed')) {
    return 'Email not confirmed. Check your inbox or disable email confirmation in Supabase Authentication settings.'
  }
  if (code === 'weak_password' || msg.includes('weak password') || msg.includes('password')) {
    return 'Password is too weak. Use at least 6 characters.'
  }
  if (code === 'invalid_credentials' || msg.includes('invalid login credentials') || msg.includes('invalid credentials')) {
    return 'Invalid email or password. Please try again.'
  }
  if (code === 'signup_disabled' || msg.includes('signup disabled')) {
    return 'New signups are currently disabled.'
  }
  if (msg.includes('rate limit')) {
    return 'Too many attempts. Please wait a moment and try again.'
  }

  return error.message || 'Unable to create account.'
}

function SignupPage() {
  const { signUp, user } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const navigate = useNavigate()
  const adminEmail = (import.meta.env.VITE_ADMIN_EMAIL ?? '').toLowerCase()

  async function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = {}
    if (!email.trim()) {
      nextErrors.email = requiredMessage('Email address')
    } else if (!isEmail(email)) {
      nextErrors.email = 'Enter a valid email address.'
    }
    if (!password.trim()) {
      nextErrors.password = requiredMessage('Password')
    } else if (password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.'
    }
    setFieldErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setIsSubmitting(true)
    setErrorMessage('')

    const { data, error } = await signUp(email, password)
    if (error) {
      console.error('Supabase signup error:', { code: error.code, status: error.status, message: error.message, error })
      setErrorMessage(getAuthErrorMessage(error))
      setIsSubmitting(false)
      return
    }

    const signedUpEmail = data?.user?.email?.toLowerCase() || email.toLowerCase()
    navigate(signedUpEmail === adminEmail ? '/admin' : '/', { replace: true })
  }

  return (
    <PageTransition className="py-12">
      <section className="luxury-container max-w-xl">
        <div className="premium-panel p-8">
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
            <form onSubmit={handleSubmit} className="mt-7 space-y-4" noValidate>
              <FormField
                id="signup-email"
                label="Email address"
                required
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                  setFieldErrors((previous) => ({ ...previous, email: '' }))
                }}
                placeholder="Email address"
                error={fieldErrors.email}
              />
              <FormField
                id="signup-password"
                label="Password"
                required
                type="password"
                minLength={6}
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value)
                  setFieldErrors((previous) => ({ ...previous, password: '' }))
                }}
                placeholder="Password (minimum 6 characters)"
                error={fieldErrors.password}
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
