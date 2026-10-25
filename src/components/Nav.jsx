import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from './icons.jsx'
import { Link } from 'react-router-dom'
import { navItems } from '../data/content.js'
import { getVh, useBreakpoint } from '../hooks.js'

// Which nav item is active for a given scroll position (anchors are looked up by id).
function useActiveAnchor(enabled) {
  const [active, setActive] = useState('home')
  useEffect(() => {
    if (!enabled) return undefined
    const update = () => {
      const probe = window.scrollY + getVh() * 0.5
      let current = 'home'
      for (const item of navItems) {
        const el = document.getElementById(item.anchor)
        if (!el) continue
        const top = el.getBoundingClientRect().top + window.scrollY
        if (top <= probe) current = item.anchor
      }
      // the footer is short, so treat the very bottom of the page as "Contact"
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) current = 'contact'
      setActive(current)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [enabled])
  return active
}

function goTo(anchor) {
  const el = document.getElementById(anchor)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY
  window.scrollTo({ top, behavior: 'smooth' })
}

function NavLink({ item, selected, onClick }) {
  return (
    <a
      className={`nav-link${selected ? ' is-selected' : ''}`}
      href={item.href}
      onClick={(e) => {
        e.preventDefault()
        onClick(item)
      }}
    >
      <span className="nav-link-label">{item.label}</span>
    </a>
  )
}

// Measured positions of the orange indicator for each item (relative to the pill's left edge).
const INDICATOR = {
  home: { x: 2, w: 75 },
  about: { x: 74, w: 76 },
  stack: { x: 147, w: 73 },
  services: { x: 218, w: 92 },
  projects: { x: 306, w: 90 },
  contact: { x: 393, w: 87 },
}

function DesktopNav({ active, onNavigate }) {
  const box = INDICATOR[active] || INDICATOR.home
  return (
    <nav className="nav-pill" aria-label="Primary">
      <motion.span
        className="nav-indicator"
        initial={false}
        animate={{ x: box.x, width: box.w }}
        transition={{ type: 'spring', stiffness: 420, damping: 32, mass: 1 }}
      />
      {navItems.map((item) => (
        <span key={item.anchor} className="nav-slot">
          <NavLink item={item} selected={active === item.anchor} onClick={onNavigate} />
        </span>
      ))}
    </nav>
  )
}

// Separate call-to-action next to the navigation; hides once you're at the contact section.
function NavCta({ active, onNavigate }) {
  return (
    <AnimatePresence>
      {active !== 'contact' && (
        <motion.a
          className="nav-cta"
          href="#contact"
          initial={{ opacity: 0, x: -16, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -16, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.5 }}
          whileTap={{ scale: 0.96 }}
          onClick={(e) => {
            e.preventDefault()
            onNavigate({ anchor: 'contact' })
          }}
        >
          <span className="nav-cta-label">Let's Talk</span>
          <span className="nav-cta-icon">
            <ArrowUpRight />
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}

function MobileNav({ active, onNavigate }) {
  const [open, setOpen] = useState(false)

  // close the sheet when the page is scrolled
  useEffect(() => {
    if (!open) return undefined
    const y0 = window.scrollY
    const onScroll = () => Math.abs(window.scrollY - y0) > 40 && setOpen(false)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [open])

  return (
    <>
      <div className="nav-actions">
        <NavCta active={active} onNavigate={onNavigate} />
        <button
          type="button"
          className="nav-burger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
          data-framer-name="Menu"
        >
          <span className="burger-line burger-line-1" />
          <span className="burger-line burger-line-2" />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-sheet"
            initial={{ opacity: 0, scale: 0.9, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -12 }}
            transition={{ type: 'spring', stiffness: 400, damping: 34 }}
          >
            <button type="button" className="nav-sheet-close" aria-label="Close menu" onClick={() => setOpen(false)}>
              <span className="x-line x-line-1" />
              <span className="x-line x-line-2" />
            </button>
            <ul>
              {navItems.map((item) => (
                <li key={item.anchor}>
                  <a
                    href={item.href}
                    className={active === item.anchor ? 'is-selected' : ''}
                    onClick={(e) => {
                      e.preventDefault()
                      setOpen(false)
                      onNavigate(item)
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default function Nav() {
  const bp = useBreakpoint()
  const active = useActiveAnchor(true)
  const onNavigate = (item) => goTo(item.anchor)
  return (
    <header className="nav">
      {bp === 'mobile' ? (
        <MobileNav active={active} onNavigate={onNavigate} />
      ) : (
        <div className="nav-group">
          <DesktopNav active={active} onNavigate={onNavigate} />
          <NavCta active={active} onNavigate={onNavigate} />
        </div>
      )}
    </header>
  )
}

// Back-pill used on sub pages. `scrollTo` is the id of the section to land on (kept out of the URL).
export function BackNav({ to, label, scrollTo }) {
  return (
    <header className="back-nav">
      <Link className="back-pill" to={to} state={scrollTo ? { scrollTo } : undefined}>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M20 12H4M10 6l-6 6 6 6" />
        </svg>
        <span>{label}</span>
      </Link>
    </header>
  )
}
