import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import StoryCard from '../components/StoryCard'
import EmptyState from '../components/EmptyState'
import Footer from '../components/Footer'
import Breadcrumb from '../components/Breadcrumb'
import { useBookmarks } from '../context/BookmarkContext'

export default function BookmarksPage() {
  const { bookmarks } = useBookmarks()

  return (
    <>
      <Helmet>
        <title>My Bookmarks - KidsStory</title>
        <meta name="description" content="Your saved stories on KidsStory" />
      </Helmet>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Breadcrumb items={[
          { label: 'Home', to: '/' },
          { label: 'My Bookmarks' }
        ]} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-extrabold font-poppins gradient-text mb-2">🔖 My Bookmarks</h1>
          <p style={{ color: 'var(--text-secondary)' }} className="text-sm">
            {bookmarks.length} saved {bookmarks.length === 1 ? 'story' : 'stories'} for offline & quick reading
          </p>
        </motion.div>

        {bookmarks.length === 0 ? (
          <EmptyState
            icon="🔖"
            title="No bookmarks saved yet"
            description="As you explore stories, tap the Bookmark button to save your favorite fairy tales, bedtime stories, and adventures here!"
            actionLabel="Browse Stories"
            actionTo="/stories"
          />
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
