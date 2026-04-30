import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiBookmark, FiClock, FiEye } from 'react-icons/fi'
import { useBookmarks } from '../context/BookmarkContext'
import toast from 'react-hot-toast'

const LANG_COLORS = {
  Hindi: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  English: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
}

const THEME_GRADIENTS = {
  kids: 'from-pink-400 to-purple-400',
  horror: 'from-red-600 to-gray-900',
  moral: 'from-amber-400 to-green-400',
  royal: 'from-violet-600 to-amber-400',
  default: 'from-indigo-500 to-purple-500',
}

export function StoryCardSkeleton() {
  return (
    <div className="glass-card overflow-hidden">
      <div className="skeleton h-48 rounded-t-2xl" />
      <div className="p-4 space-y-3">
        <div className="skeleton h-4 w-24 rounded" />
        <div className="skeleton h-6 w-full rounded" />
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-4 w-1/2 rounded" />
      </div>
    </div>
  )
}

export default function StoryCard({ story, index = 0 }) {
  const { toggleBookmark, isBookmarked } = useBookmarks()
  const bookmarked = isBookmarked(story.id)
  const gradient = THEME_GRADIENTS[story.theme] || THEME_GRADIENTS.default

  const handleBookmark = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleBookmark(story)
    toast.success(bookmarked ? '🗑️ Bookmark removed' : '🔖 Story bookmarked!')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="glass-card card-shimmer overflow-hidden group cursor-pointer tilt-card"
    >
      <Link to={`/story/${story.slug}`} className="block">
        {/* Thumbnail */}
        <div className="relative overflow-hidden h-48">
          {story.thumbnail ? (
            <img
              src={story.thumbnail}
              alt={story.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
              <span className="text-5xl">📖</span>
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Language badge */}
          <span className={`absolute top-3 left-3 text-xs font-bold px-2 py-0.5 rounded-full ${LANG_COLORS[story.language] || LANG_COLORS.English}`}>
            {story.language === 'Hindi' ? '🇮🇳 हिंदी' : '🇬🇧 English'}
          </span>

          {/* Bookmark button */}
          <motion.button
            onClick={handleBookmark}
            whileTap={{ scale: 0.8 }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              background: bookmarked ? 'var(--primary)' : 'rgba(255,255,255,0.8)',
              backdropFilter: 'blur(10px)',
              color: bookmarked ? 'white' : 'var(--text-primary)',
            }}
            aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark story'}
          >
            <FiBookmark size={14} fill={bookmarked ? 'currentColor' : 'none'} />
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category */}
          <span
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color: 'var(--primary)' }}
          >
            {story.category || 'Story'}
          </span>

          <h3
            className="font-poppins font-bold text-base mt-1 mb-2 line-clamp-2 leading-snug"
            style={{ color: 'var(--text-primary)' }}
          >
            {story.title}
          </h3>

          <p className="text-sm leading-relaxed line-clamp-2 mb-3" style={{ color: 'var(--text-secondary)' }}>
            {story.content?.replace(/<[^>]+>/g, '').substring(0, 100)}...
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--text-secondary)' }}>
              <span className="flex items-center gap-1">
                <FiClock size={11} /> {story.readingTime || '5'} min
              </span>
              <span className="flex items-center gap-1">
                <FiEye size={11} /> {story.views || 0}
              </span>
            </div>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background: 'var(--border)', color: 'var(--primary)' }}
            >
              Read →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
