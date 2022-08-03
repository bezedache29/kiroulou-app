import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { useTheme } from 'react-native-paper'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {
  darkColor,
  darkPrimaryColor,
  defaultText,
  defaultTextBold,
  mb10,
  mt10,
  rowCenter,
  secondaryColor,
  textAlignCenter,
  TitleH3,
} from '../../assets/styles/styles'

import CustomBox from '../CustomBox'
import WeatherCard from './WeatherCard'
import useUtils from '../../hooks/useUtils'
import useWeather from '../../hooks/useWeather'

const WeatherModal = ({ weather }) => {
  const { colors } = useTheme()
  const { formatTimeFromTimestamp, getDay } = useUtils()
  const { formatWind, getDirection, weatherIcon } = useWeather()

  // console.log(getDay(1659563934407))

  return (
    <>
      <Text
        style={[TitleH3, textAlignCenter, { color: colors.text }, styles.title]}
      >
        Prévisions météo
      </Text>

      <View style={{ flex: 1 }}>
        {/* Bloc du haut */}
        <View style={[rowCenter, styles.containerBox]}>
          {/* Ciel */}
          <CustomBox style={styles.customBox}>
            <WeatherCard
              icon={weather.current.weather[0].icon}
              data={weather.current.weather[0].description}
            />
          </CustomBox>

          {/* Température */}
          <CustomBox style={styles.customBox}>
            <WeatherCard
              icon="temp"
              text="Ressenti :"
              data={`${Math.round(weather.current.feels_like)} °C`}
            />
          </CustomBox>
        </View>

        {/* Bloc du bas */}
        <View style={[rowCenter, mt10]}>
          {/* Soleil */}
          <CustomBox style={styles.customBox}>
            <WeatherCard
              icon="sunrise"
              text="Soleil :"
              data={formatTimeFromTimestamp(weather.current.sunrise)}
            />
          </CustomBox>

          {/* Vent */}
          <CustomBox style={styles.customBox}>
            <WeatherCard
              icon="wind"
              text="Vent :"
              data={`${Math.round(
                formatWind(weather.current.wind_speed)
              )} km/h`}
            />
          </CustomBox>
        </View>

        {/* Icone direction du vent */}
        <CustomBox style={{ flex: 1 }}>
          <Image
            source={require('../../assets/images/png/weather-icons/down-arrow.gif')}
            style={[
              styles.arrow,
              {
                transform: [{ rotate: `${weather.current.wind_deg}deg` }],
              },
            ]}
          />
          <Text
            style={[defaultText, textAlignCenter, mt10, { color: colors.text }]}
          >
            Vent venant de : {getDirection(weather.current.wind_deg)}
          </Text>
        </CustomBox>

        {/* Prévision météo sur plusieurs jours */}
        <CustomBox style={styles.weathers}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            fadingEdgeLength={50}
          >
            {weather.daily.map((day, index) => (
              <View
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                style={styles.weatherCard}
              >
                <Text style={[defaultText, mt10, { color: darkColor }]}>
                  {getDay(day.dt)}
                </Text>
                <Image
                  source={weatherIcon(day.weather[0].icon)}
                  style={styles.weatherCardIcon}
                />
                <Text style={[defaultText, { color: darkColor }]}>Matin</Text>
                <Text
                  style={[
                    defaultTextBold,
                    mb10,
                    { color: darkColor, fontSize: 20 },
                  ]}
                >
                  {Math.round(day.feels_like.morn)} °C
                </Text>
                <Text style={[defaultText, { color: darkColor }]}>Vent</Text>
                <Text style={[defaultText, { color: darkColor }]}>
                  {Math.round(formatWind(day.wind_speed))} km/h
                </Text>
                <View style={mt10}>
                  <View
                    style={{ transform: [{ rotate: `${day.wind_deg}deg` }] }}
                  >
                    <MaterialCommunityIcons
                      name="arrow-down-thin"
                      size={35}
                      color={darkPrimaryColor}
                    />
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </CustomBox>
      </View>
    </>
  )
}

export default WeatherModal

const styles = StyleSheet.create({
  title: {
    marginTop: -40,
    marginBottom: 10,
  },
  containerBox: {
    justifyContent: 'space-between',
  },
  customBox: {
    margin: 0,
    width: '45%',
    marginHorizontal: 10,
  },
  arrow: {
    width: 80,
    height: 80,
    alignSelf: 'center',
  },
  weathers: {
    flex: 2,
    margin: 0,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  weatherCard: {
    backgroundColor: secondaryColor,
    height: 230,
    width: 100,
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 30,
  },
  weatherCardIcon: {
    width: 70,
    height: 70,
    marginVertical: -5,
  },
})
