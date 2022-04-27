import React from 'react'
import { Button } from 'react-bootstrap'
import { useLanguage, useLanguageUpdater } from '../contexts/LanguageContext'

export const LanguageSelect = () => {
    const language = useLanguage()
    const handleSetLanguage = useLanguageUpdater()



  return (
      <Button size="sm" onClick={()=>handleSetLanguage()} >
          {language}
      </Button>
  )
}
