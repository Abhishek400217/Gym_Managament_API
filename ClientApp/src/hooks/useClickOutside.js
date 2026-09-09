import { useEffect } from 'react'

// Calls `onOutsideClick` when a pointer event happens outside `ref.current` — closes dropdowns/popovers
// without every component reimplementing the same document-listener boilerplate.
export function useClickOutside(ref, onOutsideClick) {
  useEffect(() => {
    const handlePointerDown = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick()
      }
    }
    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [ref, onOutsideClick])
}