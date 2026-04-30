import { useState, useEffect } from 'react'

export function useReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const total = document.body.scrollHeight - window.innerHeight
      setProgress(total > 0 ? Math.round((window.scrollY / total) * 100) : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return progress
}
