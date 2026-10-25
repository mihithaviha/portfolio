import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { aboutCards } from '../data/content.js'
import { clamp, easeOut, getVh, lerpKeys, useBreakpoint, useFloat, usePageTop } from '../hooks.js'

// Shape growth curves per breakpoint: [scroll (900px-viewport units), scale].
const SCALE_KEYS_DESKTOP = [
  [0, 0.4],
  [450, 0.4],
  [600, 0.552],
  [750, 0.713],
  [900, 0.814],
  [1050, 0.85],
  [2700, 0.884],
  [2850, 0.972],
  [3000, 0.998],
  [3150, 0.841],
  [3300, 0.8],
]

const CUBE_KEYS = {
  tablet: [[0, 0.8], [600, 0.8], [750, 0.964], [900, 1], [3150, 1], [3300, 0.835], [3450, 0.8]],
  mobile: [[0, 0.8], [600, 0.8], [900, 1], [2850, 1], [3150, 0.83], [3300, 0.8]],
}
const PYRAMID_KEYS = {
  tablet: [[0, 0.5], [150, 0.45], [300, 0.5], [450, 0.81], [600, 0.97], [750, 1], [3000, 1], [3150, 0.835], [3300, 0.8]],
  mobile: [[0, 0.52], [150, 0.49], [300, 0.82], [450, 0.97], [700, 1], [2700, 1], [3000, 0.83], [3150, 0.8]],
}

function Segments({ parts }) {
  return parts.map((part, i) =>
    typeof part === 'string' ? <span key={i}>{part}</span> : <strong key={i}>{part.b}</strong>,
  )
}

function AboutCard({ parts, index, trackerRef, children }) {
  const bp = useBreakpoint()
  const getTop = usePageTop(trackerRef)
  const { scrollY } = useScroll()
  const sign = index === 1 ? -1 : 1
  const p = useTransform(scrollY, (y) => {
    const vh = getVh()
    return clamp((y - (getTop() - (300 / 900) * vh)) / vh)
  })
  const shift = bp === 'desktop' ? 24 : 0
  const x = useTransform(p, (v) => sign * shift * (1 - v))
  const yy = useTransform(p, (v) => shift * (1 - v))
  const rotate = useTransform(p, (v) => sign * 2 * (1 - v))

  return (
    <div className="about-card">
      {children}
      <motion.div className="about-card-box" style={{ x, y: yy, rotate }}>
        <div className="about-card-inner">
          <p>
            <Segments parts={parts} />
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default function About() {
  const bp = useBreakpoint()
  const ref = useRef(null)
  const trackers = [useRef(null), useRef(null), useRef(null)]
  const getTop = usePageTop(ref)
  const { scrollY } = useScroll()

  // Shapes behind the cards: grow with scroll, drift gently.
  const norm = (y) => (y * 900) / getVh()
  const cubeScale = useTransform(scrollY, (y) =>
    lerpKeys(norm(y), bp === 'desktop' ? SCALE_KEYS_DESKTOP : CUBE_KEYS[bp]),
  )
  const pyramidScale = useTransform(scrollY, (y) =>
    lerpKeys(norm(y), bp === 'desktop' ? SCALE_KEYS_DESKTOP : PYRAMID_KEYS[bp]),
  )
  const cubeBob = useFloat({ amp: 24, period: 4.8, phase: 0.4 })
  const pyramidBob = useFloat({ amp: 24, period: 4.8, phase: 2.6 })

  // On desktop the shapes drift outwards as you scroll so they stay visible beside the cards.
  const drift = useTransform(scrollY, (y) => {
    if (bp !== 'desktop') return 0
    const vh = getVh()
    const out = Math.min(260, window.innerWidth * 0.18)
    return out * easeOut(clamp((y - getTop()) / (1.1 * vh)))
  })
  const cubeX = useSpring(useTransform(drift, (d) => -d), { stiffness: 120, damping: 24, mass: 0.6 })
  const pyramidX = useSpring(drift, { stiffness: 120, damping: 24, mass: 0.6 })

  return (
    <section className="about" ref={ref}>
      <div id="about" className="anchor" />
      <div className="about-sticky">
        <h2 className="section-title">About Me</h2>
        <motion.div className="about-shape about-shape-cube" style={{ scale: cubeScale, x: cubeX, y: cubeBob }}>
          <img src="/images/53osOsH2OP7bAyFNQKbXOVwk.png" alt="Purple Cube" draggable={false} />
        </motion.div>
        <motion.div className="about-shape about-shape-pyramid" style={{ scale: pyramidScale, x: pyramidX, y: pyramidBob, rotate: 10 }}>
          <img src="/images/en9G6oaN8j6IT8H0gpgIS69gXg4.png" alt="Blue Pyramid" draggable={false} />
        </motion.div>
      </div>
      <div className="about-cards">
        {trackers.map((t, i) => (
          <div
            key={i}
            className="tracker"
            style={{ top: `${i * 100}svh` }}
            id={i === 0 ? undefined : `about-scroll-section-0${i + 1}`}
            ref={t}
          />
        ))}
        {aboutCards.map((parts, i) => (
          <AboutCard key={i} parts={parts} index={i} trackerRef={trackers[i]}>
          </AboutCard>
        ))}
      </div>
    </section>
  )
}
