import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import React from 'react'

import { useTheme } from 'react-native-paper'

import {
  darkColor,
  darkPrimaryColor,
  defaultText,
  defaultTextBold,
  littleTitle,
  mt5,
  textAlignCenter,
} from '../../assets/styles/styles'

import CustomDivider from '../CustomDivider'
import CustomButton from '../CustomButton'

const { width } = Dimensions.get('window')
const CARD_HEIGHT = 220
const CARD_WIDTH = width * 0.8

const HikesCardCarousel = ({ hike, goToHike }) => {
  const { colors } = useTheme()

  return (
    <View style={[styles.card, { backgroundColor: colors.background }]}>
      <View style={[styles.semiCard, { borderTopLeftRadius: 8 }]}>
        <ImageBackground
          source={{
            uri: hike.flyer,
          }}
          style={{ width: '100%', height: '100%' }}
        />
      </View>
      <View
        style={[
          styles.semiCard,
          {
            borderTopLeftRadius: 8,
            backgroundColor: colors.background,
          },
        ]}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={[
              defaultTextBold,
              textAlignCenter,
              { color: colors.text, padding: 5 },
            ]}
          >
            La Côte des légendes VTT
          </Text>

          <CustomDivider />

          <Text
            style={[
              littleTitle,
              textAlignCenter,
              { color: darkPrimaryColor, padding: 5 },
            ]}
          >
            16/09/2022
          </Text>

          <View style={styles.addressContainer}>
            <Text
              style={[
                defaultText,
                textAlignCenter,
                { color: colors.text, fontSize: 14 },
              ]}
            >
              Stade George Martin
            </Text>
            <Text
              style={[
                defaultText,
                textAlignCenter,
                mt5,
                { color: colors.text, fontSize: 14 },
              ]}
            >
              29260 Lesneven
            </Text>
          </View>

          <View style={styles.btnContainer}>
            <CustomButton onPress={goToHike}>Voir détails</CustomButton>
          </View>
        </View>
      </View>
    </View>
  )
}

export default HikesCardCarousel

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    elevation: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: darkColor,
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden',
  },
  semiCard: {
    width: '50%',
    overflow: 'hidden',
  },
  addressContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    marginHorizontal: 10,
    marginTop: 'auto',
    marginBottom: 10,
  },
})
