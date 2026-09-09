import { createContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

// Dashboard-local dark/light toggle. Deliberately NOT touching the login page or its ThemeContext (it has
// none) — this only wraps the dashboard route tree, so login stays exactly as it was.
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-dashboard-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContext