import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

import { useTheme } from 'react-native-paper'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { defaultText, rowCenter } from '../assets/styles/styles'

const InputFieldButton = ({ onPress, icon, label, chevronColor }) => {
  const { colors } = useTheme()

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        rowCenter,
        styles.container,
        {
          borderBottomColor: colors.border,
        },
      ]}
    >
      {icon}
      <Text style={[defaultText, { color: colors.text }]}>{label}</Text>
      <MaterialCommunityIcons
        name="chevron-down"
        size={18}
        color={chevronColor}
        style={styles.iconDown}
      />
    </TouchableOpacity>
  )
}

export default InputFieldButton

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    borderBottomWidth: 1,
    paddingBottom: 15,
  },
  iconDown: {
    marginLeft: 'auto',
  },
})
