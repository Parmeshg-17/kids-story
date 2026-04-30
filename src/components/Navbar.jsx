import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSun, FiMoon, FiSearch, FiMenu, FiX, FiBookmark } from 'react-icons/fi'
import { GiOpenBook } from 'react-icons/gi'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { darkMode, toggleDark } = useTheme()
  const { isAdmin } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchVal, setSearchVal] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchVal.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchVal.trim())}`)
      setSearchOpen(false)
      setSearchVal('')
    }
  }

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/stories', label: 'Stories' },
    { to: '/bookmarks', label: 'Bookmarks' },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'nav-glass shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}
              >
                <GiOpenBook className="text-white text-lg" />
              </motion.div>
              <span className="font-poppins font-800 text-xl gradient-text font-extrabold">
                KidsStory
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="font-nunito font-700 text-sm transition-all duration-200 hover:opacity-70"
                  style={{ color: 'var(--text-primary)', fontWeight: 700 }}
                >
                  {link.label}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  to="/admin/dashboard"
                  className="btn-primary text-sm px-4 py-1.5"
                >
                  Admin
                </Link>
              )}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Search Toggle */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setSearchOpen(v => !v)}
                className="w-9 h-9 rounded-xl glass-card flex items-center justify-center"
                style={{ color: 'var(--text-primary)' }}
                aria-label="Search"
              >
                <FiSearch size={17} />
              </motion.button>

              {/* Bookmarks */}
              <Link to="/bookmarks">
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-xl glass-card hidden md:flex items-center justify-center"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <FiBookmark size={17} />
                </motion.div>
              </Link>

              {/* Dark Mode Toggle */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleDark}
                className="w-9 h-9 rounded-xl glass-card flex items-center justify-center"
                style={{ color: 'var(--text-primary)' }}
                aria-label="Toggle dark mode"
              >
                <AnimatePresence mode="wait">
                  {darkMode ? (
                    <motion.span key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.3 }}>
                      <FiSun size={17} />
                    </motion.span>
                  ) : (
                    <motion.span key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.3 }}>
                      <FiMoon size={17} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Mobile Menu */}
              <button
                onClick={() => setMenuOpen(v => !v)}
                className="md:hidden w-9 h-9 rounded-xl glass-card flex items-center justify-center"
                style={{ color: 'var(--text-primary)' }}
              >
                {menuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t overflow-hidden"
              style={{ borderColor: 'var(--border)' }}
            >
              <form onSubmit={handleSearch} className="max-w-2xl mx-auto px-4 py-3 flex gap-3">
                <input
                  autoFocus
                  value={searchVal}
                  onChange={e => setSearchVal(e.target.value)}
                  placeholder="Search stories..."
                  className="flex-1 rounded-xl px-4 py-2 text-sm outline-none"
                  style={{
                    background: 'var(--card-bg)',
                    border: '1.5px solid var(--border)',
                    color: 'var(--text-primary)'
                  }}
                />
                <button type="submit" className="btn-primary px-5 py-2 text-sm">
                  Search
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 w-72 z-50 shadow-2xl p-8 flex flex-col gap-6 md:hidden"
            style={{ background: 'var(--card-bg)', backdropFilter: 'blur(20px)' }}
          >
            <div className="flex justify-between items-center">
              <span className="font-poppins font-extrabold text-lg gradient-text">Menu</span>
              <button onClick={() => setMenuOpen(false)} style={{ color: 'var(--text-primary)' }}>
                <FiX size={22} />
              </button>
            </div>
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="font-nunito font-bold text-base py-2 border-b"
                style={{ color: 'var(--text-primary)', borderColor: 'var(--border)' }}
              >
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <Link to="/admin/dashboard" onClick={() => setMenuOpen(false)} className="btn-primary text-center">
                Admin Panel
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-16" />
    </>
  )
}
