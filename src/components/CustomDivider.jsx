import { View, StyleSheet } from 'react-native'
import React from 'react'

import { useTheme } from 'react-native-paper'

const CustomDivider = () => {
  const { colors } = useTheme()
  return <View style={[styles.divider, { borderTopColor: colors.border }]} />
}

const styles = StyleSheet.create({
  divider: {
    borderTopWidth: 1,
    marginVertical: 10,
  },
})

export default CustomDivider
