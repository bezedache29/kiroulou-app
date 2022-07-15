import React, { useEffect, useMemo, useState } from 'react'
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper'

import OnboardingScreen from './src/screens/OnboardingScreen'
import HomeScreen from './src/screens/HomeScreen'
import LoginScreen from './src/screens/auth/LoginScreen'
import RegisterScreen from './src/screens/auth/RegisterScreen'
import { AppContext } from './src/components/Context'
import { darkColor, whiteColor } from './src/assets/styles/styles'

const AppStack = createNativeStackNavigator()

const App = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null)
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: whiteColor,
      text: darkColor,
    },
  }

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: darkColor,
      text: whiteColor,
    },
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme

  const appContext = useMemo(() => ({
    toggleTheme: () => {
      setIsDarkTheme(!isDarkTheme)
    },
  }))

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

  return (
    <PaperProvider theme={theme}>
      <AppContext.Provider value={appContext}>
        <NavigationContainer theme={theme}>
          <AppStack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            {isFirstLaunch && (
              <AppStack.Screen name="Onboarding" component={OnboardingScreen} />
            )}
            <AppStack.Screen name="Register" component={RegisterScreen} />
            <AppStack.Screen name="Home" component={HomeScreen} />
            <AppStack.Screen name="Login" component={LoginScreen} />
          </AppStack.Navigator>
        </NavigationContainer>
      </AppContext.Provider>
    </PaperProvider>
  )
}

export default App
