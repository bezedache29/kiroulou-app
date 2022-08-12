import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { AppContext } from '../context/Context'

const SplashScreen = ({ navigation }) => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null)

  const { toggleTheme } = useContext(AppContext)

  /**
   * Permet de check si le user a dejà ouvert l'application et donc de skip ou non le Onboarding
   */
  const checkIsFirstLauch = async () => {
    const localStorageValue = await AsyncStorage.getItem('alreadyLaunched')

    if (localStorageValue && localStorageValue !== '') {
      setIsFirstLaunch(false)
      navigation.navigate('Register')
      // navigation.navigate('Drawer')
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
    // AsyncStorage.removeItem('alreadyLaunched').then(() => {
    //   setIsFirstLaunch(true)
    // })

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
