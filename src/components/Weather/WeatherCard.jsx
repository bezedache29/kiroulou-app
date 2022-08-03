import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { useTheme } from 'react-native-paper'

import { defaultText, textAlignCenter } from '../../assets/styles/styles'

import useWeather from '../../hooks/useWeather'

const WeatherCard = ({ icon, text, data }) => {
  const { colors } = useTheme()
  const { weatherIcon } = useWeather()

  return (
    <View style={styles.container}>
      <Image source={weatherIcon(icon)} style={styles.image} />

      <Text style={[defaultText, textAlignCenter, { color: colors.text }]}>
        {text} {data}
      </Text>
    </View>
  )
}

export default WeatherCard

const styles = StyleSheet.create({
  container: {
    // width: '50%',
  },
  image: {
    width: 80,
    height: 80,
    alignSelf: 'center',
  },
})
