import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('VYOM Veloce render error', error, info)
  }

  handleRetry = () => {
    this.setState({ hasError: false })
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children
    }

    return (
      <div className="min-h-screen bg-[var(--color-bg)] px-4 py-16 text-[var(--color-text)]">
        <div className="luxury-container flex min-h-[70vh] items-center justify-center">
          <section className="premium-panel max-w-2xl p-8 text-center sm:p-10">
            <p className="section-kicker">Experience Interrupted</p>
            <h1 className="section-title mt-3">The drive hit a technical pause.</h1>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">
              Something unexpected happened while rendering this view. You can
              retry the current screen or return to the collection.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button type="button" onClick={this.handleRetry} className="luxury-button">
                Retry Screen
              </button>
              <a href="/collection" className="outline-button">
                Explore Collection
              </a>
              <a href="/" className="outline-button">
                Home
              </a>
            </div>
          </section>
        </div>
      </div>
    )
  }
}

export default ErrorBoundary
