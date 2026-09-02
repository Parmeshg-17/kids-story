import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiUser, FiLock, FiShield, FiSave, FiCheckCircle } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { updateUserPassword } from '../firebase/auth'
import toast from 'react-hot-toast'

export default function AdminAccountSettings() {
  const { user } = useAuth()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleUpdatePassword = async (e) => {
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
    const { success, error } = await updateUserPassword(newPassword)
    setLoading(false)

    if (success) {
      toast.success('✅ Account password updated successfully!')
      setNewPassword('')
      setConfirmPassword('')
    } else {
      toast.error(error || 'Failed to update password. You may need to re-login.')
    }
  }

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold font-poppins text-white">Account Settings</h1>
        <p className="text-white/40 text-sm">Manage administrator credentials & session info</p>
      </div>

      {/* Profile Overview */}
      <div className="glass-card p-6 border border-white/10 space-y-4" style={{ background: 'rgba(255,255,255,0.03)' }}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-pink-500/20 text-pink-400">
            <FiUser size={24} />
          </div>
          <div>
            <p className="font-bold text-white text-base">{user?.email || 'admin@kidsstory.com'}</p>
            <p className="text-xs text-white/40">Role: Administrator (Full Access)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/10 text-xs">
          <div>
            <span className="text-white/40">User ID: </span>
            <span className="font-mono text-white/80">{user?.uid || 'N/A'}</span>
          </div>
          <div>
            <span className="text-white/40">Email Status: </span>
            <span className="text-emerald-400 font-bold">
              {user?.emailVerified ? 'Verified' : 'Active Admin Session'}
            </span>
          </div>
        </div>
      </div>

      {/* Change Password Form */}
      <div className="glass-card p-6 border border-white/10 space-y-6" style={{ background: 'rgba(255,255,255,0.03)' }}>
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <FiLock size={18} className="text-pink-400" />
          <h2 className="font-bold text-white text-base">Change Admin Password</h2>
        </div>

        <form onSubmit={handleUpdatePassword} className="space-y-4 max-w-md">
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
            className="btn-primary py-2.5 px-6 text-sm font-bold flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <><FiSave size={16} /> Update Password</>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
