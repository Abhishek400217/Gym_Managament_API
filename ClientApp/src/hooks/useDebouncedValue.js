import { useEffect, useState } from 'react'

// Returns a copy of `value` that only updates after `delay` ms of no further changes — avoids re-filtering
// the members list on every keystroke in the search bar.
export function useDebouncedValue(value, delay = 250) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debounced
}