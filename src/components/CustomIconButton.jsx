import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

import LinearGradient from 'react-native-linear-gradient'

import {
  cancelColor,
  dangerColor,
  darkPrimaryColor,
  defaultText,
  primaryColor,
  whiteColor,
} from '../assets/styles/styles'

const CustomIconButton = ({
  icon,
  iconLeft,
  onPress,
  textStyle,
  size = '30%',
  text,
  isText = false,
  cancel = false,
  disabled = false,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{ width: size }}
    disabled={disabled}
  >
    <LinearGradient
      colors={
        cancel ? [cancelColor, dangerColor] : [primaryColor, darkPrimaryColor]
      }
      style={styles.box}
    >
      {iconLeft}
      {isText && (
        <Text
          style={[defaultText, { color: whiteColor, fontSize: 20 }, textStyle]}
        >
          {text}
        </Text>
      )}
      {icon}
    </LinearGradient>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  box: {
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: 'row',
  },
  title: {
    marginLeft: 5,
    fontSize: 20,
    color: whiteColor,
  },
})

export default CustomIconButton
