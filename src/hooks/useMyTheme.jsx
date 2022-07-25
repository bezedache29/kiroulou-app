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
  secondaryColor,
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
      backgroundNav: secondaryColor,
      text: darkColor,
      reverseText: whiteColor,
      textSecondary: blackColor,
      icon: darkPrimaryColor,
      link: darkPrimaryColor,
      border: grayColor,
      backgroundColorBtn: whiteColor,
      backgroundColorBtnActive: beigeColor,
      textBtnActive: darkColor,
      activeLink: darkPrimaryColor,
      inactiveLink: darkColor,
      tabBar: secondaryColor,
      indicator: darkColor,
    },
  }

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: darkColor,
      backgroundNav: darkColor,
      text: whiteColor,
      reverseText: darkColor,
      textSecondary: whiteColor,
      icon: darkPrimaryColor,
      link: primaryColor,
      border: whiteColor,
      backgroundColorBtn: eggplantColor,
      backgroundColorBtnActive: beigeColor,
      textBtnActive: darkColor,
      activeLink: darkPrimaryColor,
      inactiveLink: grayColor,
      tabBar: secondaryColor,
      indicator: secondaryColor,
    },
  }

  return {
    CustomDefaultTheme,
    CustomDarkTheme,
  }
}

export default useMyTheme
