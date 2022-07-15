/**
 * Permet de personnaliser le theme par default et le theme sombre
 */
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native'
import {
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper'
import { darkColor, whiteColor } from '../assets/styles/styles'

const useMyTheme = () => {
  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: whiteColor,
      text: darkColor,
    },
  }

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: darkColor,
      text: whiteColor,
    },
  }

  return {
    CustomDefaultTheme,
    CustomDarkTheme,
  }
}

export default useMyTheme
