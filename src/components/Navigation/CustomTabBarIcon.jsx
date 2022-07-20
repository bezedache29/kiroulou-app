import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const CustomTabBarIcon = ({ icon, label, focused, colors }) => (
  <View style={styles.container}>
    {icon}
    <Text
      style={{
        color: focused ? colors.activeLink : colors.inactiveLink,
        fontSize: 10,
      }}
    >
      {label}
    </Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default CustomTabBarIcon
