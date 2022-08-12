import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { AppContext } from '../context/Context'
import useConnection from '../hooks/useConnection'

const SplashScreen = ({ navigation }) => {
  const { toggleTheme } = useContext(AppContext)

  const { haveItemStorage, haveAuthToken } = useConnection()

  const [isFirstLaunch, setIsFirstLaunch] = useState(null)

  /**
   * Permet de check si le user a dejà ouvert l'application et donc de skip ou non le Onboarding
   */
  const checkIsFirstLauch = async () => {
    // On va chercher kro_alreadyLaunched en local storage
    const alreadyLaunched = await haveItemStorage('kro_alreadyLaunched')

    // S'il n'existe pas on redirect vers Onboarding
    if (alreadyLaunched) {
      setIsFirstLaunch(false)

      const firstLaunched = await haveItemStorage('kro_firstLaunched')

      if (firstLaunched) {
        await AsyncStorage.removeItem('kro_firstLaunched')
        navigation.reset({
          index: 0,
          routes: [{ name: 'Register' }],
        })
      } else {
        // On check si le user a un auth_token
        // S'il a un auth_token on redirect vars la HomeScreen piloté par Drawer
        // Sinon on redirect vers Login
        await haveAuthToken(
          () =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'Drawer' }],
            }),
          () => navigation.navigate('Login')
        )
      }
    } else {
      setIsFirstLaunch(true)
      navigation.navigate('Onboarding')
    }
  }

  /**
   * Au chargement du screen
   */
  useEffect(() => {
    checkIsFirstLauch()

    AsyncStorage.getItem('darkmode').then((value) => {
      if (value) {
        toggleTheme()
      }
    })
  }, [])

  if (isFirstLaunch == null) {
    // Ici sera le loader Lottie
    return null
  }

  return (
    <View>
      <Text>SplashScreen</Text>
    </View>
  )
}

export default SplashScreen
