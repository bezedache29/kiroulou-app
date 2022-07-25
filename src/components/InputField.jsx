import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import React from 'react'
import {
  dangerColor,
  darkPrimaryColor,
  defaultText,
  minText,
} from '../assets/styles/styles'

const InputField = ({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  colors,
  error,
  otherError,
  onChange,
  name,
  value,
  onBlur,
}) => (
  <>
    <View
      style={[
        styles.container,
        {
          borderBottomColor: error || otherError ? dangerColor : colors.border,
        },
      ]}
    >
      {icon}
      <TextInput
        name={name}
        value={value}
        placeholder={label}
        placeholderTextColor={colors.text}
        style={[
          styles.textInput,
          defaultText,
          {
            color: error || otherError ? dangerColor : colors.text,
            borerColor: error || otherError ? dangerColor : colors.text,
          },
        ]}
        onChangeText={onChange}
        onBlur={onBlur}
        keyboardType={keyboardType}
        secureTextEntry={inputType === 'password'}
      />
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={[styles.link, minText]}>{fieldButtonLabel}</Text>
      </TouchableOpacity>
    </View>
    {error && <Text style={{ color: dangerColor }}>{error}</Text>}
    {otherError && <Text style={{ color: dangerColor }}>{otherError}</Text>}
  </>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginTop: 25,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    paddingVertical: 0,
  },
  textInputError: {
    flex: 1,
    paddingVertical: 0,
  },
  link: {
    color: darkPrimaryColor,
  },
})

export default InputField
