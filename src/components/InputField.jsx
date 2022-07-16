import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import React from 'react'

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
      <Text style={styles.btn}>{fieldButtonLabel}</Text>
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
  btn: {
    color: '#AD40AF',
    fontWeight: '700',
  },
})

export default InputField
