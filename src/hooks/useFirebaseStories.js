import { useState, useEffect } from 'react'
import { getAllStories } from '../firebase/db'

export function useFirebaseStories({ categorySlug, language, search, limit = 9 } = {}) {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        let all = await getAllStories()
        if (categorySlug) all = all.filter(s => s.categorySlug === categorySlug)
        if (language) all = all.filter(s => s.language === language)
        if (search) {
          const q = search.toLowerCase()
          all = all.filter(s =>
            s.title?.toLowerCase().includes(q) ||
            s.content?.toLowerCase().includes(q)
          )
        }
        setHasMore(all.length > page * limit)
        setStories(all.slice(0, page * limit))
      } catch (e) { console.error(e) }
      setLoading(false)
    }
    load()
  }, [categorySlug, language, search, page, limit])

  const loadMore = () => setPage(p => p + 1)

  return { stories, loading, hasMore, loadMore }
}
