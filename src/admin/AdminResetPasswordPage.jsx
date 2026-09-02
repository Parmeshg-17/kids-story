import React, { useState } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FiLock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import { GiOpenBook } from 'react-icons/gi'
import { completePasswordReset } from '../firebase/auth'
import toast from 'react-hot-toast'

export default function AdminResetPasswordPage() {
  const [params] = useSearchParams()
  const oobCode = params.get('oobCode')
  const navigate = useNavigate()

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [completed, setCompleted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newPassword || newPassword.length < 6) {
      toast.error('Password must be at least 6 characters.')
      return
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match.')
      return
    }

    setLoading(true)
    const { success, error } = await completePasswordReset(oobCode, newPassword)
    setLoading(false)

    if (success) {
      setCompleted(true)
      toast.success('Password updated successfully!')
    } else {
      toast.error(error || 'Invalid or expired password reset link.')
    }
  }

  return (
    <>
      <Helmet><title>Reset Admin Password - KidsStory</title></Helmet>
      <div className="min-h-screen flex items-center justify-center px-4"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md glass-card p-8"
          style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3"
              style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}>
              <GiOpenBook className="text-white text-2xl" />
            </div>
            <h1 className="text-2xl font-extrabold font-poppins text-white">Reset Password</h1>
            <p className="text-white/50 text-sm">Choose a new password for your admin account</p>
          </div>

          {!oobCode ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mx-auto">
                <FiAlertCircle size={28} />
              </div>
              <p className="text-xs text-white/70">
                Invalid reset request. Missing password reset action token.
              </p>
              <Link to="/admin/login" className="btn-primary inline-block px-6 py-2 text-xs font-bold">
                Return to Login
              </Link>
            </div>
          ) : completed ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <FiCheckCircle size={28} />
              </div>
              <p className="text-sm font-bold text-white">Password Reset Successful!</p>
              <p className="text-xs text-white/60">You can now sign in using your new password.</p>
              <Link to="/admin/login" className="btn-primary block w-full py-2.5 text-xs font-bold text-center">
                Sign In Now
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="input-float">
                <label className="text-white/60">New Password</label>
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10"
                    style={{ background: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.15)', color: 'white' }}
                  />
                </div>
              </div>

              <div className="input-float">
                <label className="text-white/60">Confirm New Password</label>
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10"
                    style={{ background: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.15)', color: 'white' }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3 text-sm font-bold flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Update Password'
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </>
  )
}
