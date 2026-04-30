import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiEdit2, FiTrash2, FiPlus, FiSearch } from 'react-icons/fi'
import { getAllStories, deleteStory } from '../firebase/db'
import toast from 'react-hot-toast'

export default function ManageStories() {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const load = async () => {
    setLoading(true)
    const all = await getAllStories()
    setStories(all)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return
    await deleteStory(id)
    toast.success('🗑️ Story deleted')
    load()
  }

  const filtered = stories.filter(s =>
    s.title?.toLowerCase().includes(search.toLowerCase()) ||
    s.category?.toLowerCase().includes(search.toLowerCase())
  )

  const inputStyle = { background: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.15)', color: 'white' }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-extrabold font-poppins text-white">Manage Stories</h1>
        <Link to="/admin/stories/add" className="btn-primary flex items-center gap-2 text-sm">
          <FiPlus size={16} /> Add Story
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search stories..." className="w-full pl-10 rounded-xl py-2.5 text-sm outline-none"
          style={inputStyle} />
      </div>

      <div className="rounded-2xl overflow-hidden border" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
              {['Title', 'Category', 'Language', 'Views', 'Status', 'Actions'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-white/40 font-bold uppercase text-xs tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array(6).fill(0).map((_, i) => (
                <tr key={i} className="border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                  {Array(6).fill(0).map((_, j) => (
                    <td key={j} className="px-4 py-3"><div className="skeleton h-4 w-20 rounded" /></td>
                  ))}
                </tr>
              ))
            ) : filtered.map(story => (
              <motion.tr
                key={story.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-t hover:bg-white/5 transition-colors"
                style={{ borderColor: 'rgba(255,255,255,0.05)' }}
              >
                <td className="px-4 py-3 text-white font-medium max-w-[200px]">
                  <span className="truncate block">{story.title}</span>
                </td>
                <td className="px-4 py-3 text-white/50">{story.category}</td>
                <td className="px-4 py-3">
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold"
                    style={{ background: story.language === 'Hindi' ? 'rgba(251,146,60,0.2)' : 'rgba(96,165,250,0.2)', color: story.language === 'Hindi' ? '#fb923c' : '#60a5fa' }}>
                    {story.language}
                  </span>
                </td>
                <td className="px-4 py-3 text-white/50">{story.views || 0}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${story.status ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {story.status ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link to={`/admin/stories/edit/${story.id}`}
                      className="p-1.5 rounded-lg text-blue-400 hover:bg-blue-500/10 transition-colors">
                      <FiEdit2 size={15} />
                    </Link>
                    <button onClick={() => handleDelete(story.id, story.title)}
                      className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors">
                      <FiTrash2 size={15} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        {!loading && filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/30">No stories found</p>
          </div>
        )}
      </div>
    </div>
  )
}
