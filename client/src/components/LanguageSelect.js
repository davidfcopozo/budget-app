import React from 'react'
import { Button } from 'react-bootstrap'
import { useLanguage, useLanguageUpdater } from '../contexts/LanguageContext'
import { useTheme } from '../contexts/ThemesContext'

export const LanguageSelect = () => {
    const language = useLanguage()
    const handleSetLanguage = useLanguageUpdater()

const darkTheme = useTheme()
  const darkButtonVariant = darkTheme ? "primary" : "dark"

  return (
      <Button variant={darkButtonVariant}  size="sm" onClick={()=>handleSetLanguage()} >
          {language}
      </Button>
  )
}
