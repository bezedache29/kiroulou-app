import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import React from 'react'
import { darkPrimaryColor, minText } from '../assets/styles/styles'

const InputField = ({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  color,
}) => (
  <View style={styles.container}>
    {icon}
    {inputType === 'password' ? (
      <TextInput
        placeholder={label}
        placeholderTextColor={color}
        style={[styles.textInput, { color }]}
        keyboardType={keyboardType}
        secureTextEntry
      />
    ) : (
      <TextInput
        placeholder={label}
        placeholderTextColor={color}
        style={[styles.textInput, { color }]}
      />
    )}
    <TouchableOpacity onPress={fieldButtonFunction}>
      <Text style={[styles.link, minText]}>{fieldButtonLabel}</Text>
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 25,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    paddingVertical: 0,
  },
  link: {
    color: darkPrimaryColor,
  },
})

export default InputField
