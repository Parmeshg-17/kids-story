import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiHome, FiPlusSquare, FiList, FiTag, FiShare2,
  FiImage, FiDollarSign, FiLogOut, FiMenu, FiX
} from 'react-icons/fi'
import { GiOpenBook } from 'react-icons/gi'
import { signOut } from '../firebase/auth'
import { useState } from 'react'
import toast from 'react-hot-toast'

const NAV_ITEMS = [
  { to: '/admin/dashboard', icon: FiHome, label: 'Dashboard' },
  { to: '/admin/stories/add', icon: FiPlusSquare, label: 'Add Story' },
  { to: '/admin/stories', icon: FiList, label: 'Manage Stories' },
  { to: '/admin/categories', icon: FiTag, label: 'Categories' },
  { to: '/admin/social', icon: FiShare2, label: 'Social Media' },
  { to: '/admin/homepage', icon: FiImage, label: 'Homepage' },
  { to: '/admin/ads', icon: FiDollarSign, label: 'Ads / AdSense' },
]

export default function AdminLayout() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    await signOut()
    toast.success('👋 Logged out!')
    navigate('/admin/login')
  }

  const Sidebar = () => (
    <div className="admin-sidebar h-full flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}>
            <GiOpenBook className="text-white text-lg" />
          </div>
          <div>
            <p className="font-poppins font-extrabold text-white text-sm">KidsStory</p>
            <p className="text-white/40 text-xs">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/admin/stories'}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-bold ${
                isActive
                  ? 'bg-white/15 text-white shadow-lg'
                  : 'text-white/50 hover:text-white hover:bg-white/8'
              }`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-sm font-bold text-red-400 hover:bg-red-500/10 transition-all"
        >
          <FiLogOut size={17} /> Logout
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#0f172a' }}>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 shrink-0 h-full">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="w-64 h-full"><Sidebar /></div>
          <div className="flex-1 bg-black/50" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-white/60 hover:text-white"
          >
            <FiMenu size={22} />
          </button>
          <h2 className="font-poppins font-bold text-white text-base">Admin Dashboard</h2>
          <div />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
