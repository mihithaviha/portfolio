import Hero from '../sections/Hero.jsx'
import About from '../sections/About.jsx'
import Stack from '../sections/Stack.jsx'
import Skills from '../sections/Skills.jsx'
import Projects from '../sections/Projects.jsx'
import Footer from '../components/Footer.jsx'
import Nav from '../components/Nav.jsx'

export default function Home() {
  return (
    <>
      <Nav />
      <main className="main">
        <Hero />
        <About />
        <Stack />
        <Skills />
        <Projects />
      </main>
      <div className="footer-gap" />
      <Footer />
    </>
  )
}
