import { useEffect, useState } from 'react'

// Tracks whether a CSS media query currently matches — drives the desktop-table vs. mobile-card switch
// based on real viewport width rather than fragile container-width guessing.
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  )

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query)
    const handleChange = (event) => setMatches(event.matches)
    mediaQueryList.addEventListener('change', handleChange)
    return () => mediaQueryList.removeEventListener('change', handleChange)
  }, [query])

  return matches
}