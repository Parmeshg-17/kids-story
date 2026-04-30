import { useEffect, useRef } from 'react'

export function useInfiniteScroll(callback, hasMore) {
  const ref = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && hasMore) callback() },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [callback, hasMore])

  return ref
}
