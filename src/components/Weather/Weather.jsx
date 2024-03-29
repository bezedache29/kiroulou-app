import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import axios from 'axios'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { useStoreState } from 'easy-peasy'

import { useTheme } from 'react-native-paper'
import { OWM_KEY } from 'react-native-dotenv'

import { littleTitle, rowCenter, TitleH3 } from '../../assets/styles/styles'
import CustomModal from '../CustomModal'
import useWeather from '../../hooks/useWeather'
import WeatherModal from './WeatherModal'
import CustomLoader from '../CustomLoader'

const Weather = ({ hike }) => {
  const { colors } = useTheme()
  const { weatherIcon } = useWeather()

  const userStore = useStoreState((state) => state.user)
  const { user } = userStore

  const [weather, setWeather] = useState(false)
  const [detailsWeather, setDetailsWeather] = useState(false)

  // Url de l'api météo avec tous les params souhaité
  const apiUrl = (lat, lng) =>
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${OWM_KEY}&lang=fr&units=metric&mode=json`

  // Au chargement du composant
  useEffect(() => {
    requestWeather()
  }, [])

  // Récupère les infos météo de la position de la randonnée
  const requestWeather = async () => {
    const response = await axios.get(apiUrl(hike.address.lat, hike.address.lng))

    setWeather(response.data)
  }

  if (!weather) {
    return <CustomLoader />
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => setDetailsWeather(true)}
        style={[rowCenter]}
        disabled={user.premium !== 'active'}
      >
        <View style={styles.semiCard}>
          <Image
            source={weatherIcon(weather.current.weather[0].icon)}
            style={styles.weatherIcon}
          />
        </View>

        <View style={styles.semiCard}>
          <Text style={[littleTitle, { color: colors.text }]}>Aujourd'hui</Text>

          <Text style={[TitleH3, { color: colors.text }]}>
            {Math.round(weather.current.temp)} °C
          </Text>
        </View>

        {user.premium === 'active' && (
          <MaterialCommunityIcons
            name="arrow-right"
            size={28}
            color={colors.text}
            style={styles.arrow}
          />
        )}
      </TouchableOpacity>

      <CustomModal
        showModal={detailsWeather}
        closeModal={() => setDetailsWeather(false)}
      >
        <WeatherModal weather={weather} />
      </CustomModal>
    </>
  )
}

export default Weather

const styles = StyleSheet.create({
  semiCard: {
    width: '50%',
  },
  weatherIcon: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  arrow: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
})
