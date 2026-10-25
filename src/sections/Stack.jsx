import { useRef, useState } from 'react'
import { motion, useMotionValue, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { stack } from '../data/content.js'
import { logos } from '../data/logos.js'
import { getVh, lerpKeys, useBreakpoint, useFloat } from '../hooks.js'

function Logo({ name }) {
  const l = logos[name]
  return (
    <div className="stack-logo-box">
      <svg
        className={`stack-logo stack-logo-${name}`}
        viewBox={l.viewBox}
        preserveAspectRatio="none"
        aria-hidden
        dangerouslySetInnerHTML={{ __html: l.html }}
      />
    </div>
  )
}

function StackCard({ item }) {
  const bp = useBreakpoint()
  const wrapRef = useRef(null)
  const [flipped, setFlipped] = useState(false)
  const [hovered, setHovered] = useState(false)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  // Grows from 80% to full size as the card travels from the bottom edge up to a third of the way.
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start 1', 'start 0.4'] })
  const grow = useTransform(scrollYProgress, (p) => lerpKeys(p, GROW_KEYS))
  const scale = useTransform(grow, (g) => 0.8 + 0.2 * g)
  const opacity = useTransform(grow, (g) => 0.25 + 0.75 * Math.min(1, g * 1.6))
  const lift = useTransform(grow, (g) => 36 * (1 - g))

  const onMove = (e) => {
    const r = wrapRef.current.getBoundingClientRect()
    mx.set(e.clientX - r.left + 18)
    my.set(e.clientY - r.top - 5)
  }

  return (
    <div className="stack-card-wrap" ref={wrapRef}>
    <motion.div
      className="stack-card-motion"
      style={{ scale, opacity, y: lift }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMove}
    >
      <motion.div
        className="stack-card"
        role="button"
        tabIndex={0}
        aria-label={`${item.name} — flip card`}
        onClick={() => setFlipped((f) => !f)}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setFlipped((f) => !f)}
        initial={false}
        animate={{ rotateX: flipped ? 180 : 0 }}
        whileHover={{ y: -8 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 170, damping: 22, mass: 0.9 }}
      >
        <div className="stack-face stack-front">
          <div className="stack-inner">
            <Logo name={item.logo} />
            <h3>{item.name}</h3>
            {bp !== 'desktop' && <p className="tap-hint">Tap to flip</p>}
          </div>
        </div>
        <div className="stack-face stack-back">
          <div className="stack-inner">
            <p>{item.text}</p>
          </div>
        </div>
      </motion.div>
      {bp === 'desktop' && (
        <AnimatePresence>
          {hovered && (
            <motion.span
              className="flip-pill"
              style={{ x: mx, y: my }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
            >
              {flipped ? 'Tap to Flip' : 'Tap to Flip'}
            </motion.span>
          )}
        </AnimatePresence>
      )}
    </motion.div>
    </div>
  )
}

// Progress curve of a card growing from 80% to 100% as it scrolls into view.
const GROW_KEYS = [
  [0, 0],
  [0.2, 0.17],
  [0.45, 0.48],
  [0.7, 0.82],
  [0.85, 0.93],
  [1, 1],
]

const CUBE_KEYS = [
  [3300, 0.8],
  [3450, 0.95],
  [3600, 1],
  [5276, 1],
  [5426, 0.85],
  [5576, 0.8],
]

export default function Stack() {
  const ref = useRef(null)
  const { scrollY } = useScroll()
  const cubeScale = useTransform(scrollY, (y) => lerpKeys((y * 900) / getVh(), CUBE_KEYS))
  const cubeY = useFloat({ amp: 24, period: 4.8, phase: 1.2 })

  const cells = stack.map((item) => <StackCard key={item.name} item={item} />)

  return (
    <section className="stack" ref={ref}>
      <div id="stack" className="anchor" />
      <div className="stack-content">
        <motion.h2
          className="section-title stack-title"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          My Stack
        </motion.h2>
        <div className="stacks">
          <div className="stack-cube-wrap">
            <motion.div className="stack-cube" style={{ scale: cubeScale, y: cubeY }}>
              <img src="/images/tLJlDufDxfRWX3e1UyLWQODdOaw.png" alt="Turquoise Cube" draggable={false} loading="lazy" decoding="async" />
            </motion.div>
          </div>
          <div className="stack-grid">{cells}</div>
        </div>
      </div>
    </section>
  )
}
