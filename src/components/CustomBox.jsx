import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper'

const CustomBox = ({ style, children }) => {
  const { colors } = useTheme()

  return (
    <View
      style={[styles.container, { backgroundColor: colors.background }, style]}
    >
      {children}
    </View>
  )
}

export default CustomBox

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 8,
    elevation: 8,
    padding: 10,
  },
})
