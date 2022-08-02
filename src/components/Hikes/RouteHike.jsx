import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { useTheme } from 'react-native-paper'
import {
  defaultText,
  my5,
  primaryColor,
  rowCenter,
} from '../../assets/styles/styles'

const RouteHike = () => {
  const { colors } = useTheme()

  return (
    <View style={[rowCenter, my5, styles.container]}>
      <MaterialCommunityIcons name="circle" size={20} color={primaryColor} />
      <Text style={[defaultText, { color: colors.textBox }]}>45 km</Text>
      <Text style={[defaultText, { color: colors.textBox }]}>500 m D+</Text>
      <Text style={[defaultText, { color: colors.textBox }]}>3 ravitos</Text>
    </View>
  )
}

export default RouteHike

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
})
