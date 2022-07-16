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
import {
  darkColor,
  darkPrimaryColor,
  grayColor,
  primaryColor,
  whiteColor,
} from '../assets/styles/styles'

const useMyTheme = () => {
  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: whiteColor,
      text: darkColor,
      icon: darkPrimaryColor,
      link: darkPrimaryColor,
      border: grayColor,
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
      icon: darkPrimaryColor,
      link: primaryColor,
      border: whiteColor,
    },
  }

  return {
    CustomDefaultTheme,
    CustomDarkTheme,
  }
}

export default useMyTheme
