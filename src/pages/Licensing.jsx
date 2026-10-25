import { BackNav } from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'
import { logos } from '../data/logos.js'

const items = [
  { name: 'Framer Supply', href: 'https://framer.supply/', logo: 'framer' },
  { name: 'Phosphor', href: 'https://phosphoricons.com/', logo: 'phosphor' },
  { name: 'Google Fonts', href: 'https://fonts.google.com/', logo: 'google' },
  { name: 'Midjourney', href: 'https://www.midjourney.com/', logo: 'midjourney' },
  { name: 'Remove.bg', href: 'https://www.remove.bg/', logo: 'layers' },
]

export default function Licensing() {
  return (
    <>
      <BackNav to="/" label="Back Home" />
      <main className="main licensing-page">
        <h2 className="section-title licensing-title">Licensing</h2>
        <div className="licensing-grid">
          {items.map((item) => {
            const l = logos[item.logo]
            return (
              <a className="license-card" key={item.name} href={item.href} target="_blank" rel="noopener noreferrer">
                <div className="license-inner">
                  <svg
                    className={`stack-logo license-logo license-logo-${item.logo}`}
                    viewBox={l.viewBox}
                    preserveAspectRatio="none"
                    aria-hidden
                    dangerouslySetInnerHTML={{ __html: l.html }}
                  />
                  <h3>{item.name}</h3>
                </div>
              </a>
            )
          })}
        </div>
      </main>
      <div className="footer-gap footer-gap-sub" />
      <Footer />
    </>
  )
}
