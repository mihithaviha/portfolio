import { useState } from 'react'
import { motion } from 'framer-motion'
import { Arrow } from './Button.jsx'

// Project tile: image in a tinted frame, hover reveals a "View Project" pill and a click opens the pop-up.
export default function ProjectCard({ project, onOpen, reveal = true, index = 0 }) {
  const [hover, setHover] = useState(false)
  const appear = reveal
    ? {
        initial: { opacity: 0, y: 48, scale: 0.92 },
        whileInView: { opacity: 1, y: 0, scale: 1 },
        viewport: { once: true, amount: 0.15 },
        transition: { duration: 0.7, delay: (index % 2) * 0.12, ease: [0.22, 1, 0.36, 1] },
      }
    : {}
  return (
    <motion.div className="project-card-wrap" {...appear}>
      <motion.div className="project-card-lift" whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 220, damping: 24 }}>
      <button
        type="button"
        className="project-card"
        onClick={() => onOpen(project)}
        aria-haspopup="dialog"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="project-frame">
          <div className="project-photo">
            <img src={project.thumb} alt={project.title} draggable={false} loading="lazy" decoding="async" />
            <motion.div className="project-overlay" animate={{ opacity: hover ? 1 : 0 }} transition={{ duration: 0.25 }} />
            <span className="project-view-wrap">
              <motion.span
                className="project-view"
                initial={false}
                animate={{ opacity: hover ? 1 : 0, scale: hover ? 1 : 0.9 }}
                transition={{ duration: 0.25 }}
              >
                <span className="project-view-label">View Project</span>
                <span className="project-view-icon">
                  <Arrow />
                </span>
              </motion.span>
            </span>
          </div>
        </div>
        <div className="project-post">
          <p className="project-category">{project.category}</p>
          <h3>{project.title}</h3>
        </div>
      </button>
      </motion.div>
    </motion.div>
  )
}
