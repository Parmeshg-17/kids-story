import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiX, FiCheck, FiShield } from 'react-icons/fi'

export default function CookiePreferencesModal({ isOpen, onClose, onSave }) {
  const [preferences, setPreferences] = useState(() => {
    const saved = localStorage.getItem('kidsstory_cookie_consent')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) {}
    }
    return { essential: true, analytics: false, advertising: false }
  })

  if (!isOpen) return null

  const handleSave = () => {
    onSave(preferences)
    onClose()
  }

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-modal-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-md glass-card p-6 space-y-6"
        style={{ background: 'var(--card-bg)', color: 'var(--text-primary)' }}
      >
        <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2">
            <FiShield size={20} className="text-pink-500" />
            <h2 id="cookie-modal-title" className="font-poppins font-extrabold text-lg">
              Cookie Preferences
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:opacity-70"
            aria-label="Close preferences"
          >
            <FiX size={20} />
          </button>
        </div>

        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Manage your cookie preferences below. Essential cookies are required to store your reading theme, bookmarks, and font size choices.
        </p>

        <div className="space-y-4">
          {/* Essential */}
          <div className="flex items-center justify-between p-3 rounded-xl border" style={{ borderColor: 'var(--border)' }}>
            <div>
              <p className="font-bold text-sm">Essential Storage</p>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                Required for dark mode, bookmarks & font preferences.
              </p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-600">
              Always Active
            </span>
          </div>

          {/* Analytics */}
          <div className="flex items-center justify-between p-3 rounded-xl border" style={{ borderColor: 'var(--border)' }}>
            <div>
              <p className="font-bold text-sm">Analytics Cookies</p>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                Allows aggregated data for performance analysis.
              </p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={e => setPreferences(p => ({ ...p, analytics: e.target.checked }))}
              />
              <span className="toggle-slider" />
            </label>
          </div>

          {/* Advertising */}
          <div className="flex items-center justify-between p-3 rounded-xl border" style={{ borderColor: 'var(--border)' }}>
            <div>
              <p className="font-bold text-sm">Advertising Cookies</p>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                Used by Google AdSense to serve relevant ads.
              </p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={preferences.advertising}
                onChange={e => setPreferences(p => ({ ...p, advertising: e.target.checked }))}
              />
              <span className="toggle-slider" />
            </label>
          </div>
        </div>

        <div className="flex gap-3 justify-end pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold border"
            style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="btn-primary px-5 py-2 text-xs flex items-center gap-1.5"
          >
            <FiCheck size={14} /> Save Preferences
          </button>
        </div>
      </motion.div>
    </div>
  )
}
