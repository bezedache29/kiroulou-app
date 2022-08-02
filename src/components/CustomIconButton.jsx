import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

import LinearGradient from 'react-native-linear-gradient'

import {
  cancelColor,
  dangerColor,
  darkPrimaryColor,
  defaultText,
  mr10,
  primaryColor,
  whiteColor,
} from '../assets/styles/styles'

const CustomIconButton = ({
  icon,
  onPress,
  size = '30%',
  text = false,
  cancel = false,
}) => (
  <TouchableOpacity onPress={onPress} style={{ width: size }}>
    <LinearGradient
      colors={
        cancel ? [cancelColor, dangerColor] : [primaryColor, darkPrimaryColor]
      }
      style={styles.box}
    >
      {text && (
        <Text style={[defaultText, mr10, { color: whiteColor, fontSize: 20 }]}>
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
