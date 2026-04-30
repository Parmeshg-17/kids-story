import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiTrendingUp, FiEye } from 'react-icons/fi'

export default function TrendingSection({ stories = [] }) {
  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-8 rounded-full" style={{ background: 'var(--primary)' }} />
        <h2 className="text-2xl font-extrabold font-poppins" style={{ color: 'var(--text-primary)' }}>
          🔥 Trending Stories
        </h2>
      </div>
      <div className="space-y-3">
        {stories.map((story, i) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Link to={`/story/${story.slug}`} className="flex items-center gap-4 glass-card p-4 group">
              {/* Rank badge */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-lg shrink-0 transition-transform group-hover:scale-110"
                style={{
                  background: i < 3
                    ? `linear-gradient(135deg, var(--primary), var(--secondary))`
                    : 'var(--border)',
                  color: i < 3 ? 'white' : 'var(--text-secondary)',
                }}
              >
                {i + 1}
              </div>

              {/* Thumbnail */}
              {story.thumbnail && (
                <img
                  src={story.thumbnail}
                  alt={story.title}
                  className="w-14 h-14 rounded-xl object-cover shrink-0"
                  loading="lazy"
                />
              )}

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3
                  className="font-bold text-sm leading-snug truncate"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {story.title}
                </h3>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {story.category}
                </span>
              </div>

              {/* Views */}
              <div className="flex items-center gap-1 text-xs font-bold shrink-0" style={{ color: 'var(--primary)' }}>
                <FiEye size={12} /> {story.views || 0}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
