import { useEffect, useState } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import Button from '../components/Button.jsx'
import { heroTicker } from '../data/content.js'
import { clamp, easeOut, getVh, useBreakpoint, useFloat } from '../hooks.js'

// Scroll position in the 900px-viewport reference units the motion curves were measured in.
const useRef900 = () => {
  const { scrollY } = useScroll()
  return useTransform(scrollY, (y) => (y * 900) / getVh())
}

function Shape({ name, src, alt, phase, slope, from, to, rotate = 0, s }) {
  const bob = useFloat({ amp: 12, period: 4.2, phase })
  const y = useTransform([s, bob], ([v, b]) => b + slope * v)
  const scale = useTransform(s, (v) => 1 - 0.2 * easeOut(clamp((v - from) / (to - from))))
  return (
    <motion.div
      className={`shape shape-${name}`}
      style={{ y, scale, rotate }}
    >
      <img src={src} alt={alt} draggable={false} />
    </motion.div>
  )
}

function Ticker() {
  const n = heroTicker.length
  // The first phrase is repeated at the end so the loop wraps without scrolling back through the list.
  const items = [...heroTicker, heroTicker[0]]
  const [step, setStep] = useState({ i: 0, instant: false })
  useEffect(() => {
    const timer = setInterval(() => setStep((s) => (s.i >= n ? s : { i: s.i + 1, instant: false })), 3000)
    return () => clearInterval(timer)
  }, [n])
  return (
    <div className="ticker">
      <motion.div
        className="ticker-list"
        initial={false}
        animate={{ y: -step.i * 32 }}
        transition={step.instant ? { duration: 0 } : { duration: 0.45, ease: [0.44, 0, 0.56, 1] }}
        onAnimationComplete={() => step.i === n && setStep({ i: 0, instant: true })}
      >
        {items.map((item, i) => (
          <div className="ticker-slot" key={`${item.text}-${i}`}>
            <p>{item.text}</p>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function Hero() {
  const bp = useBreakpoint()
  const s = useRef900()
  const titleY = useTransform(s, (v) => -0.3 * v)
  const photoY = useTransform(s, (v) => -0.4 * v)
  const ctaY = useTransform(s, (v) => 0.1 * v)
  const imgScale = useTransform(s, (v) => 1 + 0.1 * easeOut(clamp((v - 150) / 300)))
  const imgY = useTransform(s, (v) => 24 * easeOut(clamp((v - 150) / 300)))
  const ringRotate = useTransform(s, (v) => 43.3 + 0.18 * v)

  // Subtle pointer tilt on the photo (mouse/pen only), springing back to flat.
  const tiltTargetX = useMotionValue(0)
  const tiltTargetY = useMotionValue(0)
  const tiltX = useSpring(tiltTargetX, { stiffness: 140, damping: 16, mass: 0.6 })
  const tiltY = useSpring(tiltTargetY, { stiffness: 140, damping: 16, mass: 0.6 })
  const photoBob = useFloat({ amp: 10, period: 5, phase: 0.6 })
  const onPhotoMove = (e) => {
    if (e.pointerType === 'touch') return
    const r = e.currentTarget.getBoundingClientRect()
    tiltTargetY.set(((e.clientX - r.left) / r.width - 0.5) * 12)
    tiltTargetX.set(-((e.clientY - r.top) / r.height - 0.5) * 12)
  }
  const onPhotoLeave = () => {
    tiltTargetX.set(0)
    tiltTargetY.set(0)
  }

  return (
    <section className="hero">
      <div id="home" className="anchor" />
      <div className="hero-top">
        <div className="shapes">
          <Shape name="pyramid" src="/images/0f09LEy6qZK1Y9gL9T6AG622ZZ8.png" alt="Orange Pyramid" phase={-0.6} slope={-0.409} from={150} to={450} rotate={10} s={s} />
          <Shape name="sphere" src="/images/m3YA9HpmQG8c9ThSe5XusCzYw.png" alt="Purple Sphere" phase={-0.08} slope={-0.5} from={300} to={600} s={s} />
          <Shape name="cylinder" src="/images/lZLqIoLGAjMHHOlhOwugYSASrjc.png" alt="Blue Cylinder" phase={-1.25} slope={-0.612} from={450} to={750} rotate={-55} s={s} />
          <Shape name="star" src="/images/l1KkpEI9tJzqQPgJDNKytRuxgeI.png" alt="Turquoise Star" phase={-1.25} slope={-0.412} from={150} to={450} s={s} />
          <Shape name="green" src="/images/LUkmo3gFVQOfp5kvltA05Mc6K4.png" alt="Lime Green Object" phase={-0.08} slope={-0.5} from={300} to={600} s={s} />
          <Shape name="cube" src="/images/jaVohrUAKzleX6rjxEEOPrqeysw.png" alt="Yellow Cube" phase={-0.6} slope={-0.609} from={450} to={750} s={s} />
        </div>

        <div className="profile">
          <div className="pos pos-title">
            <motion.h1 className="hero-title" style={{ y: titleY }}>
              <span className="hero-title-sans">Hi, I'm </span>
              <span className="hero-title-serif">Mihitha viharini</span>
              <span className="hero-title-sans">!</span>
            </motion.h1>
          </div>

          <div className="pos pos-ticker">
            <motion.div style={{ y: titleY }}>
              <Ticker />
            </motion.div>
          </div>

          <div className="pos pos-photo">
            <motion.div
              className="photo-wrap"
              style={{ y: photoY }}
              onPointerMove={onPhotoMove}
              onPointerLeave={onPhotoLeave}
            >
              <motion.div
                className="photo-tilt"
                style={{ rotateX: tiltX, rotateY: tiltY, y: photoBob }}
                initial={{ opacity: 0, scale: 0.88, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="photo-glow" />
                <div className="photo-ring" />
                <div className="photo-front">
                  <motion.img
                    src="/images/wgTQMTdKfQMCutCjy1058eqFQOo.jpg"
                    alt="Profile Picture"
                    draggable={false}
                    style={{ scale: imgScale, y: imgY }}
                  />
                </div>
              </motion.div>

              <motion.div
                className="photo-badge"
                initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 140, damping: 16, delay: 0.9 }}
              >
                <motion.svg className="badge-text" viewBox="0 0 100 100" style={{ rotate: ringRotate }} aria-hidden>
                  <defs>
                    <path id="badge-path" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
                  </defs>
                  <text fontSize="9.2" fontWeight="600" fill="#000" fontFamily="Public Sans, sans-serif" letterSpacing="1.5">
                    <textPath href="#badge-path">✦ SCROLL DOWN ✦ KNOW ME BETTER </textPath>
                  </text>
                </motion.svg>
                <span className="badge-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M12 5v14M6 13l6 6 6-6" />
                  </svg>
                </span>
              </motion.div>
            </motion.div>
          </div>

          <div className="pos pos-cta">
            <motion.div style={{ y: ctaY }}>
              <Button
                href="#contact"
                direction="down"
                onClick={(e) => {
                  e.preventDefault()
                  const el = document.getElementById('contact')
                  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: 'smooth' })
                }}
              >
                {bp === 'mobile' ? 'Contact Me' : "Let's Work Together!"}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
