import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigationType } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Licensing from './pages/Licensing.jsx'
import NotFound from './pages/NotFound.jsx'

// Remembers the scroll position of every history entry so the browser's back button restores it.
const positions = {}

// Handles scrolling on route changes: restores the old position on back/forward, scrolls to an
// in-page target passed via `state.scrollTo` (keeps the URL clean) or the hash, otherwise goes to the top.
function ScrollManager() {
  const location = useLocation()
  const navType = useNavigationType()
  const { pathname, hash, key, state } = location

  // we restore scroll ourselves; stop the browser from fighting us
  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
  }, [])

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        positions[key] = window.scrollY
      })
    }
    // also save right before any click (runs before the router handles a link), so a scroll
    // that happened a moment ago is never lost
    const saveNow = () => {
      positions[key] = window.scrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('click', saveNow, true)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('click', saveNow, true)
      cancelAnimationFrame(frame)
    }
  }, [key])

  useEffect(() => {
    const target = state?.scrollTo || (hash ? hash.slice(1) : null)
    const saved = positions[key]
    let tries = 0
    let timer

    const go = () => {
      if (navType === 'POP' && saved != null) {
        window.scrollTo(0, saved)
        if (Math.abs(window.scrollY - saved) > 2 && tries++ < 40) timer = setTimeout(go, 50)
        return
      }
      if (target) {
        const el = document.getElementById(target)
        if (el) {
          window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY })
        } else if (tries++ < 20) {
          timer = setTimeout(go, 50)
        }
        return
      }
      window.scrollTo(0, 0)
    }
    go()
    // layout settles after images and fonts load; align once more
    const settle = setTimeout(() => {
      if (!(navType === 'POP' && saved != null) && target) go()
    }, 400)
    return () => {
      clearTimeout(timer)
      clearTimeout(settle)
    }
  }, [pathname, hash, key, navType, state])
  return null
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <div className="blur-top" aria-hidden />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/licensing" element={<Licensing />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </>
  )
}
