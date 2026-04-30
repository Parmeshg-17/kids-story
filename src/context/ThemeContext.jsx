import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const THEMES = ['default', 'kids', 'horror', 'moral', 'royal']

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('kidsstory-dark')
    return saved ? JSON.parse(saved) : false
  })

  const [activeTheme, setActiveTheme] = useState(() => {
    return localStorage.getItem('kidsstory-theme') || 'kids'
  })

  useEffect(() => {
    const html = document.documentElement
    if (darkMode) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
    localStorage.setItem('kidsstory-dark', JSON.stringify(darkMode))
  }, [darkMode])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', activeTheme)
    localStorage.setItem('kidsstory-theme', activeTheme)
  }, [activeTheme])

  const toggleDark = () => setDarkMode(prev => !prev)

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDark, activeTheme, setActiveTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
