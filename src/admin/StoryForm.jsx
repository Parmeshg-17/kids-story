import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiSave, FiArrowLeft } from 'react-icons/fi'
import { addStory, updateStory, getStory, getAllCategories } from '../firebase/db'
import toast from 'react-hot-toast'

const THEMES = ['default', 'kids', 'horror', 'moral', 'royal']
const LANGS = ['English', 'Hindi']

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9\u0900-\u097F]+/g, '-').replace(/^-|-$/g, '')
}

function calcReadingTime(text) {
  const words = text?.replace(/<[^>]+>/g, '').split(/\s+/).length || 0
  return Math.max(1, Math.ceil(words / 200))
}

function ImageField({ label, id, value, onChange, size, format = 'JPG/PNG' }) {
  return (
    <div className="input-float">
      <label htmlFor={id}>{label}</label>
      <input id={id} type="url" value={value} onChange={e => onChange(e.target.value)}
        placeholder={`https://example.com/image.jpg`} />
      <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
        Recommended: {size} • Format: {format}
      </p>
      {value && (
        <div className="mt-2 rounded-xl overflow-hidden" style={{ maxHeight: 160 }}>
          <img src={value} alt="preview" className="w-full object-cover"
            onError={e => e.target.style.display = 'none'} />
        </div>
      )}
    </div>
  )
}

export default function StoryForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id

  const [categories, setCategories] = useState([])
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    title: '', slug: '', category: '', categorySlug: '', theme: 'kids',
    language: 'English', banner: '', thumbnail: '', content: '',
    metaTitle: '', metaDescription: '', keywords: '', readingTime: 5,
    featured: false, status: true,
  })

  useEffect(() => {
    getAllCategories().then(c => setCategories(c.filter(cat => cat.status !== false)))
    if (isEdit) {
      getStory(id).then(s => {
        if (s) setForm(s)
      })
    }
  }, [id, isEdit])

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const handleTitleChange = (v) => {
    set('title', v)
    if (!isEdit) set('slug', slugify(v))
    set('metaTitle', v + ' - KidsStory')
    set('readingTime', calcReadingTime(form.content))
  }

  const handleCategoryChange = (slug) => {
    const cat = categories.find(c => c.slug === slug)
    set('categorySlug', slug)
    set('category', cat?.name || '')
    set('theme', cat?.theme || 'kids')
  }

  const handleContentChange = (v) => {
    set('content', v)
    set('readingTime', calcReadingTime(v))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    if (!form.title || !form.content) {
      toast.error('Title and content are required')
      return
    }
    setSaving(true)
    try {
      if (isEdit) {
        await updateStory(id, form)
        toast.success('✅ Story updated!')
      } else {
        await addStory(form)
        toast.success('✅ Story added!')
        navigate('/admin/stories')
      }
    } catch (e) {
      toast.error('Error: ' + e.message)
    }
    setSaving(false)
  }

  const inputStyle = { background: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.15)', color: 'white' }

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl flex items-center justify-center text-white/60 hover:text-white"
          style={{ background: 'rgba(255,255,255,0.07)' }}>
          <FiArrowLeft size={18} />
        </button>
        <h1 className="text-2xl font-extrabold font-poppins text-white">
          {isEdit ? 'Edit Story' : 'Add New Story'}
        </h1>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-5">
          <div className="glass-card p-6 space-y-5" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
            <div className="input-float">
              <label className="text-white/60">Story Title *</label>
              <input id="story-title" value={form.title} onChange={e => handleTitleChange(e.target.value)}
                placeholder="Enter story title..." required style={inputStyle} />
            </div>

            <div className="input-float">
              <label className="text-white/60">Slug (SEO URL)</label>
              <input id="story-slug" value={form.slug} onChange={e => set('slug', e.target.value)}
                placeholder="my-story-slug" style={inputStyle} />
            </div>

            <div className="input-float">
              <label className="text-white/60">Content *</label>
              <textarea id="story-content" value={form.content} onChange={e => handleContentChange(e.target.value)}
                rows={16} placeholder="Write your story here... (HTML is supported)" required
                style={{ ...inputStyle, resize: 'vertical' }} />
            </div>
          </div>

          {/* SEO */}
          <div className="glass-card p-6 space-y-5" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
            <h3 className="font-bold text-white text-base">🔍 SEO Settings</h3>
            <div className="input-float">
              <label className="text-white/60">Meta Title</label>
              <input id="meta-title" value={form.metaTitle} onChange={e => set('metaTitle', e.target.value)}
                placeholder="SEO title..." style={inputStyle} />
            </div>
            <div className="input-float">
              <label className="text-white/60">Meta Description</label>
              <textarea id="meta-desc" value={form.metaDescription} onChange={e => set('metaDescription', e.target.value)}
                rows={3} placeholder="160 chars max description..." style={{ ...inputStyle, resize: 'none' }} />
            </div>
            <div className="input-float">
              <label className="text-white/60">Keywords</label>
              <input id="meta-keywords" value={form.keywords} onChange={e => set('keywords', e.target.value)}
                placeholder="kids story, hindi, bedtime..." style={inputStyle} />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="glass-card p-6 space-y-5" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
            <h3 className="font-bold text-white text-base">⚙️ Story Settings</h3>

            <div className="input-float">
              <label className="text-white/60">Category</label>
              <select id="story-category" value={form.categorySlug} onChange={e => handleCategoryChange(e.target.value)} style={inputStyle}>
                <option value="">Select Category</option>
                {categories.map(c => <option key={c.id} value={c.slug}>{c.name}</option>)}
              </select>
            </div>

            <div className="input-float">
              <label className="text-white/60">Language</label>
              <select id="story-language" value={form.language} onChange={e => set('language', e.target.value)} style={inputStyle}>
                {LANGS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>

            <div className="input-float">
              <label className="text-white/60">Theme</label>
              <select id="story-theme" value={form.theme} onChange={e => set('theme', e.target.value)} style={inputStyle}>
                {THEMES.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
              </select>
            </div>

            <div className="input-float">
              <label className="text-white/60">Reading Time (min)</label>
              <input type="number" value={form.readingTime} onChange={e => set('readingTime', +e.target.value)} min={1} style={inputStyle} />
            </div>

            {/* Toggles */}
            <div className="flex items-center justify-between">
              <label className="text-white/60 text-sm">Featured Story</label>
              <label className="toggle-switch">
                <input type="checkbox" checked={form.featured} onChange={e => set('featured', e.target.checked)} />
                <span className="toggle-slider" />
              </label>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-white/60 text-sm">Published</label>
              <label className="toggle-switch">
                <input type="checkbox" checked={form.status} onChange={e => set('status', e.target.checked)} />
                <span className="toggle-slider" />
              </label>
            </div>
          </div>

          {/* Images */}
          <div className="glass-card p-6 space-y-5" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
            <h3 className="font-bold text-white text-base">🖼️ Images</h3>
            <ImageField id="banner-url" label="Banner Image URL" size="1200x600px" value={form.banner} onChange={v => set('banner', v)} />
            <ImageField id="thumbnail-url" label="Thumbnail URL" size="600x400px" value={form.thumbnail} onChange={v => set('thumbnail', v)} />
          </div>

          {/* Save */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={saving}
            className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 text-base"
          >
            {saving
              ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              : <><FiSave size={17} /> {isEdit ? 'Update Story' : 'Publish Story'}</>
            }
          </motion.button>
        </div>
      </form>
    </div>
  )
}
