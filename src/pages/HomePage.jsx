import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import HeroBanner from '../components/HeroBanner'
import FeaturedSlider from '../components/FeaturedSlider'
import StoryCard, { StoryCardSkeleton } from '../components/StoryCard'
import CategoryCard from '../components/CategoryCard'
import TrendingSection from '../components/TrendingSection'
import AdSlot from '../components/AdSlot'
import Footer from '../components/Footer'
import { getAllStories, getAllCategories, getTrendingStories, getSiteSettings } from '../firebase/db'

function SectionHeader({ emoji, title }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-1 h-8 rounded-full" style={{ background: 'var(--primary)' }} />
      <h2 className="text-2xl font-extrabold font-poppins" style={{ color: 'var(--text-primary)' }}>
        {emoji} {title}
      </h2>
    </div>
  )
}

export default function HomePage() {
  const [stories, setStories] = useState([])
  const [categories, setCategories] = useState([])
  const [trending, setTrending] = useState([])
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [s, c, t, set] = await Promise.all([
          getAllStories(), getAllCategories(), getTrendingStories(6), getSiteSettings()
        ])
        setStories(s)
        setCategories(c.filter(cat => cat.status !== false))
        setTrending(t)
        setSettings(set)
      } catch (e) { console.error(e) }
      setLoading(false)
    }
    load()
  }, [])

  const featured = stories.filter(s => s.featured).slice(0, 5)
  const recent = stories.slice(0, 6)
  const suggested = [...stories].sort(() => Math.random() - 0.5).slice(0, 3)

  return (
    <>
      <Helmet>
        <title>KidsStory - Hindi & English Stories for Children</title>
        <meta name="description" content="Explore magical Hindi and English stories for kids. Bedtime stories, moral tales, adventures and more!" />
        <meta property="og:title" content="KidsStory - Stories for Children" />
        <meta property="og:description" content="Magical world of Hindi & English kids stories" />
        <meta property="og:image" content={settings.homepage?.heroImage || '/images/default-og.jpg'} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        {/* Hero */}
        <HeroBanner imageUrl={settings.homepage?.heroImage} />

        {/* Header Ad */}
        <AdSlot code={settings.ads?.header} position="header" />

        {/* Featured Slider */}
        <section className="mb-12">
          <SectionHeader emoji="⭐" title="Featured Stories" />
          {loading ? (
            <div className="rounded-3xl skeleton h-72" />
          ) : (
            <FeaturedSlider stories={featured.length ? featured : recent.slice(0, 4)} />
          )}
        </section>

        {/* Categories */}
        {categories.length > 0 && (
          <section className="mb-12">
            <SectionHeader emoji="📂" title="Explore Categories" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {loading
                ? Array(8).fill(0).map((_, i) => <div key={i} className="skeleton rounded-2xl h-48" />)
                : categories.map((cat, i) => <CategoryCard key={cat.id} category={cat} index={i} />)
              }
            </div>
          </section>
        )}

        {/* Sidebar Ad */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Recent Stories */}
            <section className="mb-12">
              <SectionHeader emoji="🆕" title="Recent Stories" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading
                  ? Array(6).fill(0).map((_, i) => <StoryCardSkeleton key={i} />)
                  : recent.map((story, i) => <StoryCard key={story.id} story={story} index={i} />)
                }
              </div>
            </section>

            {/* In-content Ad */}
            <AdSlot code={settings.ads?.inContent} position="in-content" />

            {/* Suggested */}
            {suggested.length > 0 && (
              <section className="mb-12">
                <SectionHeader emoji="💡" title="Suggested For You" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {suggested.map((story, i) => <StoryCard key={story.id} story={story} index={i} />)}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 space-y-6">
            <AdSlot code={settings.ads?.sidebar} position="sidebar" />
            {trending.length > 0 && <TrendingSection stories={trending} />}
          </div>
        </div>

        {/* Social Follow Section */}
        {settings.social && Object.values(settings.social).some(v => v?.enabled) && (
          <section className="mb-12">
            <SectionHeader emoji="📱" title="Follow Us" />
            <div className="glass-card p-6 text-center">
              <p className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                Stay connected for new stories every day!
              </p>
              <div className="flex justify-center flex-wrap gap-4">
                {Object.entries(settings.social)
                  .filter(([, v]) => v?.enabled && v?.url)
                  .map(([platform, val]) => (
                    <a
                      key={platform}
                      href={val.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary capitalize px-5 py-2.5"
                    >
                      {platform}
                    </a>
                  ))
                }
              </div>
            </div>
          </section>
        )}

        {/* Footer Ad */}
        <AdSlot code={settings.ads?.footer} position="footer" />
      </main>

      <Footer socialLinks={settings.social} />
    </>
  )
}
