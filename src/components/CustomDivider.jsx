import { View, StyleSheet } from 'react-native'
import React from 'react'

import { useTheme } from 'react-native-paper'

const CustomDivider = ({ addStyle }) => {
  const { colors } = useTheme()
  return (
    <View
      style={[styles.divider, { borderTopColor: colors.border }, addStyle]}
    />
  )
}

const styles = StyleSheet.create({
  divider: {
    borderTopWidth: 1,
  },
})

export default CustomDivider
