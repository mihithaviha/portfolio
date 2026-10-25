import { motion } from 'framer-motion'
import Button from '../components/Button.jsx'

const digits = [
  { src: '/images/LalpL607BiNxggcZ7QE3ZWQD5k.png', size: 325 },
  { src: '/images/in8RtVYFPreOsUIEv6PjCRtQjk.png', size: 305 },
  { src: '/images/XNKUBYWXrvpOQSLGsp9xsVbkQi0.png', size: 325 },
]

export default function NotFound() {
  return (
    <main className="notfound">
      <div className="notfound-digits">
        {digits.map((d, i) => (
          <motion.img
            key={d.src}
            src={d.src}
            alt=""
            style={{ width: d.size, height: d.size }}
            draggable={false}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, type: 'spring', stiffness: 120, damping: 18 }}
          />
        ))}
      </div>
      <p>OOPS! This page wasn't found!</p>
      <Button to="/">Back Home</Button>
    </main>
  )
}
