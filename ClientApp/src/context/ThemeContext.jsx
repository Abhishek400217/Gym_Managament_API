import { createContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

// Global theme provider — mounted once at the app root (main.jsx) so every page shares a single theme state.
// Persists the chosen theme to localStorage so it survives page reloads.
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('pulsefit-theme') || 'dark'
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-dashboard-theme', theme)
    try { localStorage.setItem('pulsefit-theme', theme) } catch { /* ignore */ }
  }, [theme])

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContext