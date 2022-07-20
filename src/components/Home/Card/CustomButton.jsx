import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

import LinearGradient from 'react-native-linear-gradient'

import {
  darkPrimaryColor,
  primaryColor,
  whiteColor,
} from '../../../assets/styles/styles'

const CustomButton = ({ icon, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <LinearGradient
      colors={[primaryColor, darkPrimaryColor]}
      style={styles.box}
    >
      {icon}
    </LinearGradient>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    width: '30%',
  },
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

export default CustomButton
