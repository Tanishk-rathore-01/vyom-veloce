import { Children, isValidElement, useEffect, useMemo, useRef, useState } from 'react'

function SelectMenu({
  id,
  label,
  value,
  onChange,
  children,
  error,
  describedBy,
  className = '',
  disabled = false,
  ...props
}) {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef(null)
  const listRef = useRef(null)

  const options = useMemo(
    () =>
      Children.toArray(children)
        .filter(isValidElement)
        .map((child) => ({
          value: child.props.value ?? '',
          label: child.props.children,
          disabled: child.props.disabled,
        })),
    [children],
  )

  const selectedOption =
    options.find((option) => String(option.value) === String(value)) || options[0]

  useEffect(() => {
    if (!open) {
      return undefined
    }

    function handlePointerDown(event) {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        listRef.current &&
        !listRef.current.contains(event.target)
      ) {
        setOpen(false)
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  function selectValue(nextValue) {
    onChange?.({
      target: {
        id,
        name: props.name,
        value: nextValue,
      },
    })
    setOpen(false)
    buttonRef.current?.focus()
  }

  function handleButtonKeyDown(event) {
    if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
      event.preventDefault()
      setOpen(true)
    }
  }

  return (
    <div className="select-menu">
      <button
        ref={buttonRef}
        id={id}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy || undefined}
        aria-label={label}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={handleButtonKeyDown}
        className={`luxury-input select-menu-button ${error ? 'is-invalid' : ''} ${className}`.trim()}
      >
        <span>{selectedOption?.label}</span>
        <svg viewBox="0 0 24 24" aria-hidden>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open ? (
        <div ref={listRef} className="select-menu-popover">
          <div role="listbox" aria-labelledby={id} className="select-menu-list">
            {options.map((option) => {
              const isSelected = String(option.value) === String(value)
              return (
                <button
                  key={`${id}-${option.value}`}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  disabled={option.disabled}
                  onClick={() => selectValue(option.value)}
                  className={`select-menu-option ${isSelected ? 'is-selected' : ''}`.trim()}
                >
                  <span>{option.label}</span>
                  {isSelected ? (
                    <svg viewBox="0 0 24 24" aria-hidden>
                      <path d="m5 12 4 4L19 6" />
                    </svg>
                  ) : null}
                </button>
              )
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}

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
      {as === 'select' ? (
        <SelectMenu
          id={id}
          label={label}
          error={error}
          describedBy={describedBy}
          className={className}
          {...props}
        />
      ) : (
        <Component
          id={id}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy || undefined}
          className={`luxury-input ${error ? 'is-invalid' : ''} ${className}`.trim()}
          {...props}
        />
      )}
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
