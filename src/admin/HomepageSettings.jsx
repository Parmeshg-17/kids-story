import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiSave } from 'react-icons/fi'
import { getSiteSettings, updateSettings } from '../firebase/db'
import toast from 'react-hot-toast'

export default function HomepageSettings() {
  const [heroImage, setHeroImage] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getSiteSettings().then(s => setHeroImage(s.homepage?.heroImage || ''))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    await updateSettings('homepage', { heroImage })
    toast.success('✅ Homepage settings saved!')
    setSaving(false)
  }

  const inputStyle = { background: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.15)', color: 'white' }

  return (
    <div>
      <h1 className="text-2xl font-extrabold font-poppins text-white mb-8">Homepage Settings</h1>
      <div className="max-w-2xl space-y-6">
        <div className="glass-card p-6 space-y-5" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
          <h2 className="font-bold text-white">🖼️ Hero Banner Image</h2>
          <div className="input-float">
            <label className="text-white/60">Hero Image URL (1200x500px)</label>
            <input value={heroImage} onChange={e => setHeroImage(e.target.value)}
              placeholder="https://example.com/hero.jpg" type="url" style={inputStyle} />
            <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Recommended: 1200×500px • JPG/PNG • Max 2MB
            </p>
          </div>
          {heroImage && (
            <div className="rounded-2xl overflow-hidden" style={{ maxHeight: 240 }}>
              <img src={heroImage} alt="Hero preview" className="w-full object-cover"
                onError={e => e.target.style.display = 'none'} />
            </div>
          )}
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSave}
          disabled={saving}
          className="btn-primary w-full py-3.5 flex items-center justify-center gap-2"
        >
          {saving ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><FiSave size={16} /> Save Settings</>}
        </motion.button>
      </div>
    </div>
  )
}
