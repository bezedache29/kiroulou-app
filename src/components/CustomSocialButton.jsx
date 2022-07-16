import { TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { whiteColor } from '../assets/styles/styles'

const CustomSocialButton = ({ children, onPress, color }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.btn, { borderColor: color }]}
  >
    {children}
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  btn: {
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: whiteColor,
  },
})

export default CustomSocialButton
