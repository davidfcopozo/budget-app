import React, { useContext, useEffect, useState } from 'react'
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
  
  const [darkTheme, setDarkTheme]= useState(browserTheme)
  
  const [darkButton, setDarkButton]= useState(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)') ? "Light" : "Dark")


  //window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

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