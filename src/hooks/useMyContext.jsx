/**
 * Permet d'avoir access aux fonctions du context sur toute l'app
 */
import { useMemo, useState } from 'react'

const useMyContext = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  const appContext = useMemo(() => ({
    toggleTheme: () => {
      setIsDarkTheme(!isDarkTheme)
    },
  }))

  return {
    appContext,
    isDarkTheme,
  }
}

export default useMyContext
