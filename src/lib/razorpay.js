let razorpayLoadPromise = null

export function loadRazorpayScript() {
  if (window.Razorpay) {
    return Promise.resolve(true)
  }

  if (razorpayLoadPromise) {
    return razorpayLoadPromise
  }

  razorpayLoadPromise = new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })

  return razorpayLoadPromise
}

export async function openRazorpayCheckout({
  amountInRupees,
  vehicleTitle,
  buyer,
  onSuccess,
  onFailure,
}) {
  const isLoaded = await loadRazorpayScript()
  if (!isLoaded) {
    throw new Error('Razorpay SDK failed to load. Check your internet connection.')
  }

  const key = import.meta.env.VITE_RAZORPAY_KEY_ID
  if (!key) {
    throw new Error('VITE_RAZORPAY_KEY_ID is missing in environment variables.')
  }

  const amountInPaise = Math.round(Number(amountInRupees) * 100)
  if (!amountInPaise) {
    throw new Error('Invalid booking amount.')
  }

  const options = {
    key,
    amount: amountInPaise,
    currency: 'INR',
    name: 'VYOM Veloce',
    description: `Booking amount for ${vehicleTitle}`,
    notes: {
      vehicle: vehicleTitle,
      payment_model: '40% online, 60% at handover',
    },
    prefill: {
      name: buyer.name,
      email: buyer.email,
      contact: buyer.phone,
    },
    theme: {
      color: '#C9A84C',
    },
    handler: (response) => {
      onSuccess(response)
    },
    modal: {
      ondismiss: () => {
        onFailure(new Error('Payment popup was closed before completion.'))
      },
    },
  }

  const razorpayInstance = new window.Razorpay(options)
  razorpayInstance.on('payment.failed', (response) => {
    const reason =
      response?.error?.description ||
      response?.error?.reason ||
      'Payment failed. Please retry.'
    onFailure(new Error(reason))
  })
  razorpayInstance.open()
}
