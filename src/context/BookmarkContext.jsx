import { createContext, useContext, useState, useEffect } from 'react'

const BookmarkContext = createContext()

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('kidsstory-bookmarks')) || []
    } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem('kidsstory-bookmarks', JSON.stringify(bookmarks))
  }, [bookmarks])

  const addBookmark = (story) => {
    setBookmarks(prev => {
      if (prev.find(b => b.id === story.id)) return prev
      return [story, ...prev]
    })
  }

  const removeBookmark = (id) => {
    setBookmarks(prev => prev.filter(b => b.id !== id))
  }

  const isBookmarked = (id) => bookmarks.some(b => b.id === id)

  const toggleBookmark = (story) => {
    if (isBookmarked(story.id)) removeBookmark(story.id)
    else addBookmark(story)
  }

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark, isBookmarked, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  )
}

export const useBookmarks = () => useContext(BookmarkContext)
