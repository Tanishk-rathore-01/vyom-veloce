import { motion } from 'framer-motion'
import { useState } from 'react'
import { createModificationRequest } from '../api/requests.js'
import modificationStudioImage from '../assets/generated/modification-studio.png'
import FormField from '../components/ui/FormField.jsx'
import PageTransition from '../components/ui/PageTransition.jsx'
import StateNotice from '../components/ui/StateNotice.jsx'
import { indianBrands, internationalBrands } from '../lib/constants.js'
import { getGeneratedModificationImage } from '../lib/generatedVisuals.js'
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
    <motion.a
      href="#mod-consultation"
      whileHover={{ y: -5 }}
      className="glow-card group block overflow-hidden rounded-2xl"
      data-cursor="interactive"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={getGeneratedModificationImage(vehicle)}
          alt={`${vehicle} modification program`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 rounded-full border border-[rgba(201,168,76,0.26)] bg-black/60 px-3 py-1 text-xs uppercase text-[var(--color-gold)]">
          {modificationType}
        </div>
      </div>
      <div className="p-5">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-border)] bg-[rgba(0,0,0,0.36)]">
          <span className="brand-logo text-2xl text-[var(--color-gold)]">
            {vehicle.charAt(0)}
          </span>
        </div>
        <h3 className="subheading-font text-2xl text-[var(--color-text)]">{vehicle}</h3>
        <p className="mt-3 text-sm text-[var(--color-muted)]">{priceRange}</p>
        <p className="mt-5 text-xs font-semibold uppercase text-[var(--color-gold)] transition group-hover:text-[var(--color-saffron)]">
          Tap to open consultation
        </p>
      </div>
    </motion.a>
  )
}

const modificationSteps = [
  {
    title: 'Consult',
    description: 'You share the vehicle, budget, use case, and visual direction.',
  },
  {
    title: 'Diagnose',
    description: 'Our team checks platform fit, mechanical limits, and compliance.',
  },
  {
    title: 'Design',
    description: 'We prepare a scoped package across aero, exhaust, suspension, cabin, and finish.',
  },
  {
    title: 'Build & Handover',
    description: 'Approved work is scheduled, quality checked, and delivered with handover notes.',
  },
]

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
            <div className="mt-8 flex flex-wrap gap-3 text-xs uppercase text-[var(--color-muted)]">
              <span className="rounded-full border border-[var(--color-border)] px-3 py-2">
                Aero
              </span>
              <span className="rounded-full border border-[var(--color-border)] px-3 py-2">
                Exhaust
              </span>
              <span className="rounded-full border border-[var(--color-border)] px-3 py-2">
                Suspension
              </span>
            </div>
          </div>
          <img
            src={modificationStudioImage}
            alt="Bespoke VYOM Veloce modification studio"
            className="h-full min-h-[280px] w-full object-cover"
          />
        </div>
      </section>

      <section className="luxury-container py-16">
        <div className="mb-12">
          <p className="section-kicker">How It Works</p>
          <h2 className="section-title mt-2">From Vision to Road-Ready Build</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-4">
            {modificationSteps.map((step, index) => (
              <motion.article
                key={step.title}
                whileHover={{ y: -5 }}
                className="process-card"
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </motion.article>
            ))}
          </div>
        </div>

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

      <section id="mod-consultation" className="luxury-container scroll-mt-28 pb-20">
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
