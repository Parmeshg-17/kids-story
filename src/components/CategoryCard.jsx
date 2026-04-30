import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const THEME_CLASSES = {
  kids: 'theme-badge-kids',
  horror: 'theme-badge-horror',
  moral: 'theme-badge-moral',
  royal: 'theme-badge-royal',
  default: 'theme-badge-default',
}

export default function CategoryCard({ category, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      whileHover={{ y: -5, scale: 1.03 }}
    >
      <Link to={`/category/${category.slug}`} className="block glass-card card-shimmer overflow-hidden group">
        {/* Image */}
        <div className="relative h-40 overflow-hidden">
          {category.image ? (
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div
              className={`w-full h-full ${THEME_CLASSES[category.theme] || THEME_CLASSES.default} flex items-center justify-center`}
            >
              <span className="text-5xl">📚</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          {/* Theme Badge */}
          <span
            className={`absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full text-white capitalize ${THEME_CLASSES[category.theme] || THEME_CLASSES.default}`}
          >
            {category.theme || 'default'}
          </span>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-poppins font-bold text-base mb-1" style={{ color: 'var(--text-primary)' }}>
            {category.name}
          </h3>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            Explore {category.name} stories
          </p>
        </div>
      </Link>
    </motion.div>
  )
}
