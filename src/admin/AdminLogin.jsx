import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi'
import { GiOpenBook } from 'react-icons/gi'
import { signIn } from '../firebase/auth'
import toast from 'react-hot-toast'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { user, error } = await signIn(email, password)
    if (user) {
      toast.success('✅ Welcome back, Admin!')
      navigate('/admin/dashboard')
    } else {
      toast.error('❌ ' + (error || 'Login failed'))
    }
    setLoading(false)
  }

  return (
    <>
      <Helmet><title>Admin Login - KidsStory</title></Helmet>
      <div className="min-h-screen flex items-center justify-center px-4"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)' }}>
        {/* Floating particles */}
        {['📚', '⭐', '🌟', '✨'].map((e, i) => (
          <motion.span key={i} className="absolute text-3xl opacity-20"
            style={{ top: `${15 + i * 20}%`, left: i % 2 === 0 ? `${5 + i * 10}%` : `${70 + i * 5}%` }}
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8 }}
          >
            {e}
          </motion.span>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="glass-card p-8" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3"
                style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}>
                <GiOpenBook className="text-white text-2xl" />
              </div>
              <h1 className="text-2xl font-extrabold font-poppins text-white">Admin Panel</h1>
              <p className="text-white/50 text-sm">KidsStory Management</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="input-float">
                <label className="text-white/60">Email Address</label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                  <input
                    id="admin-email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="admin@kidsstory.com"
                    required
                    className="pl-10"
                    style={{ background: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.15)', color: 'white' }}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="input-float">
                <label className="text-white/60">Password</label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                  <input
                    id="admin-password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="pl-10"
                    style={{ background: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.15)', color: 'white' }}
                  />
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3 flex items-center justify-center gap-2 text-base"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <><FiLogIn size={18} /> Sign In</>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  )
}
