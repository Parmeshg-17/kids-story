import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function EmptyState({
  icon = '📭',
  title = 'No items found',
  description = 'There are no items to display at the moment.',
  actionLabel,
  actionTo,
  onActionClick
}) {
  return (
    <div className="text-center py-20 px-4 glass-card my-8">
      <motion.div
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="text-6xl mb-4"
        aria-hidden="true"
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-bold font-poppins mb-2" style={{ color: 'var(--text-primary)' }}>
        {title}
      </h3>
      <p className="text-sm max-w-md mx-auto mb-6" style={{ color: 'var(--text-secondary)' }}>
        {description}
      </p>
      {actionLabel && (
        actionTo ? (
          <Link to={actionTo} className="btn-primary px-6 py-2.5 text-sm inline-block">
            {actionLabel}
          </Link>
        ) : (
          <button onClick={onActionClick} className="btn-primary px-6 py-2.5 text-sm inline-block">
            {actionLabel}
          </button>
        )
      )}
    </div>
  )
}
