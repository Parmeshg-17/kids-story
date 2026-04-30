import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiArrowRight, FiClock, FiEye, FiBookmark } from 'react-icons/fi'
import ReadingProgressBar from '../components/ReadingProgressBar'
import FontSizeControl from '../components/FontSizeControl'
import SocialShareButtons from '../components/SocialShareButtons'
import Breadcrumb from '../components/Breadcrumb'
import StoryCard from '../components/StoryCard'
import AdSlot from '../components/AdSlot'
import Footer from '../components/Footer'
import { useViewCounter } from '../hooks/useViewCounter'
import { useBookmarks } from '../context/BookmarkContext'
import { getStoryBySlug, getAllStories, getSiteSettings } from '../firebase/db'
import toast from 'react-hot-toast'

export default function StoryDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [story, setStory] = useState(null)
  const [allStories, setAllStories] = useState([])
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(true)

  const { toggleBookmark, isBookmarked } = useBookmarks()

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const [s, all, set] = await Promise.all([
        getStoryBySlug(slug),
        getAllStories(),
        getSiteSettings()
      ])
      setStory(s)
      setAllStories(all)
      setSettings(set)
      setLoading(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    load()
  }, [slug])

  useViewCounter(story?.id)

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-6">
        <div className="skeleton h-8 w-3/4 rounded" />
        <div className="skeleton h-72 rounded-3xl" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-5/6 rounded" />
        <div className="skeleton h-4 w-4/6 rounded" />
      </div>
    )
  }

  if (!story) {
    return (
      <div className="text-center py-32">
        <p className="text-5xl mb-4">😔</p>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Story not found</h2>
        <Link to="/stories" className="btn-primary px-6 py-3">Browse Stories</Link>
      </div>
    )
  }

  const currentIndex = allStories.findIndex(s => s.slug === slug)
  const prevStory = allStories[currentIndex + 1]
  const nextStory = allStories[currentIndex - 1]
  const related = allStories.filter(s => s.categorySlug === story.categorySlug && s.id !== story.id).slice(0, 3)

  const bookmarked = isBookmarked(story.id)

  return (
    <>
      <Helmet>
        <title>{story.metaTitle || story.title} - KidsStory</title>
        <meta name="description" content={story.metaDescription || story.content?.replace(/<[^>]+>/g, '').substring(0, 160)} />
        <meta name="keywords" content={story.keywords || 'kids story, hindi story, bedtime story'} />
        <meta property="og:title" content={story.metaTitle || story.title} />
        <meta property="og:description" content={story.metaDescription} />
        <meta property="og:image" content={story.banner || story.thumbnail || '/images/default-og.jpg'} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={story.title} />
        <meta name="twitter:image" content={story.banner || '/images/default-og.jpg'} />
        <link rel="canonical" href={window.location.href} />
        {story.language === 'Hindi' && <link rel="alternate" hreflang="hi" href={window.location.href} />}
        {story.language === 'English' && <link rel="alternate" hreflang="en" href={window.location.href} />}
      </Helmet>

      <ReadingProgressBar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <AdSlot code={settings.ads?.header} position="header" />

        <div className="flex gap-8">
          {/* Article */}
          <article className="flex-1 max-w-4xl">
            {/* Breadcrumb */}
            <Breadcrumb items={[
              { label: 'Home', to: '/' },
              { label: story.category || 'Stories', to: `/category/${story.categorySlug}` },
              { label: story.title },
            ]} />

            {/* Banner */}
            {story.banner && (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-3xl overflow-hidden mb-8"
                style={{ maxHeight: 420 }}
              >
                <img
                  src={story.banner}
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}

            {/* Title + Meta */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full text-white"
                  style={{ background: 'var(--primary)' }}
                >
                  {story.category}
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{ background: 'var(--border)', color: 'var(--text-secondary)' }}>
                  {story.language === 'Hindi' ? '🇮🇳 Hindi' : '🇬🇧 English'}
                </span>
                <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
                  <FiClock size={12} /> {story.readingTime || 5} min read
                </span>
                <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
                  <FiEye size={12} /> {story.views || 0} views
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold font-poppins leading-tight mb-4"
                style={{ color: 'var(--text-primary)' }}>
                {story.title}
              </h1>

              {/* Action Bar */}
              <div className="flex flex-wrap items-center gap-3">
                <SocialShareButtons title={story.title} url={window.location.href} />
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    toggleBookmark(story)
                    toast.success(bookmarked ? '🗑️ Removed' : '🔖 Bookmarked!')
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all"
                  style={{
                    background: bookmarked ? 'var(--primary)' : 'var(--border)',
                    color: bookmarked ? 'white' : 'var(--text-secondary)',
                  }}
                >
                  <FiBookmark size={14} fill={bookmarked ? 'currentColor' : 'none'} />
                  {bookmarked ? 'Saved' : 'Bookmark'}
                </motion.button>
                <FontSizeControl />
              </div>
            </motion.div>

            <AdSlot code={settings.ads?.inContent} position="in-content" />

            {/* Story Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`story-content mb-10 text-base ${story.language === 'Hindi' ? 'font-hindi' : ''}`}
              dangerouslySetInnerHTML={{ __html: story.content || '<p>Story content coming soon...</p>' }}
            />

            {/* Navigation */}
            <div className="flex gap-4 mt-10 mb-10">
              {prevStory && (
                <Link
                  to={`/story/${prevStory.slug}`}
                  className="flex-1 glass-card p-4 flex items-center gap-3 group"
                >
                  <FiArrowLeft size={18} style={{ color: 'var(--primary)' }} className="group-hover:-translate-x-1 transition-transform" />
                  <div>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Previous</p>
                    <p className="font-bold text-sm line-clamp-1" style={{ color: 'var(--text-primary)' }}>{prevStory.title}</p>
                  </div>
                </Link>
              )}
              {nextStory && (
                <Link
                  to={`/story/${nextStory.slug}`}
                  className="flex-1 glass-card p-4 flex items-center justify-end gap-3 group text-right"
                >
                  <div>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Next</p>
                    <p className="font-bold text-sm line-clamp-1" style={{ color: 'var(--text-primary)' }}>{nextStory.title}</p>
                  </div>
                  <FiArrowRight size={18} style={{ color: 'var(--primary)' }} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>

            {/* Related Stories */}
            {related.length > 0 && (
              <section>
                <h2 className="text-xl font-extrabold font-poppins mb-5" style={{ color: 'var(--text-primary)' }}>
                  📖 Related Stories
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {related.map((s, i) => <StoryCard key={s.id} story={s} index={i} />)}
                </div>
              </section>
            )}
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block w-72 space-y-6 pt-16">
            <AdSlot code={settings.ads?.sidebar} position="sidebar" />
          </aside>
        </div>

        <AdSlot code={settings.ads?.footer} position="footer" />
      </main>

      <Footer socialLinks={settings.social} />
    </>
  )
}
