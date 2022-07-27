import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import {
  authTitle,
  darkPrimaryColor,
  mt10,
  primaryColor,
  whiteColor,
} from '../assets/styles/styles'

const CustomBigButton = ({ label, onPress }) => (
  <TouchableOpacity onPress={onPress} style={mt10}>
    <LinearGradient
      colors={[primaryColor, darkPrimaryColor]}
      style={styles.btn}
    >
      <Text style={[authTitle, styles.textBtn]}>{label}</Text>
    </LinearGradient>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  btn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 20,
  },
  textBtn: {
    textAlign: 'center',
    color: whiteColor,
  },
})

export default CustomBigButton
