import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, GitHubIcon } from './icons.jsx'

const ease = [0.22, 1, 0.36, 1]

const item = {
  hidden: { opacity: 0, y: 22 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.18 + i * 0.07, ease } }),
}

// Pop-up card for a project: details first, then the GitHub / live-link actions.
export default function ProjectModal({ project, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    const previouslyFocused = document.activeElement
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    const { overflow, paddingRight } = document.body.style
    document.body.style.overflow = 'hidden'
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`
    closeRef.current?.focus({ preventScroll: true })
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
      previouslyFocused?.focus?.({ preventScroll: true })
    }
  }, [onClose])

  return createPortal(
    <motion.div
      className="modal-backdrop"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.88, y: 56, filter: 'blur(8px)' }}
        animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, scale: 0.94, y: 28, filter: 'blur(4px)' }}
        transition={{ type: 'spring', stiffness: 240, damping: 26, mass: 0.9 }}
      >
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close" ref={closeRef}>
          <span />
          <span />
        </button>

        <div className="modal-scroll">
        <motion.div className="modal-media" variants={item} custom={0} initial="hidden" animate="show">
          <img src={project.thumb} alt={project.title} draggable={false} />
        </motion.div>

        <div className="modal-body">
          <motion.p className="modal-category" variants={item} custom={1} initial="hidden" animate="show">
            {project.category}
          </motion.p>
          <motion.h3 id="modal-title" variants={item} custom={2} initial="hidden" animate="show">
            {project.title}
          </motion.h3>
          <motion.div
            className="modal-text richtext"
            variants={item}
            custom={3}
            initial="hidden"
            animate="show"
            dangerouslySetInnerHTML={{ __html: project.html }}
          />
        </div>
        </div>

        <motion.div className="modal-actions" variants={item} custom={4} initial="hidden" animate="show">
          {project.github && (
            <a className="modal-btn modal-btn-dark" href={project.github} target="_blank" rel="noopener noreferrer">
              <GitHubIcon />
              <span>View GitHub</span>
            </a>
          )}
          {project.preview && (
            <a className="modal-btn modal-btn-light" href={project.preview} target="_blank" rel="noopener noreferrer">
              <span>Live Link</span>
              <ArrowUpRight />
            </a>
          )}
        </motion.div>
      </motion.div>
    </motion.div>,
    document.body,
  )
}
