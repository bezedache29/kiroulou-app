import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { useTheme } from 'react-native-paper'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {
  cancelColor,
  defaultText,
  mr10,
  my10,
  rowCenter,
} from '../../assets/styles/styles'

const CheckLine = ({ children }) => {
  const { colors } = useTheme()
  return (
    <View style={[rowCenter, my10, styles.container]}>
      <View style={[mr10, styles.checkContainer]}>
        <MaterialCommunityIcons
          name="check-bold"
          size={28}
          color={cancelColor}
        />
      </View>
      <View style={[mr10, styles.textContainer]}>
        <Text style={[defaultText, { color: colors.text }]}>{children}</Text>
      </View>
    </View>
  )
}

export default CheckLine

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  checkContainer: {
    flex: 1,
    alignItems: 'center',
  },
  textContainer: {
    flex: 10,
  },
})
