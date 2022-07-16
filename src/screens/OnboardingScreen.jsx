/**
 * Screen s'ouvrant lors de la première utilisation de l'application
 * Elle permet d'expliquer, en bref, l'application et son fonctionnement
 */
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Onboarding from 'react-native-onboarding-swiper'
import {
  blueColor,
  pinkColor,
  primaryColor,
  defaultText,
  defaultTitle,
  whiteColor,
  defaultSubTitle,
  mt10,
  darkColor,
} from '../assets/styles/styles'

/**
 * Permet de créer un bouton Next personnalisé
 */
const NextComponent = ({ ...props }) => (
  <TouchableOpacity {...props} style={{ marginHorizontal: 10 }}>
    <Text style={[defaultText, { color: darkColor, paddingHorizontal: 10 }]}>
      Suivant
    </Text>
  </TouchableOpacity>
)

/**
 * Permet de créer un bouton Done personnalisé
 */
const DoneComponent = ({ ...props }) => (
  <TouchableOpacity {...props} style={{ marginHorizontal: 10 }}>
    <Text style={[defaultText, { color: darkColor, paddingHorizontal: 10 }]}>
      Fin
    </Text>
  </TouchableOpacity>
)

/**
 * Permet de créer des Dots personnalisés
 */
const DotsComponent = ({ selected }) => {
  const backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)'
  return <View style={[styles.dot, { backgroundColor }]} />
}

const OnboardingScreen = ({ navigation }) => {
  const goToRegister = async () => {
    await AsyncStorage.setItem('alreadyLaunched', 'true')
    navigation.navigate('Register')
  }

  return (
    <Onboarding
      showSkip={false}
      onDone={goToRegister}
      NextButtonComponent={NextComponent}
      DoneButtonComponent={DoneComponent}
      DotComponent={DotsComponent}
      controlStatusBar={false}
      pages={[
        {
          backgroundColor: primaryColor,
          image: <Image source={require('../assets/onboarding.jpg')} />,
          title: (
            <Text style={[defaultTitle, { color: whiteColor }]}>KiRoulOu</Text>
          ),
          subtitle: (
            <Text style={[defaultText, { paddingHorizontal: 10 }]}>
              Permet de trouver une randonnée référencée par les clubs et
              associations
            </Text>
          ),
        },
        {
          backgroundColor: pinkColor,
          image: <Image source={require('../assets/onboarding.jpg')} />,
          title: (
            <Text style={[defaultSubTitle, { color: whiteColor }]}>
              Simple et rapide !
            </Text>
          ),
          subtitle: (
            <Text style={[defaultText, mt10, { paddingHorizontal: 10 }]}>
              Recherchez une randonnée en quelques clics.
            </Text>
          ),
        },
        {
          backgroundColor: blueColor,
          image: <Image source={require('../assets/onboarding.jpg')} />,
          title: (
            <Text style={[defaultSubTitle, { color: whiteColor }]}>
              Hype & Share !
            </Text>
          ),
          subtitle: (
            <Text style={[defaultText, mt10, { paddingHorizontal: 10 }]}>
              Suivez les avancées des randonnées et partagez les.
            </Text>
          ),
        },
      ]}
    />
  )
}

const styles = StyleSheet.create({
  dot: {
    width: 6,
    height: 6,
    marginHorizontal: 3,
    borderRadius: 50,
  },
})

export default OnboardingScreen
