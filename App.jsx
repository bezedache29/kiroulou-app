import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage'

import OnboardingScreen from './src/screens/OnboardingScreen'
import HomeScreen from './src/screens/HomeScreen'
import LoginScreen from './src/screens/auth/LoginScreen'
import RegisterScreen from './src/screens/auth/RegisterScreen'

const AppStack = createNativeStackNavigator()

const App = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null)

  /**
   * Permet de check si le user a dejà ouvert l'application et donc de skip ou non le Onboarding
   */
  const checkIsFirstLauch = async () => {
    const localStorageValue = await AsyncStorage.getItem('alreadyLaunched')

    if (localStorageValue && localStorageValue !== '') {
      setIsFirstLaunch(false)
    } else {
      setIsFirstLaunch(true)
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

  if (isFirstLaunch === true) {
    return (
      <NavigationContainer>
        <AppStack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <AppStack.Screen name="Onboarding" component={OnboardingScreen} />
          <AppStack.Screen name="Register" component={RegisterScreen} />
          <AppStack.Screen name="Home" component={HomeScreen} />
          <AppStack.Screen name="Login" component={LoginScreen} />
        </AppStack.Navigator>
      </NavigationContainer>
    )
  }

  return <RegisterScreen />
}

export default App
