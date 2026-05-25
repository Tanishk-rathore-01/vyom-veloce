import { motion } from 'framer-motion'
import { useState } from 'react'
import { createModificationRequest } from '../api/requests.js'
import modificationStudioImage from '../assets/generated/modification-studio.png'
import FormField from '../components/ui/FormField.jsx'
import PageTransition from '../components/ui/PageTransition.jsx'
import StateNotice from '../components/ui/StateNotice.jsx'
import { indianBrands, internationalBrands } from '../lib/constants.js'
import { isEmail, isPhone, requiredMessage } from '../lib/validation.js'

const formInitialState = {
  name: '',
  phone: '',
  email: '',
  vehicle_model: '',
  modification_type: '',
  budget_range: '',
  message: '',
}

function ModificationCard({ vehicle, modificationType, priceRange }) {
  return (
    <motion.article
      whileHover={{ y: -5 }}
      className="rounded-2xl border border-[var(--color-border)] bg-gradient-to-br from-[rgba(201,168,76,0.16)] via-[rgba(17,17,17,0.92)] to-[rgba(255,107,0,0.14)] p-5"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-border)] bg-[rgba(0,0,0,0.36)]">
        <span className="brand-logo text-2xl text-[var(--color-gold)]">
          {vehicle.charAt(0)}
        </span>
      </div>
      <h3 className="subheading-font text-2xl text-[var(--color-text)]">{vehicle}</h3>
      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[var(--color-saffron)]">
        {modificationType}
      </p>
      <p className="mt-3 text-sm text-[var(--color-muted)]">{priceRange}</p>
    </motion.article>
  )
}

function ModificationsPage() {
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
    if (!formData.vehicle_model.trim()) {
      nextErrors.vehicle_model = requiredMessage('Vehicle model')
    }
    if (!formData.modification_type) {
      nextErrors.modification_type = requiredMessage('Modification type')
    }
    if (!formData.budget_range.trim()) {
      nextErrors.budget_range = requiredMessage('Budget range')
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
      await createModificationRequest(formData)
      setSuccessMessage(
        'Request submitted successfully. Our modification specialists will contact you shortly.',
      )
      setFormData(formInitialState)
      setFieldErrors({})
    } catch (submitError) {
      setErrorMessage(
        submitError.message || 'Unable to submit request. Please retry in a moment.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <PageTransition className="py-12">
      <section className="luxury-container">
        <div className="grid gap-8 overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] lg:grid-cols-[1fr_1.1fr]">
          <div className="p-8 sm:p-10">
          <p className="section-kicker">Modification Studio</p>
          <h1 className="section-title mt-2">We Transform Machines</h1>
          <p className="section-description mt-5">
            From subtle dynamics to complete visual and performance overhauls,
            our atelier delivers custom programs for both international and Indian
            marques.
          </p>
          </div>
          <img
            src={modificationStudioImage}
            alt="Bespoke VYOM Veloce modification studio"
            className="h-full min-h-[280px] w-full object-cover"
          />
        </div>
      </section>

      <section className="luxury-container py-16">
        <p className="section-kicker">International Brands</p>
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {internationalBrands.map((brand) => (
            <ModificationCard key={brand.vehicle} {...brand} />
          ))}
        </div>
      </section>

      <section className="luxury-container pb-16">
        <p className="section-kicker">Indian Brands</p>
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {indianBrands.map((brand) => (
            <ModificationCard key={brand.vehicle} {...brand} />
          ))}
        </div>
      </section>

      <section className="luxury-container pb-20">
        <div className="premium-panel p-6 sm:p-8">
          <p className="section-kicker">Request Consultation</p>
          <h2 className="subheading-font mt-2 text-3xl text-[var(--color-gold)]">
            Build Your Bespoke Package
          </h2>
          <form onSubmit={handleSubmit} className="mt-7 grid gap-4 md:grid-cols-2" noValidate>
            <FormField
              id="mod-name"
              label="Full name"
              required
              type="text"
              value={formData.name}
              onChange={(event) => setFieldValue('name', event.target.value)}
              placeholder="Full name"
              error={fieldErrors.name}
            />
            <FormField
              id="mod-phone"
              label="Phone number"
              required
              type="tel"
              value={formData.phone}
              onChange={(event) => setFieldValue('phone', event.target.value)}
              placeholder="Phone number"
              error={fieldErrors.phone}
            />
            <FormField
              id="mod-email"
              label="Email address"
              required
              type="email"
              value={formData.email}
              onChange={(event) => setFieldValue('email', event.target.value)}
              placeholder="Email address"
              error={fieldErrors.email}
            />
            <FormField
              id="mod-vehicle-model"
              label="Vehicle model"
              required
              type="text"
              value={formData.vehicle_model}
              onChange={(event) =>
                setFieldValue('vehicle_model', event.target.value)
              }
              placeholder="Vehicle model"
              error={fieldErrors.vehicle_model}
            />
            <FormField
              id="mod-type"
              label="Modification type"
              as="select"
              required
              value={formData.modification_type}
              onChange={(event) =>
                setFieldValue('modification_type', event.target.value)
              }
              error={fieldErrors.modification_type}
            >
              <option value="">Select modification type</option>
              <option value="exhaust">Exhaust</option>
              <option value="suspension">Suspension</option>
              <option value="bodywork">Bodywork</option>
              <option value="full custom">Full Custom</option>
            </FormField>
            <FormField
              id="mod-budget"
              label="Budget range"
              required
              type="text"
              value={formData.budget_range}
              onChange={(event) =>
                setFieldValue('budget_range', event.target.value)
              }
              placeholder="Budget range (INR)"
              error={fieldErrors.budget_range}
            />
            <FormField
              id="mod-message"
              label="Vision notes"
              as="textarea"
              rows={4}
              value={formData.message}
              onChange={(event) => setFieldValue('message', event.target.value)}
              placeholder="Describe your vision"
              containerClassName="md:col-span-2"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="luxury-button md:col-span-2"
            >
              {isSubmitting ? 'Submitting Request...' : 'Submit Modification Request'}
            </button>
          </form>

          {successMessage ? (
            <div className="mt-5">
              <StateNotice
                title="Request Received"
                description={successMessage}
                variant="success"
              />
            </div>
          ) : null}

          {errorMessage ? (
            <div className="mt-5">
              <StateNotice
                title="Submission Failed"
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

export default ModificationsPage
