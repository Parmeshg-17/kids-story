import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiX, FiMail, FiSend, FiCheckCircle } from 'react-icons/fi'
import { resetPassword } from '../firebase/auth'
import toast from 'react-hot-toast'

export default function ForgotPasswordModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    const { success, error } = await resetPassword(email.trim())
    setLoading(false)
    if (success) {
      setSent(true)
      toast.success('Password reset link sent!')
    } else {
      toast.error(error || 'Failed to send reset email.')
    }
  }

  return (
    <div
      role="dialog"
      aria-labelledby="forgot-password-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-md glass-card p-6 space-y-6"
        style={{ background: '#1e293b', borderColor: 'rgba(255,255,255,0.1)', color: 'white' }}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h2 id="forgot-password-title" className="font-poppins font-bold text-lg text-white">
            Reset Admin Password
          </h2>
          <button onClick={onClose} className="p-1 rounded-lg text-white/60 hover:text-white">
            <FiX size={20} />
          </button>
        </div>

        {sent ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <FiCheckCircle size={28} />
            </div>
            <p className="text-sm text-white/90">
              If an admin account exists for <span className="font-bold text-pink-400">{email}</span>, a password reset link has been dispatched to your email address.
            </p>
            <button
              onClick={onClose}
              className="btn-primary px-6 py-2 text-xs font-bold w-full"
            >
              Back to Sign In
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-xs text-white/60">
              Enter your registered administrator email address below. We will send you an email containing instructions to reset your password.
            </p>

            <div className="input-float">
              <label className="text-white/60">Admin Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@kidsstory.com"
                  className="pl-10"
                  style={{ background: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.15)', color: 'white' }}
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-white/60 hover:text-white border border-white/10"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex-1 py-2.5 text-xs font-bold flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <><FiSend size={14} /> Send Reset Link</>
                )}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  )
}
