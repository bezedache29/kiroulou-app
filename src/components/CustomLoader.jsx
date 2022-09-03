import { ActivityIndicator, StyleSheet, View } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper'

const CustomLoader = ({ color, backgroundColor, style }) => {
  const { colors } = useTheme()

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
        backgroundColor,
        style,
      ]}
    >
      <ActivityIndicator animating color={[colors.text, color]} size="large" />
    </View>
  )
}

export default CustomLoader

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
