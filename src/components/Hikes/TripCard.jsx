import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { useTheme } from 'react-native-paper'

import { defaultText, mr10, my5, rowCenter } from '../../assets/styles/styles'
import useServices from '../../hooks/useServices'

const TripCard = ({ onPress, trip }) => {
  // console.log('trip trip card', trip)
  const { colors } = useTheme()
  const { colorDifficulty } = useServices()

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[rowCenter, my5, styles.container]}
    >
      <MaterialCommunityIcons
        name="checkbox-blank-circle"
        size={25}
        color={colorDifficulty(trip.difficulty.toString())}
        style={{ flex: 1 }}
      />
      <View style={[rowCenter, { flex: 2 }]}>
        <Text
          style={[
            defaultText,
            { color: colors.text, flex: 3, textAlign: 'right', marginRight: 5 },
          ]}
        >
          {trip.distance}
        </Text>
        <Text style={[defaultText, { color: colors.text, flex: 5 }]}>km</Text>
      </View>
      <View style={[rowCenter, { flex: 3 }]}>
        <Text
          style={[
            defaultText,
            { color: colors.text, flex: 6, textAlign: 'right', marginRight: 3 },
          ]}
        >
          {trip.height_difference} m
        </Text>
        <Text style={[defaultText, { color: colors.text, flex: 5 }]}>D+</Text>
      </View>
      <View style={[rowCenter, { flex: 2 }]}>
        <Text
          style={[
            defaultText,
            mr10,
            { color: colors.text, flex: 1, textAlign: 'right' },
          ]}
        >
          {trip.supplies}
        </Text>
        <Text style={[defaultText, mr10, { color: colors.text, flex: 3 }]}>
          ravitos
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default TripCard

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
})
