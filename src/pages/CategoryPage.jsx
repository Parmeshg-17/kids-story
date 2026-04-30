import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import StoryCard, { StoryCardSkeleton } from '../components/StoryCard'
import Breadcrumb from '../components/Breadcrumb'
import AdSlot from '../components/AdSlot'
import Footer from '../components/Footer'
import { getAllStories, getAllCategories, getSiteSettings } from '../firebase/db'

const THEME_BG = {
  kids: 'from-pink-400 to-purple-400',
  horror: 'from-red-700 to-gray-900',
  moral: 'from-amber-400 to-green-500',
  royal: 'from-violet-600 to-amber-400',
  default: 'from-indigo-500 to-purple-500',
}

export default function CategoryPage() {
  const { slug } = useParams()
  const [category, setCategory] = useState(null)
  const [stories, setStories] = useState([])
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const [cats, allStories, set] = await Promise.all([
        getAllCategories(), getAllStories(), getSiteSettings()
      ])
      const cat = cats.find(c => c.slug === slug)
      setCategory(cat)
      setStories(allStories.filter(s => s.categorySlug === slug))
      setSettings(set)
      setLoading(false)
    }
    load()
  }, [slug])

  const gradient = THEME_BG[category?.theme] || THEME_BG.default

  return (
    <>
      <Helmet>
        <title>{category?.name || 'Category'} Stories - KidsStory</title>
        <meta name="description" content={`Explore ${category?.name} stories on KidsStory`} />
      </Helmet>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Category Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-3xl bg-gradient-to-br ${gradient} p-10 mb-8 text-center text-white`}
        >
          {category?.image ? (
            <div className="w-20 h-20 rounded-2xl overflow-hidden mx-auto mb-4">
              <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="text-5xl mb-4">📚</div>
          )}
          <h1 className="text-3xl font-extrabold font-poppins mb-2">
            {category?.name || slug}
          </h1>
          <p className="text-white/70 text-sm">{stories.length} stories</p>
        </motion.div>

        <Breadcrumb items={[
          { label: 'Home', to: '/' },
          { label: 'Categories', to: '/stories' },
          { label: category?.name || slug },
        ]} />

        <AdSlot code={settings.ads?.header} position="header" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array(6).fill(0).map((_, i) => <StoryCardSkeleton key={i} />)
            : stories.map((story, i) => <StoryCard key={story.id} story={story} index={i} />)
          }
        </div>

        {!loading && stories.length === 0 && (
          <div className="text-center py-24">
            <p className="text-5xl mb-4">📭</p>
            <p className="font-bold" style={{ color: 'var(--text-secondary)' }}>No stories in this category yet</p>
          </div>
        )}

        <AdSlot code={settings.ads?.footer} position="footer" />
      </main>
      <Footer socialLinks={settings.social} />
    </>
  )
}
