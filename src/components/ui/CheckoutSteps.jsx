const defaultSteps = ['Select', 'Pay', 'Confirm']

function CheckoutSteps({ current = 'Pay', steps = defaultSteps }) {
  const currentIndex = steps.findIndex(
    (step) => step.toLowerCase() === current.toLowerCase(),
  )

  return (
    <ol className="checkout-steps" aria-label="Booking progress">
      {steps.map((step, index) => {
        const isActive = index === currentIndex
        const isComplete = index < currentIndex
        return (
          <li
            key={step}
            className={`checkout-step ${isActive ? 'is-active' : ''} ${
              isComplete ? 'is-complete' : ''
            }`.trim()}
          >
            <span className="checkout-step-index">{index + 1}</span>
            <span>{step}</span>
          </li>
        )
      })}
    </ol>
  )
}

export default CheckoutSteps
