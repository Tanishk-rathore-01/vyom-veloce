import { useState } from 'react'
import { createListingRequest } from '../api/requests.js'
import FormField from '../components/ui/FormField.jsx'
import PageTransition from '../components/ui/PageTransition.jsx'
import StateNotice from '../components/ui/StateNotice.jsx'
import {
  isEmail,
  isPhone,
  positiveNumber,
  requiredMessage,
} from '../lib/validation.js'

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
  const [fieldErrors, setFieldErrors] = useState({})

  function setFieldValue(field, value) {
    setFormData((previous) => ({ ...previous, [field]: value }))
    setFieldErrors((previous) => ({ ...previous, [field]: '' }))
  }

  function validateForm() {
    const nextErrors = {}
    if (!formData.name.trim()) {
      nextErrors.name = requiredMessage('Full name')
    }
    if (!formData.phone.trim()) {
      nextErrors.phone = requiredMessage('Phone number')
    } else if (!isPhone(formData.phone)) {
      nextErrors.phone = 'Enter a reachable phone number.'
    }
    if (!formData.email.trim()) {
      nextErrors.email = requiredMessage('Email address')
    } else if (!isEmail(formData.email)) {
      nextErrors.email = 'Enter a valid email address.'
    }
    if (!formData.vehicle_details.trim()) {
      nextErrors.vehicle_details = requiredMessage('Vehicle details')
    }
    if (!formData.asking_price.trim()) {
      nextErrors.asking_price = requiredMessage('Asking price')
    } else if (!positiveNumber(formData.asking_price)) {
      nextErrors.asking_price = 'Enter a valid asking price.'
    }
    return nextErrors
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validateForm()
    setFieldErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      return
    }

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
      setFieldErrors({})
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
        <div className="premium-panel space-y-6 p-8">
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

        <div className="premium-panel p-8">
          <p className="section-kicker">Seller Form</p>
          <h2 className="subheading-font mt-2 text-3xl text-[var(--color-gold)]">
            Start Listing Process
          </h2>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4" noValidate>
            <FormField
              id="listing-name"
              label="Full name"
              required
              type="text"
              value={formData.name}
              onChange={(event) => setFieldValue('name', event.target.value)}
              placeholder="Full name"
              error={fieldErrors.name}
            />
            <FormField
              id="listing-phone"
              label="Phone number"
              required
              type="tel"
              value={formData.phone}
              onChange={(event) => setFieldValue('phone', event.target.value)}
              placeholder="Phone number"
              error={fieldErrors.phone}
            />
            <FormField
              id="listing-email"
              label="Email address"
              required
              type="email"
              value={formData.email}
              onChange={(event) => setFieldValue('email', event.target.value)}
              placeholder="Email address"
              error={fieldErrors.email}
            />
            <FormField
              id="listing-vehicle-details"
              label="Vehicle details"
              as="textarea"
              required
              rows={4}
              value={formData.vehicle_details}
              onChange={(event) =>
                setFieldValue('vehicle_details', event.target.value)
              }
              placeholder="Vehicle details (make, model, year, kms, condition)"
              error={fieldErrors.vehicle_details}
            />
            <FormField
              id="listing-asking-price"
              label="Asking price"
              required
              type="number"
              min="1"
              value={formData.asking_price}
              onChange={(event) =>
                setFieldValue('asking_price', event.target.value)
              }
              placeholder="Asking price (INR)"
              error={fieldErrors.asking_price}
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
              <StateNotice
                title="Request Submitted"
                description={successMessage}
                variant="success"
              />
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
