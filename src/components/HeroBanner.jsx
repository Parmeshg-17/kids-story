import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'

// Floating particle component
function Particle({ style }) {
  return <div className="particle" style={style} />
}

const PARTICLES = [
  { width: 80, height: 80, top: '10%', left: '5%', background: 'rgba(255,107,157,0.3)', animationDelay: '0s', animationDuration: '7s' },
  { width: 50, height: 50, top: '20%', left: '80%', background: 'rgba(192,132,252,0.3)', animationDelay: '1s', animationDuration: '5s' },
  { width: 40, height: 40, top: '60%', left: '10%', background: 'rgba(52,211,153,0.3)', animationDelay: '2s', animationDuration: '8s' },
  { width: 60, height: 60, top: '70%', left: '85%', background: 'rgba(255,107,157,0.2)', animationDelay: '0.5s', animationDuration: '6s' },
  { width: 35, height: 35, top: '40%', left: '90%', background: 'rgba(192,132,252,0.25)', animationDelay: '1.5s', animationDuration: '9s' },
  { width: 25, height: 25, top: '80%', left: '50%', background: 'rgba(52,211,153,0.25)', animationDelay: '3s', animationDuration: '7s' },
]

export default function HeroBanner({ imageUrl, title, subtitle }) {
  const defaultImage = 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1400&q=80'

  return (
    <section className="relative overflow-hidden min-h-[520px] md:min-h-[600px] flex items-center rounded-3xl mx-4 mt-4 mb-10">
      {/* Background Image */}
      <div
        className="absolute inset-0 rounded-3xl bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl || defaultImage})` }}
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.5) 100%)',
        }}
      />

      {/* Animated gradient stripe */}
      <div
        className="absolute inset-0 rounded-3xl opacity-30 animate-gradient"
        style={{
          background: 'linear-gradient(270deg, var(--primary), var(--secondary), var(--accent), var(--primary))',
          backgroundSize: '400% 400%',
          mixBlendMode: 'soft-light',
        }}
      />

      {/* Floating Particles */}
      {PARTICLES.map((p, i) => (
        <Particle key={i} style={p} />
      ))}

      {/* Emoji decorations */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-8 right-12 text-5xl hidden md:block"
      >
        📚
      </motion.div>
      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-12 right-24 text-4xl hidden md:block"
      >
        ⭐
      </motion.div>
      <motion.div
        animate={{ rotate: [0, 15, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-16 left-16 text-4xl hidden lg:block"
      >
        🦋
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          <motion.span
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4 text-white"
            style={{ background: 'rgba(255,107,157,0.5)', border: '1px solid rgba(255,107,157,0.5)', backdropFilter: 'blur(10px)' }}
          >
            ✨ Hindi & English Stories
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-4xl md:text-6xl font-extrabold font-poppins text-white leading-tight mb-4"
          >
            {title || 'Magical Stories for Little Minds'}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-white/80 text-lg md:text-xl mb-8 leading-relaxed"
          >
            {subtitle || 'Explore hundreds of bedtime stories, moral tales, and adventures in Hindi & English'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/stories"
              className="flex items-center gap-2 btn-primary text-base px-6 py-3"
            >
              Start Reading <FiArrowRight />
            </Link>
            <Link
              to="/stories?language=Hindi"
              className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white border border-white/30 backdrop-blur-sm hover:bg-white/10 transition-all"
            >
              🕉️ हिंदी कहानियाँ
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
