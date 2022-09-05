/**
 * Screen s'ouvrant lors de la première utilisation de l'application
 * Elle permet d'expliquer, en bref, l'application et son fonctionnement
 */
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Onboarding from 'react-native-onboarding-swiper'
import {
  primaryColor,
  defaultText,
  defaultSubTitle,
  mt10,
  darkColor,
  beigeColor,
  secondaryColor,
  ivoryColor,
} from '../assets/styles/styles'
import useConnection from '../hooks/useConnection'

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
  const { haveItemStorage } = useConnection()
  // A la fin du Onboarding, On met une cle en storage et on redirect vers SplashScreen
  const goToSplash = async () => {
    const token = await haveItemStorage('kro_auth_token')
    if (!token) {
      await AsyncStorage.setItem('kro_alreadyLaunched', 'true')
      await AsyncStorage.setItem('kro_firstLaunched', 'true')
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'Splash' }],
    })
  }

  return (
    <Onboarding
      showSkip={false}
      onDone={goToSplash}
      NextButtonComponent={NextComponent}
      DoneButtonComponent={DoneComponent}
      DotComponent={DotsComponent}
      controlStatusBar={false}
      pages={[
        {
          backgroundColor: primaryColor,
          image: (
            <Image
              source={require('../assets/ressources/logo-sans-fond-380.png')}
            />
          ),
          title: <Text />,
          subtitle: (
            <Text style={[defaultText, { paddingHorizontal: 10 }]}>
              Permet de trouver une randonnée VTT référencée par les clubs,
              associations et toutes autres personnes oragnisant une randonnée.
            </Text>
          ),
        },
        {
          backgroundColor: beigeColor,
          image: (
            <Image
              source={require('../assets/images/png/guide/guide1-380-removebg-preview.png')}
            />
          ),
          title: (
            <Text style={[defaultSubTitle, { color: darkColor }]}>
              Article & Club !
            </Text>
          ),
          subtitle: (
            <Text style={[defaultText, mt10, { paddingHorizontal: 10 }]}>
              Créez votre club et devenez administrateur de celui ci. Créez vos
              articles et partagez les à la communauté simplement en quelques
              clics.
            </Text>
          ),
        },
        {
          backgroundColor: ivoryColor,
          image: (
            <Image
              source={require('../assets/images/png/guide/guide2-380-removebg-preview.png')}
            />
          ),
          title: (
            <Text style={[defaultSubTitle, { color: darkColor }]}>
              Article & Rando !
            </Text>
          ),
          subtitle: (
            <Text style={[defaultText, mt10, { paddingHorizontal: 10 }]}>
              Créez vos articles et vos randos vtt. Cette dernière action est
              réservé aux créateur de club.
            </Text>
          ),
        },
        {
          backgroundColor: secondaryColor,
          image: (
            <Image
              source={require('../assets/images/png/guide/Sans_titre_13-380-removebg-preview.png')}
            />
          ),
          title: (
            <Text style={[defaultSubTitle, { color: darkColor }]}>
              Calendrier
            </Text>
          ),
          subtitle: (
            <Text style={[defaultText, mt10, { paddingHorizontal: 10 }]}>
              Réservé aux membres premium. Vous pouvez rechercher et afficher
              des randonnées VTT dans un département sélectionné, les ou le mois
              souhaité
            </Text>
          ),
        },
        {
          backgroundColor: primaryColor,
          image: (
            <Image source={require('../assets/images/png/guide/guide14.png')} />
          ),
          title: (
            <Text
              style={[defaultSubTitle, { color: darkColor, marginTop: -40 }]}
            >
              Randonnées
            </Text>
          ),
          subtitle: (
            <Text style={[defaultText, mt10, { paddingHorizontal: 10 }]}>
              Recherchez & trouvez des randos vtt autour de vous, et swipez les
              cartes en bas pour voir le lieu de la randonnée.
            </Text>
          ),
        },
        {
          backgroundColor: secondaryColor,
          image: (
            <Image source={require('../assets/images/png/guide/guide15.png')} />
          ),
          title: (
            <Text
              style={[defaultSubTitle, { color: darkColor, marginTop: -20 }]}
            >
              Hype & Notifs !
            </Text>
          ),
          subtitle: (
            <Text style={[defaultText, mt10, { paddingHorizontal: 10 }]}>
              Hype des randos pour être rappelé par notifications lorsque la
              date approche.
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
