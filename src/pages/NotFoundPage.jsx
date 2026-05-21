import { Link } from 'react-router-dom'
import PageTransition from '../components/ui/PageTransition.jsx'

function NotFoundPage() {
  return (
    <PageTransition className="py-20">
      <section className="luxury-container">
        <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-10 text-center">
          <p className="section-kicker">404</p>
          <h1 className="brand-logo mt-2 text-5xl text-[var(--color-gold)]">
            Route Not Found
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[var(--color-muted)]">
            This lane does not exist in the VYOM Veloce network. Return to the
            main circuit to continue exploring luxury mobility.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/" className="luxury-button">
              Back to Home
            </Link>
            <Link to="/collection" className="outline-button">
              Explore Collection
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}

export default NotFoundPage
