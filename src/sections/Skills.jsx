import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { skills } from '../data/content.js'
import { logos } from '../data/logos.js'
import { getVh, useBreakpoint, useFloat } from '../hooks.js'

function LogoTiles({ names }) {
  return (
    <div className="skill-logos">
      {names.map((name) => (
        <span className="skill-logo" key={name}>
          <svg viewBox={logos[name].viewBox} aria-hidden dangerouslySetInnerHTML={{ __html: logos[name].html }} />
        </span>
      ))}
    </div>
  )
}

function Heading({ n, title, className = '' }) {
  return (
    <div className={`skill-heading ${className}`}>
      <div className="skill-number">
        <h3>{String(n + 1).padStart(2, '0')}</h3>
      </div>
      <h3 className="skill-title">{title}</h3>
      <LogoTiles names={skills[n].logos} />
    </div>
  )
}

function Shape({ item, index }) {
  // Gentle idle float, phase-shifted per shape.
  const y = useFloat({ amp: 24, period: 4.8, phase: index * 0.8 })
  return (
    <div className={`skill-shape-wrap${index === 0 ? ' is-first' : ''}`}>
      <motion.div
        className="skill-shape"
        style={{ y, width: 240, height: 240, rotate: item.shape.rotate }}
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <img src={item.shape.src} alt={item.shape.alt} draggable={false} loading="lazy" decoding="async" />
      </motion.div>
    </div>
  )
}

export default function Skills() {
  const bp = useBreakpoint()
  const blocksRef = useRef([])
  const [active, setActive] = useState(0)

  // The sticky number/title on the left follows whichever description is mid-screen.
  useEffect(() => {
    if (bp === 'mobile') return undefined
    const update = () => {
      const probe = getVh() * 0.5
      let current = 0
      blocksRef.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= probe) current = i
      })
      setActive(current)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [bp])

  return (
    <section className="skills">
      <div id="services" className="anchor" />
      <div className="skills-content">
        <motion.h2
          className="section-title skills-title"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          My Skills
        </motion.h2>
        <div className="skills-body">
          {bp !== 'mobile' && (
            <div className="skills-left">
              <div className="skills-sticky">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -24, filter: 'blur(6px)' }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  >
                    <Heading n={active} title={skills[active].title} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          )}
          <div className="skills-right">
            {skills.map((item, i) => (
              <div
                key={item.title}
                className={`skill-block${i === 0 ? ' is-first' : ''}`}
                id={`services-scroll-section-0${i + 1}`}
                ref={(el) => (blocksRef.current[i] = el)}
              >
                {bp === 'mobile' && <Heading n={i} title={item.title} className="skill-heading-inline" />}
                <motion.p
                  className="skill-text"
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  {item.text}
                </motion.p>
                <Shape item={item} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
