import { useState } from 'react'
import { createListingRequest } from '../api/requests.js'
import PageTransition from '../components/ui/PageTransition.jsx'
import StateNotice from '../components/ui/StateNotice.jsx'

const formInitialState = {
  name: '',
  phone: '',
  email: '',
  vehicle_details: '',
  asking_price: '',
}

function ListVehiclePage() {
  const [formData, setFormData] = useState(formInitialState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)
    setSuccessMessage('')
    setErrorMessage('')

    try {
      await createListingRequest({
        ...formData,
        asking_price: Number(formData.asking_price),
      })
      setSuccessMessage(
        'Your listing request has been received. Our team reviews your vehicle and contacts you within 48 hours.',
      )
      setFormData(formInitialState)
    } catch (submitError) {
      setErrorMessage(
        submitError.message || 'Unable to submit listing request right now.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <PageTransition className="py-12">
      <section className="luxury-container grid gap-10 lg:grid-cols-[1fr_1.15fr]">
        <div className="space-y-6 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
          <p className="section-kicker">List with VYOM</p>
          <h1 className="section-title">List Your Vehicle</h1>
          <p className="section-description">
            We curate each listing for presentation quality, market positioning,
            and buyer confidence. Sellers are onboarded through a premium review
            process.
          </p>
          <div className="space-y-4 text-sm leading-relaxed text-[var(--color-muted)]">
            <p>
              <span className="text-[var(--color-gold)]">Step 1:</span> Submit your
              vehicle details and expected valuation.
            </p>
            <p>
              <span className="text-[var(--color-gold)]">Step 2:</span> VYOM reviews
              authenticity, condition, and market fit.
            </p>
            <p>
              <span className="text-[var(--color-gold)]">Step 3:</span> Listing fee
              and media onboarding are finalized by our team.
            </p>
            <p className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-4">
              Our team reviews your vehicle and contacts you within 48 hours.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
          <p className="section-kicker">Seller Form</p>
          <h2 className="subheading-font mt-2 text-3xl text-[var(--color-gold)]">
            Start Listing Process
          </h2>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <input
              required
              type="text"
              value={formData.name}
              onChange={(event) =>
                setFormData((previous) => ({ ...previous, name: event.target.value }))
              }
              placeholder="Full name"
              className="luxury-input"
            />
            <input
              required
              type="tel"
              value={formData.phone}
              onChange={(event) =>
                setFormData((previous) => ({ ...previous, phone: event.target.value }))
              }
              placeholder="Phone number"
              className="luxury-input"
            />
            <input
              required
              type="email"
              value={formData.email}
              onChange={(event) =>
                setFormData((previous) => ({ ...previous, email: event.target.value }))
              }
              placeholder="Email address"
              className="luxury-input"
            />
            <textarea
              required
              rows={4}
              value={formData.vehicle_details}
              onChange={(event) =>
                setFormData((previous) => ({
                  ...previous,
                  vehicle_details: event.target.value,
                }))
              }
              placeholder="Vehicle details (make, model, year, kms, condition)"
              className="luxury-input"
            />
            <input
              required
              type="number"
              min="1"
              value={formData.asking_price}
              onChange={(event) =>
                setFormData((previous) => ({
                  ...previous,
                  asking_price: event.target.value,
                }))
              }
              placeholder="Asking price (INR)"
              className="luxury-input"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="luxury-button w-full"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Listing Request'}
            </button>
          </form>

          {successMessage ? (
            <div className="mt-5">
              <StateNotice title="Request Submitted" description={successMessage} />
            </div>
          ) : null}

          {errorMessage ? (
            <div className="mt-5">
              <StateNotice
                title="Submission Error"
                description={errorMessage}
                variant="error"
              />
            </div>
          ) : null}
        </div>
      </section>
    </PageTransition>
  )
}

export default ListVehiclePage
