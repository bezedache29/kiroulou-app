import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React from 'react'

import { useTheme } from 'react-native-paper'

import { URL_SERVER } from 'react-native-dotenv'

import {
  defaultText,
  defaultTextBold,
  my5,
  rowCenter,
} from '../../assets/styles/styles'

const CalendarCard = ({ hike, onPress }) => {
  const { colors } = useTheme()

  // console.log('hike', hike)

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        rowCenter,
        styles.container,
        { backgroundColor: colors.backgroundBox },
      ]}
    >
      <View style={{ width: '80%' }}>
        <Text style={[defaultTextBold, { color: colors.text }]}>
          {hike.address.city.name} ({hike.address.department_code})
        </Text>
        <Text style={[defaultText, my5, { color: colors.text }]}>
          {hike.name}
        </Text>
        <Text style={[defaultText, { color: colors.text, fontSize: 16 }]}>
          {hike.club_name}
        </Text>
      </View>
      <View style={{ width: '20%' }}>
        <ImageBackground
          source={{ uri: `${URL_SERVER}/storage/${hike.flyer}` }}
          style={styles.flyer}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  )
}

export default CalendarCard

const styles = StyleSheet.create({
  container: {
    height: 80,
    borderRadius: 8,
    padding: 5,
    elevation: 5,
    marginHorizontal: 5,
    marginTop: 10,
  },
  flyer: {
    width: '100%',
    height: '100%',
  },
})
