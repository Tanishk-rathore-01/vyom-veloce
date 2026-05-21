import { Link } from 'react-router-dom'
import PageTransition from '../components/ui/PageTransition.jsx'

function UnauthorizedPage() {
  return (
    <PageTransition className="py-20">
      <section className="luxury-container max-w-3xl">
        <div className="rounded-3xl border border-[rgba(255,107,0,0.35)] bg-[var(--color-surface)] p-10 text-center">
          <p className="section-kicker">Restricted Access</p>
          <h1 className="subheading-font mt-2 text-4xl text-[var(--color-saffron)]">
            Admin Privileges Required
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[var(--color-muted)]">
            This dashboard is reserved for VYOM Veloce administrators only. Sign
            in using the configured admin account to continue.
          </p>
          <div className="mt-7 flex justify-center gap-4">
            <Link to="/login" className="luxury-button">
              Go to Login
            </Link>
            <Link to="/" className="outline-button">
              Return Home
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}

export default UnauthorizedPage
