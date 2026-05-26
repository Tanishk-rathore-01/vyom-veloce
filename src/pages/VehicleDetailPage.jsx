import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getVehicleById } from '../api/vehicles.js'
import bookingConfirmationImage from '../assets/generated/booking-confirmation.png'
import fallbackVehicle from '../assets/generated/fallback-vehicle.png'
import CheckoutSteps from '../components/ui/CheckoutSteps.jsx'
import FormField from '../components/ui/FormField.jsx'
import { DetailSkeleton } from '../components/ui/LoadingSkeleton.jsx'
import LuxuryImage from '../components/ui/LuxuryImage.jsx'
import PageTransition from '../components/ui/PageTransition.jsx'
import StateNotice from '../components/ui/StateNotice.jsx'
import { useAuth } from '../context/useAuth.js'
import { categoryLabel, formatINR, originLabel } from '../lib/format.js'
import { getGeneratedVehicleImage } from '../lib/generatedVisuals.js'
import { fetchVehiclePhoto } from '../lib/images.js'
import { openRazorpayCheckout } from '../lib/razorpay.js'
import { isEmail, isPhone, requiredMessage } from '../lib/validation.js'

const buyerInitialState = {
  name: '',
  email: '',
  phone: '',
}

function VehicleDetailPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const [vehicle, setVehicle] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [buyer, setBuyer] = useState({
    ...buyerInitialState,
    email: user?.email ?? '',
  })
  const [paymentError, setPaymentError] = useState('')
  const [buyerErrors, setBuyerErrors] = useState({})
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [paymentSuccessDetails, setPaymentSuccessDetails] = useState(null)

  useEffect(() => {
    let isActive = true

    async function loadVehicle() {
      setIsLoading(true)
      setError('')

      try {
        const data = await getVehicleById(id)
        let resolvedImage = getGeneratedVehicleImage(data)
        if (!resolvedImage) {
          try {
            resolvedImage = await fetchVehiclePhoto(data.image_query, {
              category: data.category,
            })
          } catch {
            resolvedImage = null
          }
        }

        if (isActive) {
          setVehicle(data)
          setImageUrl(resolvedImage)
        }
      } catch (loadError) {
        if (isActive) {
          setError(loadError.message || 'Vehicle details could not be loaded.')
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    loadVehicle()

    return () => {
      isActive = false
    }
  }, [id])

  const bookingAmount = useMemo(() => {
    if (!vehicle) {
      return 0
    }
    return Math.round(Number(vehicle.price) * 0.4)
  }, [vehicle])

  const remainingAmount = useMemo(() => {
    if (!vehicle) {
      return 0
    }
    return Number(vehicle.price) - bookingAmount
  }, [vehicle, bookingAmount])

  async function handleBookNow() {
    if (!vehicle) {
      return
    }
    const resolvedBuyerEmail = buyer.email.trim() || user?.email || ''
    const nextErrors = {}
    if (!buyer.name.trim()) {
      nextErrors.name = requiredMessage('Full name')
    }
    if (!resolvedBuyerEmail.trim()) {
      nextErrors.email = requiredMessage('Email address')
    } else if (!isEmail(resolvedBuyerEmail)) {
      nextErrors.email = 'Enter a valid email address.'
    }
    if (!buyer.phone.trim()) {
      nextErrors.phone = requiredMessage('Phone number')
    } else if (!isPhone(buyer.phone)) {
      nextErrors.phone = 'Enter a reachable phone number.'
    }

    setBuyerErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setPaymentError('')
      return
    }

    setPaymentError('')
    setIsProcessingPayment(true)

    try {
      await openRazorpayCheckout({
        amountInRupees: bookingAmount,
        vehicleTitle: vehicle.title,
        buyer: {
          ...buyer,
          email: resolvedBuyerEmail,
        },
        onSuccess: (response) => {
          setIsProcessingPayment(false)
          setPaymentSuccessDetails(response)
        },
        onFailure: (paymentFailure) => {
          setIsProcessingPayment(false)
          setPaymentError(paymentFailure.message)
        },
      })
    } catch (checkoutError) {
      setIsProcessingPayment(false)
      setPaymentError(
        checkoutError.message ||
          'Unable to initialize payment. Verify Razorpay credentials.',
      )
    }
  }

  return (
    <PageTransition className="py-12">
      <section className="luxury-container">
        {isLoading ? (
          <DetailSkeleton />
        ) : null}

        {!isLoading && error ? (
          <StateNotice
            title="Vehicle unavailable"
            description={error}
            variant="error"
            action={
              <Link to="/collection" className="outline-button text-xs">
                Back to Collection
              </Link>
            }
          />
        ) : null}

        {!isLoading && !error && vehicle ? (
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <motion.div
              className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)]"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <LuxuryImage
                src={imageUrl}
                fallbackSrc={fallbackVehicle}
                alt={vehicle.title}
                containerClassName="h-[420px] w-full lg:h-[560px]"
                className="transition duration-700 hover:scale-105"
              />
            </motion.div>

            <div className="premium-panel warm-panel space-y-5 p-6">
              <p className="section-kicker">Vehicle Profile</p>
              <h1 className="subheading-font text-4xl text-[var(--color-text)]">
                {vehicle.title}
              </h1>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                {vehicle.brand} • {categoryLabel(vehicle.category)} •{' '}
                {originLabel(vehicle.origin)}
              </p>
              <p className="price-chip text-2xl">
                {formatINR(vehicle.price)}
              </p>

              <CheckoutSteps current="Pay" />

              <div className="space-y-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-4 text-sm">
                <p className="text-[var(--color-muted)]">
                  <span className="text-[var(--color-text)]">Engine:</span>{' '}
                  {vehicle.engine || 'Not specified'}
                </p>
                <p className="text-[var(--color-muted)]">
                  <span className="text-[var(--color-text)]">Booking (40%):</span>{' '}
                  {formatINR(bookingAmount)}
                </p>
                <p className="text-[var(--color-muted)]">
                  <span className="text-[var(--color-text)]">Balance (60%):</span>{' '}
                  {formatINR(remainingAmount)} payable at physical handover.
                </p>
              </div>

              <div className="grid gap-3">
                <FormField
                  id="buyer-name"
                  label="Full name"
                  type="text"
                  value={buyer.name}
                  onChange={(event) =>
                    setBuyer((previous) => ({
                      ...previous,
                      name: event.target.value,
                    }))
                  }
                  onBlur={() =>
                    setBuyerErrors((previous) => ({
                      ...previous,
                      name: buyer.name.trim() ? '' : requiredMessage('Full name'),
                    }))
                  }
                  placeholder="Full name"
                  error={buyerErrors.name}
                />
                <FormField
                  id="buyer-email"
                  label="Email address"
                  type="email"
                  value={buyer.email || user?.email || ''}
                  onChange={(event) =>
                    setBuyer((previous) => ({
                      ...previous,
                      email: event.target.value,
                    }))
                  }
                  onBlur={() => {
                    const email = (buyer.email || user?.email || '').trim()
                    setBuyerErrors((previous) => ({
                      ...previous,
                      email: !email
                        ? requiredMessage('Email address')
                        : isEmail(email)
                          ? ''
                          : 'Enter a valid email address.',
                    }))
                  }}
                  placeholder="Email address"
                  error={buyerErrors.email}
                />
                <FormField
                  id="buyer-phone"
                  label="Phone number"
                  type="tel"
                  value={buyer.phone}
                  onChange={(event) =>
                    setBuyer((previous) => ({
                      ...previous,
                      phone: event.target.value,
                    }))
                  }
                  onBlur={() =>
                    setBuyerErrors((previous) => ({
                      ...previous,
                      phone: !buyer.phone.trim()
                        ? requiredMessage('Phone number')
                        : isPhone(buyer.phone)
                          ? ''
                          : 'Enter a reachable phone number.',
                    }))
                  }
                  placeholder="Phone number"
                  error={buyerErrors.phone}
                />
              </div>

              {paymentError ? (
                <p className="rounded-xl border border-[rgba(255,107,0,0.3)] bg-[rgba(255,107,0,0.1)] px-3 py-2 text-sm text-[var(--color-saffron)]">
                  {paymentError}
                </p>
              ) : null}

              <button
                type="button"
                onClick={handleBookNow}
                disabled={isProcessingPayment}
                className="luxury-button w-full disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isProcessingPayment
                  ? 'Opening Razorpay...'
                  : 'Book Now — Pay 40% Online'}
              </button>

              <Link to="/list" className="outline-button w-full">
                List Your Vehicle
              </Link>
            </div>
          </div>
        ) : null}
      </section>

      <AnimatePresence>
        {paymentSuccessDetails ? (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-[rgba(0,0,0,0.74)] p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              className="premium-panel w-full max-w-lg p-7"
            >
              <div className="confirmation-art mb-5">
                <img
                  src={bookingConfirmationImage}
                  alt="Premium booking confirmation pass"
                />
              </div>
              <p className="section-kicker">Payment Confirmation</p>
              <h2 className="subheading-font mt-2 text-3xl text-[var(--color-gold)]">
                Booking confirmed.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">
                Remaining 60% payable at handover. Your payment reference is{' '}
                <span className="text-[var(--color-text)]">
                  {paymentSuccessDetails.razorpay_payment_id}
                </span>
                .
              </p>
              <button
                type="button"
                onClick={() => setPaymentSuccessDetails(null)}
                className="luxury-button mt-7 w-full"
              >
                Continue Browsing
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </PageTransition>
  )
}

export default VehicleDetailPage
