function StateNotice({ title, description, variant = 'neutral', action = null }) {
  const accentClass =
    variant === 'error'
      ? 'border-[rgba(255,107,0,0.35)] text-[var(--color-saffron)]'
      : 'border-[rgba(201,168,76,0.3)] text-[var(--color-gold)]'

  return (
    <div
      className={`rounded-3xl border bg-[var(--color-surface)]/70 p-8 text-center ${accentClass}`}
    >
      <h3 className="subheading-font text-2xl text-[var(--color-text)]">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  )
}

export default StateNotice
