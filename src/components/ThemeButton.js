import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useTheme, useThemeUpdater } from "../contexts/ThemesContext"


export default function ThemeButton(){
  
  const { themeToggler, darkButton } = useThemeUpdater()
  const darkTheme = useTheme()
  const darkButtonVariant = darkTheme ? "primary" : "dark"

  return (
    <>
    <Button size="sm" variant={darkButtonVariant} onClick={themeToggler}>{darkButton}</Button>
    </>
  )
}
