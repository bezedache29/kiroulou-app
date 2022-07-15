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
} from '../assets/styles/styles'

/**
 * Permet de créer un bouton Next personnalisé
 */
const NextComponent = ({ ...props }) => (
  <TouchableOpacity {...props} style={{ marginHorizontal: 10 }}>
    <Text style={styles.text}>Suivant</Text>
  </TouchableOpacity>
)

/**
 * Permet de créer un bouton Done personnalisé
 */
const DoneComponent = ({ ...props }) => (
  <TouchableOpacity {...props} style={{ marginHorizontal: 10 }}>
    <Text style={styles.text}>Fin</Text>
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
      pages={[
        {
          backgroundColor: primaryColor,
          image: <Image source={require('../assets/onboarding.jpg')} />,
          title: (
            <Text style={[defaultTitle, { color: whiteColor }]}>KiRoulOu</Text>
          ),
          subtitle: (
            <Text style={defaultText}>
              Une application qui permet de trouver une randonnée référencé par
              les clubs et associations
            </Text>
          ),
        },
        {
          backgroundColor: pinkColor,
          image: <Image source={require('../assets/onboarding.jpg')} />,
          title: 'Onboarding 2',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
        {
          backgroundColor: blueColor,
          image: <Image source={require('../assets/onboarding.jpg')} />,
          title: 'Onboarding 3',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
      ]}
    />
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: '#000000',
  },
  dot: {
    width: 6,
    height: 6,
    marginHorizontal: 3,
    borderRadius: 50,
  },
})

export default OnboardingScreen
