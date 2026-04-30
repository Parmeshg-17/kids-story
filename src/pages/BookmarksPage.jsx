import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import StoryCard from '../components/StoryCard'
import Footer from '../components/Footer'
import { useBookmarks } from '../context/BookmarkContext'
import { Link } from 'react-router-dom'

export default function BookmarksPage() {
  const { bookmarks } = useBookmarks()

  return (
    <>
      <Helmet>
        <title>My Bookmarks - KidsStory</title>
        <meta name="description" content="Your saved stories on KidsStory" />
      </Helmet>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-extrabold font-poppins gradient-text mb-2">🔖 My Bookmarks</h1>
          <p style={{ color: 'var(--text-secondary)' }} className="text-sm">
            {bookmarks.length} saved {bookmarks.length === 1 ? 'story' : 'stories'}
          </p>
        </motion.div>

        {bookmarks.length === 0 ? (
          <div className="text-center py-24">
            <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 3, repeat: Infinity }}>
              <p className="text-7xl mb-6">📭</p>
            </motion.div>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>No bookmarks yet</h2>
            <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>Start reading and save your favourite stories!</p>
            <Link to="/stories" className="btn-primary px-8 py-3">Browse Stories</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarks.map((story, i) => <StoryCard key={story.id} story={story} index={i} />)}
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
