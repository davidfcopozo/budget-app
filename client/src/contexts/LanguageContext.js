import React, { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'


// Create a context
const LanguageContext = React.createContext();
const LanguageUpdaterContext = React.createContext();
const DynamicLanguageContext = React.createContext();
const DynamicLanguageUpdaterContext = React.createContext();


export function useLanguage() {
  return useContext(LanguageContext)
}

export function useLanguageUpdater() {
  return useContext(LanguageUpdaterContext)
}
export function useDynamicLang() {
  return useContext(DynamicLanguageContext)
}
export function useDynamicLangUpdater() {
  return useContext(DynamicLanguageUpdaterContext)
}



export function LanguageProvider ({ children }){ 

    const browserLanguage = window.navigator.language 
    const defaultLang = browserLanguage === "en" ? "ES" : "EN"
    const [language, setLanguage ]=useLocalStorage("language", defaultLang)

    const dynamicLang = browserLanguage === "en" ? "english" : "spanish"
    const [lang, setLang ]=useLocalStorage("lang", dynamicLang)
    
    function handleSetLanguage() {
        setLanguage(prevLanguage => {
            if(prevLanguage === "EN"){
                return "ES" 
            }
            return "EN"
        })
        setLang(prevLang => {
            if(prevLang === "english"){
                return "spanish" 
            }
            return "english"
        })
    }

    function handleSetLang() {
      setLang(prevLang => {
          if(prevLang === "english"){
              return "spanish" 
          }
          return "english"
      })
  }



  return (
  <LanguageContext.Provider value={language} >
    <DynamicLanguageContext.Provider value={ lang } >
        <LanguageUpdaterContext.Provider value={handleSetLanguage} >    
          <DynamicLanguageUpdaterContext.Provider value={handleSetLang} >    
                  {children}
          </DynamicLanguageUpdaterContext.Provider>
        </LanguageUpdaterContext.Provider>
    </DynamicLanguageContext.Provider>
  </LanguageContext.Provider>
  )
}