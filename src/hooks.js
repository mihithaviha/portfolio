import { useCallback, useEffect, useRef, useState } from 'react'
import { useAnimationFrame, useMotionValue } from 'framer-motion'

export const clamp = (v, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v))

// Piecewise-linear interpolation over [[x, y], ...] keyframes.
export function lerpKeys(x, keys) {
  if (x <= keys[0][0]) return keys[0][1]
  const last = keys[keys.length - 1]
  if (x >= last[0]) return last[1]
  for (let i = 1; i < keys.length; i++) {
    if (x <= keys[i][0]) {
      const [x0, y0] = keys[i - 1]
      const [x1, y1] = keys[i]
      return y0 + ((x - x0) / (x1 - x0)) * (y1 - y0)
    }
  }
  return last[1]
}

export const easeOut = (t) => 1 - Math.pow(1 - t, 3)

// Stable "small viewport" height (matches CSS 100svh) so mobile toolbars sliding in and out
// don't make scroll-linked animations jump. Falls back to innerHeight.
let svhProbe
export function getVh() {
  if (typeof document === 'undefined') return 900
  if (!svhProbe || !svhProbe.isConnected) {
    svhProbe = document.createElement('div')
    svhProbe.setAttribute('aria-hidden', 'true')
    svhProbe.style.cssText =
      'position:fixed;left:-9999px;top:0;width:1px;height:100vh;height:100svh;visibility:hidden;pointer-events:none'
    document.body.appendChild(svhProbe)
  }
  return svhProbe.offsetHeight || window.innerHeight
}

export function useViewport() {
  const [size, setSize] = useState(() => ({
    width: typeof window === 'undefined' ? 1440 : window.innerWidth,
    height: typeof window === 'undefined' ? 900 : getVh(),
  }))
  useEffect(() => {
    const on = () => setSize({ width: window.innerWidth, height: getVh() })
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  return size
}

export function useBreakpoint() {
  const { width } = useViewport()
  if (width >= 1200) return 'desktop'
  if (width >= 700) return 'tablet'
  return 'mobile'
}

// Returns a getter for an element's absolute page offset (cached, refreshed on layout changes).
export function usePageTop(ref) {
  const top = useRef(0)
  const measure = useCallback(() => {
    if (!ref.current) return
    top.current = ref.current.getBoundingClientRect().top + window.scrollY
  }, [ref])
  useEffect(() => {
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(document.body)
    window.addEventListener('resize', measure)
    window.addEventListener('load', measure)
    const t = setTimeout(measure, 600)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
      window.removeEventListener('load', measure)
      clearTimeout(t)
    }
  }, [measure])
  return useCallback(() => top.current, [])
}

// Idle bobbing: a motion value that eases between 0 and `amp` forever.
export function useFloat({ amp = 12, period = 4.2, phase = 0 } = {}) {
  const value = useMotionValue(amp / 2 + (amp / 2) * Math.cos(phase))
  useAnimationFrame((t) => {
    value.set(amp / 2 + (amp / 2) * Math.cos((t / 1000 / period) * Math.PI * 2 + phase))
  })
  return value
}
