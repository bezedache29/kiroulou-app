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
  beigeColor,
  blackColor,
  darkColor,
  darkPrimaryColor,
  eggplantColor,
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
      textSecondary: blackColor,
      icon: darkPrimaryColor,
      link: darkPrimaryColor,
      border: grayColor,
      backgroundColorBtn: whiteColor,
      backgroundColorBtnActive: beigeColor,
      textBtnActive: darkColor,
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
      textSecondary: whiteColor,
      icon: darkPrimaryColor,
      link: primaryColor,
      border: whiteColor,
      backgroundColorBtn: eggplantColor,
      backgroundColorBtnActive: beigeColor,
      textBtnActive: darkColor,
    },
  }

  return {
    CustomDefaultTheme,
    CustomDarkTheme,
  }
}

export default useMyTheme
