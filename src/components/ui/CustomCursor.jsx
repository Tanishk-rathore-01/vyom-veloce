import { useEffect, useRef, useState } from 'react'

const INTERACTIVE_SELECTOR =
  'a, button, input, select, textarea, [role="button"], [data-cursor="interactive"]'

function CustomCursor() {
  const targetRef = useRef({ x: -100, y: -100 })
  const currentRef = useRef({ x: -100, y: -100 })
  const frameRef = useRef(null)
  const cursorRef = useRef(null)
  const [active, setActive] = useState(false)
  const [hidden, setHidden] = useState(() => {
    if (typeof window === 'undefined') {
      return true
    }
    return (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
  })

  useEffect(() => {
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (isCoarsePointer || prefersReducedMotion) {
      return undefined
    }

    const lerp = (start, end, factor) => start + (end - start) * factor

    const animate = () => {
      currentRef.current.x = lerp(
        currentRef.current.x,
        targetRef.current.x,
        0.18,
      )
      currentRef.current.y = lerp(
        currentRef.current.y,
        targetRef.current.y,
        0.18,
      )

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentRef.current.x}px, ${currentRef.current.y}px, 0)`
      }

      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)

    const onMouseMove = (event) => {
      targetRef.current = { x: event.clientX, y: event.clientY }
      setHidden(false)
    }

    const onMouseOver = (event) => {
      const target = event.target
      if (target instanceof Element) {
        setActive(Boolean(target.closest(INTERACTIVE_SELECTOR)))
      }
    }

    const onDocumentLeave = () => setHidden(true)
    const onDocumentEnter = () => setHidden(false)
    const onWindowBlur = () => setHidden(true)
    const onWindowFocus = () => setHidden(false)

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseleave', onDocumentLeave)
    document.addEventListener('mouseenter', onDocumentEnter)
    window.addEventListener('blur', onWindowBlur)
    window.addEventListener('focus', onWindowFocus)

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseleave', onDocumentLeave)
      document.removeEventListener('mouseenter', onDocumentEnter)
      window.removeEventListener('blur', onWindowBlur)
      window.removeEventListener('focus', onWindowFocus)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      aria-hidden
      className={`custom-cursor ${active ? 'is-active' : ''} ${hidden ? 'is-hidden' : ''}`}
      style={{ transform: 'translate3d(-100px, -100px, 0)' }}
    >
      <span className="custom-cursor-ring" />
      <span className="custom-cursor-dot" />
    </div>
  )
}

export default CustomCursor
