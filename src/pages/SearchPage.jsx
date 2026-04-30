import { useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import StoryCard, { StoryCardSkeleton } from '../components/StoryCard'
import Footer from '../components/Footer'
import { useFirebaseStories } from '../hooks/useFirebaseStories'

export default function SearchPage() {
  const [params] = useSearchParams()
  const query = params.get('q') || ''
  const { stories, loading } = useFirebaseStories({ search: query })

  return (
    <>
      <Helmet>
        <title>Search: {query} - KidsStory</title>
      </Helmet>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h1 className="text-2xl font-extrabold font-poppins gradient-text mb-2">
          🔍 Search Results
        </h1>
        <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>
          {loading ? 'Searching...' : `${stories.length} results for "${query}"`}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? Array(6).fill(0).map((_, i) => <StoryCardSkeleton key={i} />) : stories.map((s, i) => <StoryCard key={s.id} story={s} index={i} />)}
        </div>
        {!loading && stories.length === 0 && (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🔎</p>
            <p className="font-bold" style={{ color: 'var(--text-secondary)' }}>No stories found for "{query}"</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
