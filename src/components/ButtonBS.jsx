import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper'
import {
  cancelColor,
  darkPrimaryColor,
  defaultTextBold,
} from '../assets/styles/styles'

const ButtonBS = ({ onPress, children, cancel }) => {
  const { colors } = useTheme()

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: cancel ? cancelColor : darkPrimaryColor },
      ]}
    >
      <Text style={[defaultTextBold, { color: colors.reverseText }]}>
        {children}
      </Text>
    </TouchableOpacity>
  )
}

export default ButtonBS

const styles = StyleSheet.create({
  button: {
    padding: 13,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 7,
    width: '100%',
  },
})
