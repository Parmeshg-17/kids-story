import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiWifiOff, FiCheckCircle } from 'react-icons/fi'
import { useNetworkStatus } from '../hooks/useNetworkStatus'

export default function OfflineBanner() {
  const { isOnline, wasOffline } = useNetworkStatus()

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-50 py-2.5 px-4 bg-amber-600 text-white text-xs sm:text-sm font-bold text-center flex items-center justify-center gap-2 shadow-md"
        >
          <FiWifiOff size={16} />
          <span>You are currently offline. Story reading & bookmarked stories remain available.</span>
        </motion.div>
      )}

      {isOnline && wasOffline && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-50 py-2.5 px-4 bg-emerald-600 text-white text-xs sm:text-sm font-bold text-center flex items-center justify-center gap-2 shadow-md"
        >
          <FiCheckCircle size={16} />
          <span>Internet connection restored! Syncing updates...</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
