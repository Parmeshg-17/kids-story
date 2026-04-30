import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight, FiClock } from 'react-icons/fi'

export default function FeaturedSlider({ stories = [] }) {
  const [current, setCurrent] = useState(0)
  const [dragging, setDragging] = useState(false)
  const dragStartX = useRef(0)
  const timerRef = useRef()

  const total = stories.length

  const next = () => setCurrent(c => (c + 1) % total)
  const prev = () => setCurrent(c => (c - 1 + total) % total)

  useEffect(() => {
    timerRef.current = setInterval(next, 5000)
    return () => clearInterval(timerRef.current)
  }, [total])

  const resetTimer = () => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(next, 5000)
  }

  if (!total) {
    return (
      <div className="rounded-3xl glass-card h-72 flex items-center justify-center">
        <p className="text-4xl">📚</p>
      </div>
    )
  }

  const story = stories[current]

  return (
    <div className="relative rounded-3xl overflow-hidden" style={{ height: 360 }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -80 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${story.banner || story.thumbnail || 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&q=80'})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center px-8 md:px-14">
            <div className="max-w-lg">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 text-white"
                style={{ background: 'var(--primary)', opacity: 0.9 }}>
                ⭐ Featured Story
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold font-poppins text-white mb-3 leading-tight">
                {story.title}
              </h2>
              <p className="text-white/70 text-sm mb-5 line-clamp-2">
                {story.content?.replace(/<[^>]+>/g, '').substring(0, 120)}...
              </p>
              <div className="flex items-center gap-4">
                <Link
                  to={`/story/${story.slug}`}
                  className="btn-primary px-6 py-2.5 text-sm"
                >
                  Read Story →
                </Link>
                <span className="flex items-center gap-1 text-white/60 text-xs">
                  <FiClock size={12} /> {story.readingTime || 5} min
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <button
        onClick={() => { prev(); resetTimer() }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
        style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}
      >
        <FiChevronLeft size={20} />
      </button>
      <button
        onClick={() => { next(); resetTimer() }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
        style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}
      >
        <FiChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {stories.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrent(i); resetTimer() }}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === current ? 24 : 8,
              height: 8,
              background: i === current ? 'var(--primary)' : 'rgba(255,255,255,0.5)',
            }}
          />
        ))}
      </div>
    </div>
  )
}
