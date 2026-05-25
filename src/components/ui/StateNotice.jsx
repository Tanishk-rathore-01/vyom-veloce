import emptyShowroom from '../../assets/generated/empty-showroom.png'

function StateNotice({
  title,
  description,
  variant = 'neutral',
  action = null,
  image = emptyShowroom,
}) {
  const variantClass =
    variant === 'error'
      ? 'state-notice-error'
      : variant === 'success'
        ? 'state-notice-success'
        : 'state-notice-neutral'

  return (
    <div className={`state-notice ${variantClass}`}>
      {image ? (
        <div className="state-notice-art" aria-hidden>
          <img src={image} alt="" loading="lazy" />
        </div>
      ) : null}
      <div className="state-notice-mark" aria-hidden>
        <svg viewBox="0 0 56 56">
          <path
            d="M28 6 45 16v24L28 50 11 40V16L28 6Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M20 29h16M24 22h8M24 36h8"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
        </svg>
      </div>
      <h3 className="subheading-font text-2xl text-[var(--color-text)]">{title}</h3>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[var(--color-muted)]">
        {description}
      </p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  )
}

export default StateNotice
