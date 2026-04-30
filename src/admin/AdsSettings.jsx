import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiSave } from 'react-icons/fi'
import { getSiteSettings, updateSettings } from '../firebase/db'
import toast from 'react-hot-toast'

const AD_SLOTS = [
  { key: 'header', label: 'Header Ad', desc: 'Shown at the top of all pages' },
  { key: 'inContent', label: 'In-Content Ad', desc: 'Shown in the middle of story content' },
  { key: 'sidebar', label: 'Sidebar Ad', desc: 'Shown in the right sidebar' },
  { key: 'footer', label: 'Footer Ad', desc: 'Shown at the bottom of pages' },
]

export default function AdsSettings() {
  const [ads, setAds] = useState({ header: '', inContent: '', sidebar: '', footer: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getSiteSettings().then(s => { if (s.ads) setAds(s.ads) })
  }, [])

  const handleSave = async () => {
    setSaving(true)
    await updateSettings('ads', ads)
    toast.success('✅ Ad settings saved!')
    setSaving(false)
  }

  const inputStyle = { background: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.15)', color: 'white', resize: 'vertical' }

  return (
    <div>
      <h1 className="text-2xl font-extrabold font-poppins text-white mb-2">Ads / AdSense Settings</h1>
      <p className="text-white/40 text-sm mb-8">Paste your Google AdSense code in the fields below. Leave empty to hide the ad slot.</p>

      <div className="max-w-3xl space-y-5">
        {AD_SLOTS.map(({ key, label, desc }, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-card p-6"
            style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
          >
            <h3 className="font-bold text-white mb-1">{label}</h3>
            <p className="text-xs text-white/30 mb-3">{desc}</p>
            <textarea
              value={ads[key]}
              onChange={e => setAds(p => ({ ...p, [key]: e.target.value }))}
              rows={4}
              placeholder={`<!-- Paste ${label} AdSense code here -->`}
              style={inputStyle}
              className="w-full rounded-xl px-4 py-3 text-xs font-mono outline-none border"
            />
          </motion.div>
        ))}

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSave}
          disabled={saving}
          className="btn-primary w-full py-3.5 flex items-center justify-center gap-2"
        >
          {saving ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><FiSave size={16} /> Save Ad Settings</>}
        </motion.button>
      </div>
    </div>
  )
}
