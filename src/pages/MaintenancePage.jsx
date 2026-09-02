import React from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { GiOpenBook } from 'react-icons/gi'
import { FiClock } from 'react-icons/fi'

export default function MaintenancePage({ message }) {
  return (
    <>
      <Helmet>
        <title>Maintenance - KidsStory</title>
      </Helmet>
      <main className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(135deg, var(--bg-from) 0%, var(--bg-to) 100%)' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg w-full glass-card p-8 text-center space-y-6"
        >
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto" style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}>
            <GiOpenBook className="text-white text-3xl" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold font-poppins gradient-text">
              We'll Be Back Soon!
            </h1>
            <p className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
              KidsStory is currently undergoing scheduled maintenance.
            </p>
          </div>

          <div className="p-4 rounded-2xl border text-xs leading-relaxed space-y-2" style={{ background: 'rgba(0,0,0,0.03)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
            <div className="flex items-center justify-center gap-1.5 font-bold" style={{ color: 'var(--primary)' }}>
              <FiClock size={16} /> Maintenance Notice
            </div>
            <p>{message || "We are adding exciting new stories and improving your reading experience! Please check back in a few minutes."}</p>
          </div>

          <p className="text-xs text-center" style={{ color: 'var(--text-secondary)' }}>
            Thank you for your patience! 🌟
          </p>
        </motion.div>
      </main>
    </>
  )
}
