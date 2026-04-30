import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'

export default function NotFoundPage() {
  return (
    <>
      <Helmet><title>404 - Page Not Found | KidsStory</title></Helmet>
      <main className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="text-8xl mb-6"
        >
          📚
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-8xl font-extrabold font-poppins gradient-text mb-4">404</h1>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Oops! This page went on an adventure
          </h2>
          <p className="text-base mb-8 max-w-md" style={{ color: 'var(--text-secondary)' }}>
            The story you're looking for doesn't exist or has moved to a new chapter.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/" className="btn-primary px-8 py-3">
              🏠 Go Home
            </Link>
            <Link
              to="/stories"
              className="px-8 py-3 rounded-full font-bold border-2 transition-all hover:opacity-80"
              style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}
            >
              📚 Browse Stories
            </Link>
          </div>
        </motion.div>

        {/* Floating stars */}
        {['⭐', '🌟', '✨', '💫'].map((star, i) => (
          <motion.span
            key={i}
            className="absolute text-2xl"
            style={{
              top: `${20 + i * 15}%`,
              left: i % 2 === 0 ? `${5 + i * 5}%` : `${75 + i * 5}%`,
            }}
            animate={{ y: [-10, 10, -10], rotate: [0, 180, 360] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
          >
            {star}
          </motion.span>
        ))}
      </main>
    </>
  )
}
