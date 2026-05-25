function FormField({
  id,
  label,
  error = '',
  hint = '',
  as = 'input',
  className = '',
  containerClassName = '',
  labelClassName = '',
  ...props
}) {
  const Component = as
  const errorId = `${id}-error`
  const hintId = `${id}-hint`
  const describedBy = [
    error ? errorId : null,
    hint && !error ? hintId : null,
    props['aria-describedby'],
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={`field-group ${containerClassName}`.trim()}>
      {label ? (
        <label
          htmlFor={id}
          className={`field-label ${labelClassName}`.trim()}
        >
          {label}
        </label>
      ) : null}
      <Component
        id={id}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy || undefined}
        className={`luxury-input ${error ? 'is-invalid' : ''} ${className}`.trim()}
        {...props}
      />
      {error ? (
        <p id={errorId} className="field-error">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="field-hint">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

export default FormField
