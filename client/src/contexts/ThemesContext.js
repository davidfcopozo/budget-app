import React, { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'


// Create a context
const ThemeContext = React.createContext();
const ThemeUpdaterContext = React.createContext();


export function useTheme() {
  return useContext(ThemeContext)
}

export function useThemeUpdater() {
  return useContext(ThemeUpdaterContext)
}


export function ThemesProvider ({ children }){ 

  const browserTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)') ? true : false
  
  const [darkTheme, setDarkTheme] = useLocalStorage("darkTheme", browserTheme)
  
  const [darkButton, setDarkButton] = useLocalStorage("darkButton",window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)') ? "☀️" : "🌙")


  function themeToggler() {
    setDarkTheme(prevDarkTheme => !prevDarkTheme)

    setDarkButton(darkTheme ? "🌙" : "☀️")
  }

  return (
  <ThemeContext.Provider value={ darkTheme } >
    <ThemeUpdaterContext.Provider value={{themeToggler, darkButton}} >  
        {children}
    </ThemeUpdaterContext.Provider>
  </ThemeContext.Provider>
  )
}