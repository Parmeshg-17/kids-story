import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCookieBite } from 'react-icons/fa'
import CookiePreferencesModal from './CookiePreferencesModal'

export default function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('kidsstory_cookie_consent')
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const saveConsent = (preferences) => {
    localStorage.setItem('kidsstory_cookie_consent', JSON.stringify({
      ...preferences,
      timestamp: Date.now()
    }))
    setShowBanner(false)
  }

  const handleAcceptAll = () => {
    saveConsent({ essential: true, analytics: true, advertising: true })
  }

  const handleRejectNonEssential = () => {
    saveConsent({ essential: true, analytics: false, advertising: false })
  }

  if (!showBanner && !showModal) return null

  return (
    <>
      <AnimatePresence>
        {showBanner && (
          <motion.div
            role="region"
            aria-label="Cookie consent banner"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-4 left-4 right-4 md:left-8 md:right-auto md:max-w-lg z-40 p-5 rounded-2xl shadow-2xl glass-card border"
            style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--border)', color: 'var(--primary)' }}>
                <FaCookieBite size={22} />
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="font-poppins font-extrabold text-sm" style={{ color: 'var(--text-primary)' }}>
                  We Value Your Privacy
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  We use cookies and browser local storage to save your reading bookmarks, theme preferences, and deliver personalized ads. Learn more in our{' '}
                  <Link to="/cookie-policy" className="underline font-bold hover:opacity-80" style={{ color: 'var(--primary)' }}>
                    Cookie Policy
                  </Link>.
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <button
                    onClick={handleAcceptAll}
                    className="btn-primary py-1.5 px-4 text-xs font-bold"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={handleRejectNonEssential}
                    className="py-1.5 px-3.5 rounded-full text-xs font-bold border transition-all hover:opacity-80"
                    style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                  >
                    Reject Optional
                  </button>
                  <button
                    onClick={() => setShowModal(true)}
                    className="text-xs font-bold underline px-2 py-1 transition-all hover:opacity-80"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Preferences
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CookiePreferencesModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={saveConsent}
      />
    </>
  )
}
