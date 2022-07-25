import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import {
  darkPrimaryColor,
  defaultText,
  primaryColor,
  textAlignCenter,
  whiteColor,
} from '../assets/styles/styles'

const CustomButton = ({
  children,
  onPress,
  btnStyle,
  gradient = [primaryColor, darkPrimaryColor],
}) => (
  <TouchableOpacity onPress={onPress} style={btnStyle}>
    <LinearGradient colors={gradient} style={styles.btn}>
      <Text style={[defaultText, textAlignCenter, styles.text]}>
        {children}
      </Text>
    </LinearGradient>
  </TouchableOpacity>
)

export default CustomButton

const styles = StyleSheet.create({
  btn: {
    padding: 10,
    borderRadius: 8,
  },
  text: {
    color: whiteColor,
  },
})
