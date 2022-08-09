import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import {
  darkColor,
  defaultText,
  textAlignCenter,
  whiteColor,
} from '../assets/styles/styles'

const CustomRadioBox = ({ checked, onPress, value, color, label, style }) => (
  <View style={[styles.container, style]}>
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: checked === value ? color : whiteColor,
          elevation: checked === value ? 5 : 0,
          borderColor: color,
        },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          defaultText,
          textAlignCenter,
          {
            color: checked === value ? darkColor : color,
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  </View>
)

export default CustomRadioBox

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingLeft: 0,
  },
  button: {
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
  },
})
