import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { FiShare2, FiCopy, FiCheck } from 'react-icons/fi'
import { FaWhatsapp, FaFacebook, FaTwitter, FaTelegram } from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function SocialShareButtons({ title, url }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const shareUrl = url || window.location.href
  const shareText = encodeURIComponent(title || 'Check out this story!')

  const links = [
    {
      icon: FaWhatsapp, label: 'WhatsApp', color: '#25D366',
      href: `https://wa.me/?text=${shareText}%20${encodeURIComponent(shareUrl)}`
    },
    {
      icon: FaFacebook, label: 'Facebook', color: '#1877F2',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    {
      icon: FaTwitter, label: 'Twitter', color: '#1DA1F2',
      href: `https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`
    },
    {
      icon: FaTelegram, label: 'Telegram', color: '#0088cc',
      href: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${shareText}`
    },
  ]

  const copy = async () => {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    toast.success('🔗 Link copied!')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2 btn-primary px-4 py-2 text-sm"
      >
        <FiShare2 size={15} /> Share
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="absolute bottom-12 left-0 glass-card p-4 z-20 flex flex-col gap-2 min-w-[160px]"
          >
            {links.map(({ icon: Icon, label, color, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:opacity-80 transition-opacity text-white text-sm font-bold"
                style={{ background: color }}
              >
                <Icon size={16} /> {label}
              </a>
            ))}
            <button
              onClick={copy}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold transition-all"
              style={{ background: 'var(--border)', color: 'var(--text-primary)' }}
            >
              {copied ? <FiCheck size={15} /> : <FiCopy size={15} />}
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
