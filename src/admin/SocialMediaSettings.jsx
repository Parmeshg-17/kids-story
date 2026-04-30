import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiSave } from 'react-icons/fi'
import { FaYoutube, FaInstagram, FaTelegram, FaFacebook } from 'react-icons/fa'
import { getSiteSettings, updateSettings } from '../firebase/db'
import toast from 'react-hot-toast'

const PLATFORMS = [
  { key: 'youtube', icon: FaYoutube, label: 'YouTube', color: '#FF0000' },
  { key: 'instagram', icon: FaInstagram, label: 'Instagram', color: '#E1306C' },
  { key: 'telegram', icon: FaTelegram, label: 'Telegram', color: '#0088cc' },
  { key: 'facebook', icon: FaFacebook, label: 'Facebook', color: '#1877F2' },
]

export default function SocialMediaSettings() {
  const [social, setSocial] = useState({
    youtube: { url: '', enabled: false },
    instagram: { url: '', enabled: false },
    telegram: { url: '', enabled: false },
    facebook: { url: '', enabled: false },
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getSiteSettings().then(s => { if (s.social) setSocial(s.social) })
  }, [])

  const setVal = (platform, key, value) => {
    setSocial(p => ({ ...p, [platform]: { ...p[platform], [key]: value } }))
  }

  const handleSave = async () => {
    setSaving(true)
    await updateSettings('social', social)
    toast.success('✅ Social links saved!')
    setSaving(false)
  }

  const inputStyle = { background: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.15)', color: 'white' }

  return (
    <div>
      <h1 className="text-2xl font-extrabold font-poppins text-white mb-8">Social Media Settings</h1>

      <div className="space-y-4 max-w-2xl">
        {PLATFORMS.map(({ key, icon: Icon, label, color }) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-5"
            style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: color }}>
                <Icon className="text-white" size={20} />
              </div>
              <span className="font-bold text-white">{label}</span>
              <div className="ml-auto">
                <label className="toggle-switch">
                  <input type="checkbox" checked={social[key]?.enabled}
                    onChange={e => setVal(key, 'enabled', e.target.checked)} />
                  <span className="toggle-slider" />
                </label>
              </div>
            </div>
            <div className="input-float mb-0">
              <label className="text-white/50">{label} URL</label>
              <input
                value={social[key]?.url || ''}
                onChange={e => setVal(key, 'url', e.target.value)}
                placeholder={`https://${key}.com/yourchannel`}
                type="url"
                style={inputStyle}
                disabled={!social[key]?.enabled}
              />
            </div>
          </motion.div>
        ))}

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSave}
          disabled={saving}
          className="btn-primary w-full py-3.5 flex items-center justify-center gap-2"
        >
          {saving ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><FiSave size={16} /> Save Social Links</>}
        </motion.button>
      </div>
    </div>
  )
}
