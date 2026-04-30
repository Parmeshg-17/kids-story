import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiPlus, FiTrash2, FiSave, FiEdit2 } from 'react-icons/fi'
import { getAllCategories, addCategory, updateCategory, deleteCategory } from '../firebase/db'
import toast from 'react-hot-toast'

const THEMES = ['default', 'kids', 'horror', 'moral', 'royal']

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

const emptyForm = { name: '', slug: '', theme: 'kids', image: '', status: true }

export default function CategoryManagement() {
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)

  const load = async () => setCategories(await getAllCategories())
  useEffect(() => { load() }, [])

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const handleNameChange = (v) => {
    set('name', v)
    if (!editId) set('slug', slugify(v))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    if (!form.name) return toast.error('Name required')
    setSaving(true)
    if (editId) {
      await updateCategory(editId, form)
      toast.success('✅ Category updated')
    } else {
      await addCategory(form)
      toast.success('✅ Category added')
    }
    setForm(emptyForm)
    setEditId(null)
    await load()
    setSaving(false)
  }

  const handleEdit = (cat) => {
    setForm(cat)
    setEditId(cat.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete category "${name}"?`)) return
    await deleteCategory(id)
    toast.success('🗑️ Deleted')
    load()
  }

  const inputStyle = { background: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.15)', color: 'white' }

  return (
    <div>
      <h1 className="text-2xl font-extrabold font-poppins text-white mb-8">Category Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          <div className="glass-card p-6 space-y-4" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
            <h2 className="font-bold text-white text-base">{editId ? '✏️ Edit Category' : '➕ Add Category'}</h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="input-float">
                <label className="text-white/60">Category Name</label>
                <input value={form.name} onChange={e => handleNameChange(e.target.value)}
                  placeholder="e.g. Bedtime Stories" required style={inputStyle} />
              </div>

              <div className="input-float">
                <label className="text-white/60">Slug</label>
                <input value={form.slug} onChange={e => set('slug', e.target.value)}
                  placeholder="bedtime-stories" style={inputStyle} />
              </div>

              <div className="input-float">
                <label className="text-white/60">Theme</label>
                <select value={form.theme} onChange={e => set('theme', e.target.value)} style={inputStyle}>
                  {THEMES.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                </select>
              </div>

              <div className="input-float">
                <label className="text-white/60">Category Image URL (800x600)</label>
                <input value={form.image} onChange={e => set('image', e.target.value)}
                  placeholder="https://..." type="url" style={inputStyle} />
                {form.image && (
                  <div className="mt-2 rounded-xl overflow-hidden" style={{ maxHeight: 120 }}>
                    <img src={form.image} alt="preview" className="w-full object-cover"
                      onError={e => e.target.style.display = 'none'} />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="text-white/60 text-sm">Active</label>
                <label className="toggle-switch">
                  <input type="checkbox" checked={form.status} onChange={e => set('status', e.target.checked)} />
                  <span className="toggle-slider" />
                </label>
              </div>

              <div className="flex gap-3">
                <motion.button whileTap={{ scale: 0.97 }} type="submit"
                  className="btn-primary flex-1 py-3 flex items-center justify-center gap-2" disabled={saving}>
                  {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><FiSave size={15} /> Save</>}
                </motion.button>
                {editId && (
                  <button type="button" onClick={() => { setForm(emptyForm); setEditId(null) }}
                    className="px-4 py-3 rounded-xl text-sm font-bold text-white/50 hover:text-white"
                    style={{ background: 'rgba(255,255,255,0.07)' }}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* List */}
        <div className="lg:col-span-3 space-y-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 p-4 rounded-2xl border"
              style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}
            >
              {cat.image && <img src={cat.image} alt={cat.name} className="w-12 h-12 rounded-xl object-cover shrink-0" />}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white text-sm truncate">{cat.name}</p>
                <p className="text-white/30 text-xs">{cat.slug} • <span className="capitalize">{cat.theme}</span></p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${cat.status !== false ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {cat.status !== false ? 'Active' : 'Inactive'}
              </span>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(cat)} className="p-1.5 rounded-lg text-blue-400 hover:bg-blue-500/10">
                  <FiEdit2 size={14} />
                </button>
                <button onClick={() => handleDelete(cat.id, cat.name)} className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10">
                  <FiTrash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}
          {categories.length === 0 && (
            <div className="text-center py-12 text-white/30">No categories yet</div>
          )}
        </div>
      </div>
    </div>
  )
}
