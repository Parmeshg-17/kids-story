import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown, FiBookOpen, FiBookmark, FiMoon, FiSearch, FiSliders, FiWifiOff } from 'react-icons/fi'
import Breadcrumb from '../components/Breadcrumb'
import Footer from '../components/Footer'

const FAQS = [
  {
    category: 'Reading Experience',
    icon: FiSliders,
    items: [
      {
        q: 'How do I change the font size while reading a story?',
        a: 'On any story detail page, look at the action bar beneath the title. Click the "+A" or "-A" buttons to increase or decrease font size to your comfort level.'
      },
      {
        q: 'How does dark mode work?',
        a: 'You can toggle dark mode at any time using the moon/sun icon located in the navigation header bar. Your preference is saved automatically.'
      },
      {
        q: 'How do I know my reading progress?',
        a: 'When reading a story, a colored progress bar stays at the very top of your screen showing how far you have read through the chapter.'
      }
    ]
  },
  {
    category: 'Bookmarks & Favorites',
    icon: FiBookmark,
    items: [
      {
        q: 'How do I bookmark a story to read later?',
        a: 'On any story page or story card, click the "Bookmark" button. The story will be saved to your Bookmarks page without needing an account.'
      },
      {
        q: 'Where are my bookmarks stored?',
        a: 'Your bookmarks are safely saved in your browser local storage. They stay available even if you close your browser or go offline.'
      }
    ]
  },
  {
    category: 'Languages & Search',
    icon: FiSearch,
    items: [
      {
        q: 'Are stories available in Hindi and English?',
        a: 'Yes! KidsStory offers stories in both Hindi (हिंदी) and English. You can filter stories by language on the All Stories page or search for specific titles.'
      },
      {
        q: 'Can I read stories offline?',
        a: 'Yes! Once a story has been loaded or saved to your Bookmarks, you can read it even without an active internet connection.'
      }
    ]
  }
]

export default function HelpCenterPage() {
  const [openIndex, setOpenIndex] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const toggleAcc = (id) => {
    setOpenIndex(openIndex === id ? null : id)
  }

  const filteredFaqs = FAQS.map(cat => ({
    ...cat,
    items: cat.items.filter(item =>
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.items.length > 0)

  return (
    <>
      <Helmet>
        <title>Help Center & FAQ - KidsStory</title>
        <meta name="description" content="Find answers to frequently asked questions about reading stories, bookmarks, dark mode, and font size controls." />
      </Helmet>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-16">
        <Breadcrumb items={[
          { label: 'Home', to: '/' },
          { label: 'Help Center' }
        ]} />

        <div className="mb-8 text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-extrabold font-poppins gradient-text">
            ❓ Help Center & FAQ
          </h1>
          <p className="text-sm max-w-lg mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Learn how to make the most of your reading experience on KidsStory.
          </p>

          <div className="max-w-md mx-auto pt-2">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search help topics..."
              className="w-full rounded-2xl px-4 py-3 text-sm outline-none shadow-sm"
              style={{ background: 'var(--card-bg)', border: '1.5px solid var(--border)', color: 'var(--text-primary)' }}
            />
          </div>
        </div>

        <div className="space-y-8">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 glass-card">
              <p className="text-4xl mb-2">🔍</p>
              <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>No matching help topics found</p>
            </div>
          ) : (
            filteredFaqs.map((cat, cIdx) => {
              const Icon = cat.icon
              return (
                <div key={cIdx} className="space-y-4">
                  <div className="flex items-center gap-2 font-poppins font-extrabold text-lg text-pink-500">
                    <Icon size={20} />
                    <span>{cat.category}</span>
                  </div>

                  <div className="space-y-3">
                    {cat.items.map((item, iIdx) => {
                      const id = `${cIdx}-${iIdx}`
                      const isOpen = openIndex === id
                      return (
                        <div
                          key={iIdx}
                          className="glass-card overflow-hidden transition-all border"
                          style={{ borderColor: 'var(--border)' }}
                        >
                          <button
                            onClick={() => toggleAcc(id)}
                            className="w-full p-4 md:p-5 flex items-center justify-between text-left font-bold text-sm"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            <span>{item.q}</span>
                            <motion.span
                              animate={{ rotate: isOpen ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                              className="shrink-0 text-pink-500 ml-2"
                            >
                              <FiChevronDown size={18} />
                            </motion.span>
                          </button>

                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="px-4 md:px-5 pb-5 text-xs leading-relaxed border-t pt-3"
                                style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
                              >
                                {item.a}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })
          )}
        </div>

        <div className="mt-12 p-6 glass-card text-center space-y-3">
          <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
            Still need assistance?
          </p>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            Our team is always happy to assist parents, educators, and young readers.
          </p>
          <a href="/support" className="btn-primary inline-block px-6 py-2 text-xs font-bold">
            Contact Support Team
          </a>
        </div>
      </main>

      <Footer />
    </>
  )
}
