import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaYoutube, FaInstagram, FaTelegram, FaFacebook } from 'react-icons/fa'
import { GiOpenBook } from 'react-icons/gi'

const SOCIAL_ICONS = {
  youtube: { icon: FaYoutube, color: '#FF0000', label: 'YouTube' },
  instagram: { icon: FaInstagram, color: '#E1306C', label: 'Instagram' },
  telegram: { icon: FaTelegram, color: '#0088cc', label: 'Telegram' },
  facebook: { icon: FaFacebook, color: '#1877F2', label: 'Facebook' },
}

export default function Footer({ socialLinks = {} }) {
  const enabledLinks = Object.entries(socialLinks).filter(([, v]) => v?.enabled && v?.url)

  return (
    <footer className="mt-20 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}>
                <GiOpenBook className="text-white text-lg" />
              </div>
              <span className="font-poppins font-extrabold text-xl gradient-text">KidsStory</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              A magical world of Hindi & English stories for children. Explore bedtime stories, moral tales, and exciting adventures!
            </p>
            {/* Social Links */}
            {enabledLinks.length > 0 && (
              <div className="flex items-center gap-2 mt-4">
                {enabledLinks.map(([platform, val]) => {
                  const meta = SOCIAL_ICONS[platform]
                  if (!meta) return null
                  const Icon = meta.icon
                  return (
                    <motion.a
                      key={platform}
                      href={val.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, y: -3 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-white transition-all"
                      style={{ background: meta.color }}
                      aria-label={meta.label}
                    >
                      <Icon size={15} />
                    </motion.a>
                  )
                })}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-poppins font-bold text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--text-primary)' }}>Navigation</h4>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/stories', label: 'All Stories' },
                { to: '/bookmarks', label: 'My Bookmarks' },
                { to: '/help', label: 'Help Center & FAQ' },
                { to: '/support', label: 'Support & Contact' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-xs hover:opacity-70 transition-opacity" style={{ color: 'var(--text-secondary)' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Policies */}
          <div>
            <h4 className="font-poppins font-bold text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--text-primary)' }}>Legal Policies</h4>
            <ul className="space-y-2">
              {[
                { to: '/privacy-policy', label: 'Privacy Policy' },
                { to: '/terms', label: 'Terms of Use' },
                { to: '/cookie-policy', label: 'Cookie Policy' },
                { to: '/disclaimer', label: 'Disclaimer' },
                { to: '/acceptable-use', label: 'Acceptable Use Policy' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-xs hover:opacity-70 transition-opacity" style={{ color: 'var(--text-secondary)' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Compliance & Standards */}
          <div>
            <h4 className="font-poppins font-bold text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--text-primary)' }}>Safety & Trust</h4>
            <ul className="space-y-2">
              {[
                { to: '/accessibility', label: 'Accessibility Statement' },
                { to: '/security', label: 'Security & Disclosure' },
                { to: '/community-guidelines', label: 'Community Guidelines' },
                { to: '/admin/login', label: 'Admin Login' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-xs hover:opacity-70 transition-opacity" style={{ color: 'var(--text-secondary)' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-3 text-xs" style={{ borderColor: 'var(--border)' }}>
          <p style={{ color: 'var(--text-secondary)' }}>
            © {new Date().getFullYear()} KidsStory Platform. All rights reserved.
          </p>
          <p style={{ color: 'var(--text-secondary)' }}>
            Designed with ❤️ for children, parents & educators
          </p>
        </div>
      </div>
    </footer>
  )
}
