import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FiShieldOff, FiHome, FiLock } from 'react-icons/fi'

export default function ForbiddenPage() {
  return (
    <>
      <Helmet>
        <title>403 Access Denied - KidsStory</title>
      </Helmet>
      <main className="min-h-[80vh] flex items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full glass-card p-8 space-y-6"
        >
          <motion.div
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="w-20 h-20 rounded-3xl mx-auto flex items-center justify-center text-red-500 bg-red-500/10"
          >
            <FiShieldOff size={40} />
          </motion.div>

          <div>
            <h1 className="text-4xl font-extrabold font-poppins gradient-text mb-2">403</h1>
            <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              Access Forbidden
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              You do not have administrative permissions to view this protected page.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link to="/admin/login" className="btn-primary py-2.5 px-6 text-sm flex items-center justify-center gap-2">
              <FiLock size={16} /> Admin Login
            </Link>
            <Link
              to="/"
              className="px-6 py-2.5 rounded-full font-bold text-sm border-2 transition-all flex items-center justify-center gap-2 hover:opacity-80"
              style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}
            >
              <FiHome size={16} /> Go Home
            </Link>
          </div>
        </motion.div>
      </main>
    </>
  )
}
