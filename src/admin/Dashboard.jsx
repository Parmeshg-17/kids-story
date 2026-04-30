import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiBook, FiTag, FiEye, FiTrendingUp, FiPlus } from 'react-icons/fi'
import { getAllStories, getAllCategories } from '../firebase/db'

function StatCard({ icon: Icon, label, value, color, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card p-6"
      style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-1">{label}</p>
          <p className="text-3xl font-extrabold text-white">{value}</p>
        </div>
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: color }}>
          <Icon className="text-white" size={22} />
        </div>
      </div>
    </motion.div>
  )
}

export default function Dashboard() {
  const [stories, setStories] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getAllStories(), getAllCategories()]).then(([s, c]) => {
      setStories(s)
      setCategories(c)
      setLoading(false)
    })
  }, [])

  const totalViews = stories.reduce((sum, s) => sum + (s.views || 0), 0)
  const recent = stories.slice(0, 8)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold font-poppins text-white">Dashboard</h1>
          <p className="text-white/40 text-sm">Welcome back, Admin 👋</p>
        </div>
        <Link to="/admin/stories/add" className="btn-primary flex items-center gap-2">
          <FiPlus size={16} /> Add Story
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={FiBook} label="Total Stories" value={stories.length} color="rgba(255,107,157,0.6)" index={0} />
        <StatCard icon={FiTag} label="Categories" value={categories.length} color="rgba(192,132,252,0.6)" index={1} />
        <StatCard icon={FiEye} label="Total Views" value={totalViews.toLocaleString()} color="rgba(52,211,153,0.6)" index={2} />
        <StatCard icon={FiTrendingUp} label="Featured" value={stories.filter(s => s.featured).length} color="rgba(251,191,36,0.6)" index={3} />
      </div>

      {/* Recent Stories */}
      <div>
        <h2 className="font-poppins font-bold text-white text-lg mb-4">Recent Stories</h2>
        <div className="rounded-2xl overflow-hidden border" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                {['Title', 'Category', 'Language', 'Views', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-white/40 font-bold uppercase text-xs tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i} className="border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                    {Array(5).fill(0).map((__, j) => (
                      <td key={j} className="px-4 py-3"><div className="skeleton h-4 w-24 rounded" /></td>
                    ))}
                  </tr>
                ))
              ) : recent.map((story) => (
                <tr key={story.id} className="border-t hover:bg-white/5 transition-colors" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                  <td className="px-4 py-3 text-white font-medium truncate max-w-[200px]">{story.title}</td>
                  <td className="px-4 py-3 text-white/50">{story.category}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-0.5 rounded-full font-bold"
                      style={{ background: story.language === 'Hindi' ? 'rgba(251,146,60,0.2)' : 'rgba(96,165,250,0.2)', color: story.language === 'Hindi' ? '#fb923c' : '#60a5fa' }}>
                      {story.language}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-white/50">{story.views || 0}</td>
                  <td className="px-4 py-3">
                    <Link to={`/admin/stories/edit/${story.id}`} className="text-xs font-bold px-3 py-1 rounded-lg"
                      style={{ background: 'rgba(255,107,157,0.15)', color: 'var(--primary)' }}>
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
