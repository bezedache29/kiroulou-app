import { StatusBar } from 'react-native'
import React from 'react'
import { darkColor, whiteColor } from '../assets/styles/styles'

const CustomStatusBar = ({ isDarkTheme }) => (
  <StatusBar
    backgroundColor={isDarkTheme ? darkColor : whiteColor}
    barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
  />
)

export default CustomStatusBar
