import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Button from '../components/Button.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import ProjectModal from '../components/ProjectModal.jsx'
import { projects } from '../data/projects.js'

export default function Projects() {
  const [selected, setSelected] = useState(null)
  const close = useCallback(() => setSelected(null), [])
  return (
    <section className="projects">
      <div id="projects" className="anchor" />
      <div className="projects-content">
        <motion.h2
          className="section-title projects-title"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Projects
        </motion.h2>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} onOpen={setSelected} />
          ))}
        </div>
        <div className="projects-more">
          <Button as="button" direction="down">
            View More
          </Button>
        </div>
      </div>
      <AnimatePresence>{selected && <ProjectModal project={selected} onClose={close} />}</AnimatePresence>
    </section>
  )
}
