/**
 * Permet d'avoir access aux fonctions du context sur toute l'app
 */
import { useMemo, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const useMyContext = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  const appContext = useMemo(() => ({
    toggleTheme: async () => {
      if (isDarkTheme) {
        await AsyncStorage.removeItem('darkmode')
      } else {
        await AsyncStorage.setItem('darkmode', 'true')
      }
      setIsDarkTheme(!isDarkTheme)
    },
  }))

  return {
    appContext,
    isDarkTheme,
  }
}

export default useMyContext
