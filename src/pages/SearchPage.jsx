import React, { useState } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import StoryCard, { StoryCardSkeleton } from '../components/StoryCard'
import EmptyState from '../components/EmptyState'
import Breadcrumb from '../components/Breadcrumb'
import Footer from '../components/Footer'
import { useFirebaseStories } from '../hooks/useFirebaseStories'

const POPULAR_SEARCHES = ['Fox', 'Moon', 'Magic', 'Moral', 'Hindi', 'Bedtime']

export default function SearchPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const query = params.get('q') || ''
  const [searchInput, setSearchInput] = useState(query)
  const { stories, loading } = useFirebaseStories({ search: query })

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`)
    }
  }

  return (
    <>
      <Helmet>
        <title>{query ? `Search: ${query}` : 'Search Stories'} - KidsStory</title>
        <meta name="description" content={`Search stories on KidsStory platform for ${query}`} />
      </Helmet>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Breadcrumb items={[
          { label: 'Home', to: '/' },
          { label: 'Search Results' }
        ]} />

        <div className="mb-8">
          <h1 className="text-3xl font-extrabold font-poppins gradient-text mb-2">
            🔍 Search Stories
          </h1>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="max-w-xl flex gap-3 my-4">
            <input
              type="text"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              placeholder="Search by title, topic, or keyword..."
              className="flex-1 rounded-2xl px-4 py-2.5 text-sm outline-none border"
              style={{ background: 'var(--card-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            />
            <button type="submit" className="btn-primary px-6 py-2.5 text-sm font-bold">
              Search
            </button>
          </form>

          {/* Popular Tag suggestions */}
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span style={{ color: 'var(--text-secondary)' }}>Popular suggestions:</span>
            {POPULAR_SEARCHES.map(tag => (
              <button
                key={tag}
                onClick={() => {
                  setSearchInput(tag)
                  navigate(`/search?q=${encodeURIComponent(tag)}`)
                }}
                className="px-3 py-1 rounded-full border hover:opacity-80 transition-all font-semibold"
                style={{ borderColor: 'var(--border)', background: 'var(--card-bg)', color: 'var(--text-primary)' }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <p className="text-sm font-semibold mb-6" style={{ color: 'var(--text-secondary)' }}>
          {loading ? 'Searching story database...' : `${stories.length} ${stories.length === 1 ? 'story' : 'stories'} found for "${query}"`}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array(6).fill(0).map((_, i) => <StoryCardSkeleton key={i} />)
            : stories.map((s, i) => <StoryCard key={s.id} story={s} index={i} />)
          }
        </div>

        {!loading && stories.length === 0 && (
          <EmptyState
            icon="🔎"
            title={`No stories found for "${query}"`}
            description="Try searching with a different keyword or explore all available story categories below."
            actionLabel="View All Stories"
            actionTo="/stories"
          />
        )}
      </main>
      <Footer />
    </>
  )
}
