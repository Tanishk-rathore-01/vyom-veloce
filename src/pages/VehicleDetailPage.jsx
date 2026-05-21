import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getVehicleById } from '../api/vehicles.js'
import { InlineLoadingSkeleton } from '../components/ui/LoadingSkeleton.jsx'
import PageTransition from '../components/ui/PageTransition.jsx'
import StateNotice from '../components/ui/StateNotice.jsx'
import { useAuth } from '../context/useAuth.js'
import { categoryLabel, formatINR, originLabel } from '../lib/format.js'
import { fetchVehiclePhoto } from '../lib/images.js'
import { openRazorpayCheckout } from '../lib/razorpay.js'

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
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [paymentSuccessDetails, setPaymentSuccessDetails] = useState(null)

  useEffect(() => {
    let isActive = true

    async function loadVehicle() {
      setIsLoading(true)
      setError('')

      try {
        const data = await getVehicleById(id)
        let fetchedImage = null
        try {
          fetchedImage = await fetchVehiclePhoto(data.image_query, {
            category: data.category,
          })
        } catch {
          fetchedImage = null
        }

        if (isActive) {
          setVehicle(data)
          setImageUrl(fetchedImage)
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
    if (!buyer.name.trim() || !resolvedBuyerEmail.trim() || !buyer.phone.trim()) {
      setPaymentError(
        'Please share your name, email, and phone number before starting payment.',
      )
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
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div className="h-[420px] animate-pulse rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)]" />
            <InlineLoadingSkeleton />
          </div>
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
            <div className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)]">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={vehicle.title}
                  className="h-[420px] w-full object-cover"
                />
              ) : (
                <div className="vehicle-fallback-gradient flex h-[420px] items-center justify-center">
                  <span className="brand-logo text-7xl text-[var(--color-gold)]">
                    {vehicle.brand.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-5 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
              <p className="section-kicker">Vehicle Profile</p>
              <h1 className="subheading-font text-4xl text-[var(--color-text)]">
                {vehicle.title}
              </h1>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                {vehicle.brand} • {categoryLabel(vehicle.category)} •{' '}
                {originLabel(vehicle.origin)}
              </p>
              <p className="text-3xl text-[var(--color-gold)]">
                {formatINR(vehicle.price)}
              </p>

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

              <div className="space-y-3">
                <input
                  type="text"
                  value={buyer.name}
                  onChange={(event) =>
                    setBuyer((previous) => ({
                      ...previous,
                      name: event.target.value,
                    }))
                  }
                  placeholder="Full name"
                  className="luxury-input"
                />
                <input
                  type="email"
                  value={buyer.email || user?.email || ''}
                  onChange={(event) =>
                    setBuyer((previous) => ({
                      ...previous,
                      email: event.target.value,
                    }))
                  }
                  placeholder="Email address"
                  className="luxury-input"
                />
                <input
                  type="tel"
                  value={buyer.phone}
                  onChange={(event) =>
                    setBuyer((previous) => ({
                      ...previous,
                      phone: event.target.value,
                    }))
                  }
                  placeholder="Phone number"
                  className="luxury-input"
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
              className="w-full max-w-lg rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-7"
            >
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
