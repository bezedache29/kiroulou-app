import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { RadioButton } from 'react-native-paper'
import { defaultText } from '../assets/styles/styles'

const CustomRadioButton = ({ label, colors, status, onPress, value }) => (
  <View style={styles.container}>
    <RadioButton
      value={value}
      status={status}
      onPress={onPress}
      color={colors.icon}
    />
    <Text style={[defaultText, { color: colors.text }]}>{label}</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
})

export default CustomRadioButton
