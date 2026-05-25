import { useState } from 'react'

function LuxuryImage({
  src,
  alt,
  className = '',
  containerClassName = '',
  fallbackClassName = 'vehicle-fallback-gradient',
  fallbackSrc = '',
}) {
  const [hasError, setHasError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  if (!src || hasError) {
    if (fallbackSrc) {
      return (
        <div
          className={`relative overflow-hidden ${containerClassName}`.trim()}
          role="img"
          aria-label={alt}
        >
          <img
            src={fallbackSrc}
            alt=""
            loading="lazy"
            decoding="async"
            className={`h-full w-full object-cover ${className}`.trim()}
          />
          <span className="absolute bottom-3 right-3 rounded-full border border-[rgba(201,168,76,0.22)] bg-black/60 px-3 py-1 text-[0.62rem] uppercase tracking-[0.18em] text-[var(--color-gold)]">
            Studio preview
          </span>
        </div>
      )
    }

    return (
      <div
        className={`${fallbackClassName} ${containerClassName}`.trim()}
        role="img"
        aria-label={alt}
      />
    )
  }

  return (
    <div className={`relative overflow-hidden ${containerClassName}`.trim()}>
      {!isLoaded ? (
        <div
          className={`absolute inset-0 animate-pulse bg-[var(--color-surface-raised)]`}
          aria-hidden
        />
      ) : null}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`h-full w-full object-cover transition duration-700 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'} ${className}`.trim()}
      />
    </div>
  )
}

export default LuxuryImage
