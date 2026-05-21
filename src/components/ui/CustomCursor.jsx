import { useEffect, useState } from 'react'

const INTERACTIVE_SELECTOR =
  'a, button, input, select, textarea, [role="button"], [data-cursor="interactive"]'

function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [active, setActive] = useState(false)
  const [hidden, setHidden] = useState(() => {
    if (typeof window === 'undefined') {
      return true
    }
    return window.matchMedia('(pointer: coarse)').matches
  })

  useEffect(() => {
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
    if (isCoarsePointer) {
      return undefined
    }

    const onMouseMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY })
    }

    const onMouseOver = (event) => {
      const target = event.target
      if (target instanceof Element) {
        setActive(Boolean(target.closest(INTERACTIVE_SELECTOR)))
      }
    }

    const onWindowLeave = () => setHidden(true)
    const onWindowEnter = () => setHidden(false)

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseover', onMouseOver)
    window.addEventListener('mouseout', onMouseOver)
    window.addEventListener('blur', onWindowLeave)
    window.addEventListener('focus', onWindowEnter)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseover', onMouseOver)
      window.removeEventListener('mouseout', onMouseOver)
      window.removeEventListener('blur', onWindowLeave)
      window.removeEventListener('focus', onWindowEnter)
    }
  }, [])

  return (
    <div
      aria-hidden
      className={`custom-cursor ${active ? 'is-active' : ''} ${hidden ? 'is-hidden' : ''}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    />
  )
}

export default CustomCursor
