import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import {
  dangerColor,
  darkColor,
  darkPrimaryColor,
  defaultText,
  defaultTextBold,
  secondaryColor,
  warningColor,
} from '../../assets/styles/styles'

const CustomToast = ({ toast, type }) => {
  const color = () => {
    if (type === 'danger') {
      return dangerColor
    }
    if (type === 'warning') {
      return warningColor
    }

    return darkPrimaryColor
  }

  return (
    <View
      style={[
        {
          borderLeftColor: color(),
        },
        styles.container,
      ]}
    >
      <Text style={[defaultTextBold, { color: color() }]}>
        {toast.data.title}
      </Text>
      <Text style={[defaultText, { color: darkColor, marginTop: 2 }]}>
        {toast.message}
      </Text>
    </View>
  )
}

export default CustomToast

const styles = StyleSheet.create({
  container: {
    maxWidth: '85%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: secondaryColor,
    marginVertical: 4,
    borderRadius: 8,
    borderLeftWidth: 6,
    justifyContent: 'center',
    paddingLeft: 16,
  },
})
