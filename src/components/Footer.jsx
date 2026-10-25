import { motion } from 'framer-motion'
import { links } from '../data/content.js'
import { ArrowUpRight, GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon } from './icons.jsx'

const cards = [
  { label: 'Email', value: links.email, href: `mailto:${links.email}`, Icon: MailIcon },
  { label: 'Phone', value: links.phone, href: `tel:${links.phone}`, Icon: PhoneIcon },
  { label: 'LinkedIn', value: 'mihamviha2026', href: links.linkedin, Icon: LinkedInIcon, external: true },
  { label: 'GitHub', value: 'View my code', href: links.github, Icon: GitHubIcon, external: true },
]

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-inner">
        <motion.div
          className="footer-head"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="section-title">Contact Me</h2>
          <p>Have a project in mind, an opportunity to share, or just want to say hello? Reach out, I'd love to hear from you.</p>
        </motion.div>

        <div className="contact-grid">
          {cards.map(({ label, value, href, Icon, external }, i) => (
            <motion.a
              key={label}
              className="contact-card"
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="contact-icon">
                <Icon />
              </span>
              <span className="contact-text">
                <span className="contact-label">{label}</span>
                <span className="contact-value">{value}</span>
              </span>
              <span className="contact-arrow">
                <ArrowUpRight />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  )
}
