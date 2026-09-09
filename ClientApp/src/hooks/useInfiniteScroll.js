import { useEffect, useRef } from 'react'

// Observes a sentinel element and calls `onIntersect` when it scrolls into view (as long as `hasMore` is
// true and nothing is already loading). Attach the returned ref to an empty div at the end of a list.
export function useInfiniteScroll({ hasMore, loading, onIntersect }) {
  const sentinelRef = useRef(null)

  useEffect(() => {
    const node = sentinelRef.current
    if (!node || !hasMore) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          onIntersect()
        }
      },
      { rootMargin: '200px' }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [hasMore, loading, onIntersect])

  return sentinelRef
}