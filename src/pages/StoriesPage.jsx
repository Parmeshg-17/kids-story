import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import StoryCard, { StoryCardSkeleton } from '../components/StoryCard'
import AdSlot from '../components/AdSlot'
import Footer from '../components/Footer'
import { useFirebaseStories } from '../hooks/useFirebaseStories'
import { useInfiniteScroll } from '../hooks/useInfiniteScroll'
import { getAllCategories, getSiteSettings } from '../firebase/db'

export default function StoriesPage() {
  const [params, setParams] = useSearchParams()
  const [categories, setCategories] = useState([])
  const [settings, setSettings] = useState({})
  const [search, setSearch] = useState('')

  const categoryFilter = params.get('category') || ''
  const languageFilter = params.get('language') || ''

  const { stories, loading, hasMore, loadMore } = useFirebaseStories({
    categorySlug: categoryFilter,
    language: languageFilter,
    search,
  })

  const loaderRef = useInfiniteScroll(loadMore, hasMore)

  useEffect(() => {
    getAllCategories().then(c => setCategories(c.filter(cat => cat.status !== false)))
    getSiteSettings().then(setSettings)
  }, [])

  const setFilter = (key, value) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next)
  }

  return (
    <>
      <Helmet>
        <title>All Stories - KidsStory</title>
        <meta name="description" content="Browse all Hindi and English stories for kids on KidsStory." />
      </Helmet>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <AdSlot code={settings.ads?.header} position="header" />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold font-poppins gradient-text mb-2">
            📚 All Stories
          </h1>
          <p style={{ color: 'var(--text-secondary)' }} className="text-sm">
            Explore our collection of Hindi & English stories
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          {/* Search */}
          <input
            placeholder="🔍 Search stories..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 min-w-[200px] rounded-xl px-4 py-2 text-sm outline-none"
            style={{ background: 'var(--card-bg)', border: '1.5px solid var(--border)', color: 'var(--text-primary)' }}
          />

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={e => setFilter('category', e.target.value)}
            className="rounded-xl px-4 py-2 text-sm outline-none"
            style={{ background: 'var(--card-bg)', border: '1.5px solid var(--border)', color: 'var(--text-primary)' }}
          >
            <option value="">All Categories</option>
            {categories.map(c => (
              <option key={c.id} value={c.slug}>{c.name}</option>
            ))}
          </select>

          {/* Language Filter */}
          <select
            value={languageFilter}
            onChange={e => setFilter('language', e.target.value)}
            className="rounded-xl px-4 py-2 text-sm outline-none"
            style={{ background: 'var(--card-bg)', border: '1.5px solid var(--border)', color: 'var(--text-primary)' }}
          >
            <option value="">All Languages</option>
            <option value="Hindi">🇮🇳 Hindi</option>
            <option value="English">🇬🇧 English</option>
          </select>

          {/* Clear Filters */}
          {(categoryFilter || languageFilter || search) && (
            <button
              onClick={() => { setParams({}); setSearch('') }}
              className="px-4 py-2 rounded-xl text-sm font-bold transition-all hover:opacity-80"
              style={{ background: 'var(--border)', color: 'var(--text-secondary)' }}
            >
              ✕ Clear
            </button>
          )}
        </div>

        <div className="flex gap-8">
          {/* Stories Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.map((story, i) => (
                <StoryCard key={story.id} story={story} index={i} />
              ))}
              {loading && Array(6).fill(0).map((_, i) => <StoryCardSkeleton key={`sk-${i}`} />)}
            </div>

            {!loading && stories.length === 0 && (
              <div className="text-center py-20">
                <p className="text-5xl mb-4">😔</p>
                <p className="font-bold text-lg" style={{ color: 'var(--text-secondary)' }}>No stories found</p>
              </div>
            )}

            {/* Infinite Scroll Loader */}
            <div ref={loaderRef} className="h-16 flex items-center justify-center">
              {hasMore && !loading && (
                <motion.button
                  onClick={loadMore}
                  whileHover={{ scale: 1.05 }}
                  className="btn-primary px-8 py-3"
                >
                  Load More Stories
                </motion.button>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block w-72 space-y-6">
            <AdSlot code={settings.ads?.sidebar} position="sidebar" />
          </div>
        </div>

        <AdSlot code={settings.ads?.footer} position="footer" />
      </main>
      <Footer socialLinks={settings.social} />
    </>
  )
}
