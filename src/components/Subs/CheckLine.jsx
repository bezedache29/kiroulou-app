import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { useTheme } from 'react-native-paper'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {
  cancelColor,
  defaultText,
  my10,
  rowCenter,
} from '../../assets/styles/styles'

const CheckLine = ({ children }) => {
  const { colors } = useTheme()
  return (
    <View style={[rowCenter, my10, styles.container]}>
      <View style={styles.checkContainer}>
        <MaterialCommunityIcons
          name="check-bold"
          size={28}
          color={cancelColor}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={[defaultText, { color: colors.text }]}>{children}</Text>
      </View>
    </View>
  )
}

export default CheckLine

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkContainer: {
    flex: 3,
    alignItems: 'center',
  },
  textContainer: {
    flex: 8,
  },
})
