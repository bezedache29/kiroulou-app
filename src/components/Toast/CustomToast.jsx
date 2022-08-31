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
    if (type === 'info') {
      return '#17a2b8'
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
    width: '90%',
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: secondaryColor,
    marginVertical: 4,
    borderRadius: 8,
    borderLeftWidth: 6,
    justifyContent: 'center',
    paddingLeft: 16,
  },
})
