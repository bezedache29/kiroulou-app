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
  blackColor,
  darkColor,
  darkPrimaryColor,
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
      backgroundBox: whiteColor,
      text: darkColor,
      textBox: darkColor,
      reverseText: whiteColor,
      textSecondary: blackColor,
      icon: darkPrimaryColor,
      link: darkPrimaryColor,
      border: grayColor,
      backgroundColorBtn: whiteColor,
      backgroundColorBtnActive: primaryColor,
      textBtnActive: darkColor,
      activeLink: secondaryColor,
      inactiveLink: darkColor,
      tabBar: secondaryColor,
      indicator: darkColor,
      box: whiteColor,
      card: secondaryColor,
      borderAvatar: whiteColor,
      dropdown: secondaryColor,
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
      backgroundBox: blackColor,
      text: whiteColor,
      textBox: secondaryColor,
      reverseText: darkColor,
      textSecondary: whiteColor,
      icon: darkPrimaryColor,
      link: primaryColor,
      border: whiteColor,
      backgroundColorBtn: primaryColor,
      backgroundColorBtnActive: darkPrimaryColor,
      textBtnActive: darkColor,
      // activeLink: darkPrimaryColor,
      activeLink: secondaryColor,
      // inactiveLink: grayColor,
      inactiveLink: darkColor,
      tabBar: secondaryColor,
      indicator: secondaryColor,
      box: primaryColor,
      card: blackColor,
      borderAvatar: secondaryColor,
      dropdown: blackColor,
    },
  }

  return {
    CustomDefaultTheme,
    CustomDarkTheme,
  }
}

export default useMyTheme
