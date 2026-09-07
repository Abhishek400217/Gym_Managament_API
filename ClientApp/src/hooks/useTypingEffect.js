import { useEffect, useState } from 'react'

// Types out a string one character at a time — used for the animated subtitle.
export function useTypingEffect(text, speed = 45) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      i += 1
      setDisplayed(text.slice(0, i))
      if (i >= text.length) clearInterval(interval)
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  return displayed
}