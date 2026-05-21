import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="relative z-10 border-t border-[var(--color-border)] bg-[rgba(17,17,17,0.86)] py-12 backdrop-blur-md">
      <div className="luxury-container grid gap-10 md:grid-cols-3">
        <div className="space-y-4">
          <h2 className="brand-logo text-3xl text-[var(--color-gold)]">VYOM Veloce</h2>
          <p className="text-sm leading-relaxed text-[var(--color-muted)]">
            India&apos;s premier luxury vehicle marketplace where heritage meets
            international performance.
          </p>
          <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-saffron)]">
            Made in India 🇮🇳
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="subheading-font text-xl text-[var(--color-text)]">Navigate</h3>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/collection" className="footer-link">
              Explore Collection
            </Link>
            <Link to="/modifications" className="footer-link">
              Modifications
            </Link>
            <Link to="/list" className="footer-link">
              List Your Vehicle
            </Link>
            <Link to="/about" className="footer-link">
              About
            </Link>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="subheading-font text-xl text-[var(--color-text)]">Social</h3>
          <div className="flex flex-col gap-2 text-sm text-[var(--color-muted)]">
            <a className="footer-link" href="https://instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a className="footer-link" href="https://x.com" target="_blank" rel="noreferrer">
              X
            </a>
            <a className="footer-link" href="https://linkedin.com" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
