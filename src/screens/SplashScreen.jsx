import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SplashScreen = ({ navigation }) => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null)

  /**
   * Permet de check si le user a dejà ouvert l'application et donc de skip ou non le Onboarding
   */
  const checkIsFirstLauch = async () => {
    const localStorageValue = await AsyncStorage.getItem('alreadyLaunched')

    if (localStorageValue && localStorageValue !== '') {
      setIsFirstLaunch(false)
      navigation.navigate('Register')
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
