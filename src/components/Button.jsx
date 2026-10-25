import { Link } from 'react-router-dom'

export function Arrow({ direction = 'right' }) {
  const rotate = { right: 0, down: 90, up: -90, left: 180 }[direction]
  return (
    <svg
      className="btn-arrow"
      viewBox="0 0 24 24"
      width="32"
      height="32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden
    >
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  )
}

export function Eye() {
  return (
    <svg className="btn-arrow" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M1.5 12S5.5 5 12 5s10.5 7 10.5 7-4 7-10.5 7S1.5 12 1.5 12Z" />
      <circle cx="12" cy="12" r="3.2" />
    </svg>
  )
}

// Pill button: the black arrow circle slides in from the right on hover.
export default function Button({ children, href, to, newTab, direction = 'right', icon = 'arrow', className = '', onClick, as }) {
  const inner = (
    <span className="btn-shell">
      <span className="btn-label">{children}</span>
      <span className="btn-icon">
        {icon === 'eye' ? <Eye /> : <Arrow direction={direction} />}
      </span>
    </span>
  )
  const cls = `btn ${className}`.trim()
  if (to) return <Link className={cls} to={to}>{inner}</Link>
  if (as === 'button') return <button type="button" className={cls} onClick={onClick}>{inner}</button>
  return (
    <a
      className={cls}
      href={href}
      onClick={onClick}
      {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {inner}
    </a>
  )
}
