import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { useTheme } from 'react-native-paper'
import { defaultText, my5, rowCenter } from '../../assets/styles/styles'
import useServices from '../../hooks/useServices'

const RouteHike = ({ trip }) => {
  const { colors } = useTheme()
  const { colorDifficulty } = useServices()

  return (
    <View style={[rowCenter, my5, styles.container]}>
      <MaterialCommunityIcons
        name="circle"
        size={20}
        color={colorDifficulty(trip.difficulty)}
      />
      <Text style={[defaultText, { color: colors.textBox }]}>
        {trip.distance} km
      </Text>
      <Text style={[defaultText, { color: colors.textBox }]}>
        {trip.height_difference} m D+
      </Text>
      <Text style={[defaultText, { color: colors.textBox }]}>
        {trip.supplies} ravitos
      </Text>
    </View>
  )
}

export default RouteHike

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
})
