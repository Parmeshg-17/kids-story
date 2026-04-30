import { useState } from 'react'
import { motion } from 'framer-motion'

const SIZES = ['sm', 'base', 'lg', 'xl', '2xl']
const SIZE_LABELS = { sm: 'A-', base: 'A', lg: 'A+', xl: 'A++', '2xl': 'A+++' }

export default function FontSizeControl() {
  const [sizeIdx, setSizeIdx] = useState(() => {
    const saved = localStorage.getItem('story-font-size')
    return SIZES.indexOf(saved) !== -1 ? SIZES.indexOf(saved) : 1
  })

  const setSize = (idx) => {
    setSizeIdx(idx)
    localStorage.setItem('story-font-size', SIZES[idx])
    document.documentElement.style.setProperty('--story-font-size', `text-${SIZES[idx]}`)
    const el = document.querySelector('.story-content')
    if (el) {
      SIZES.forEach(s => el.classList.remove(`text-${s}`))
      el.classList.add(`text-${SIZES[idx]}`)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Font</span>
      <div className="flex gap-1">
        {SIZES.map((size, i) => (
          <motion.button
            key={size}
            whileTap={{ scale: 0.85 }}
            onClick={() => setSize(i)}
            className="w-8 h-8 rounded-lg text-xs font-bold transition-all"
            style={{
              background: sizeIdx === i ? 'var(--primary)' : 'var(--border)',
              color: sizeIdx === i ? 'white' : 'var(--text-secondary)',
            }}
          >
            {SIZE_LABELS[size]}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
