import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useTheme, useThemeUpdater } from "../contexts/ThemesContext"


export default function ThemeButton(){
  

  
  const { themeToggler, darkButton } = useThemeUpdater()

  return (
    <>
    <Button size="sm" onClick={themeToggler}>{darkButton}</Button>
    </>
  )
}
