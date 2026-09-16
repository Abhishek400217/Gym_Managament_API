// Dark theme only — light theme has been permanently removed.
// ThemeProvider is kept as a no-op wrapper so the import in main.jsx keeps working without touching every file.
import { createContext, useContext } from 'react'

const ThemeContext = createContext({ theme: 'dark' })

export function ThemeProvider({ children }) {
  return (
    <ThemeContext.Provider value={{ theme: 'dark' }}>
      {children}
    </ThemeContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  return useContext(ThemeContext)
}

export default ThemeContext
