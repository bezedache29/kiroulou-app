import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper'
import { defaultText } from '../../../../assets/styles/styles'

const BikeLi = ({ onPress, bike }) => {
  const { colors } = useTheme()

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          borderBottomColor: colors.border,
        },
      ]}
    >
      <Text style={[defaultText, { color: colors.text }]}>{bike.name}</Text>
      <Text style={[defaultText, { color: colors.text }]}>{bike.brand}</Text>
    </TouchableOpacity>
  )
}

export default BikeLi

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 10,
  },
})
