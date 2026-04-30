import { useEffect } from 'react'
import { incrementView } from '../firebase/db'

export function useViewCounter(storyId) {
  useEffect(() => {
    if (!storyId) return
    const key = `viewed-${storyId}`
    if (!sessionStorage.getItem(key)) {
      incrementView(storyId)
      sessionStorage.setItem(key, '1')
    }
  }, [storyId])
}
