import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'

import { useTheme } from 'react-native-paper'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { defaultText } from '../assets/styles/styles'

const CustomSearchInput = ({ placeholder, value, onChangeValue }) => {
  const { colors } = useTheme()
  return (
    <View style={[styles.input, { borderColor: colors.border }]}>
      <TextInput
        style={[defaultText, { flex: 1, color: colors.text }]}
        onChangeText={(text) => onChangeValue(text)}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={colors.text}
      />
      <MaterialCommunityIcons name="magnify" size={26} color={colors.icon} />
    </View>
  )
}

export default CustomSearchInput

const styles = StyleSheet.create({
  input: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
})
