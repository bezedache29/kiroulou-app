import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider as PaperProvider } from 'react-native-paper'

import OnboardingScreen from './src/screens/OnboardingScreen'
import HomeScreen from './src/screens/HomeScreen'
import LoginScreen from './src/screens/auth/LoginScreen'
import RegisterScreen from './src/screens/auth/RegisterScreen'

import { AppContext } from './src/components/Context'

import useMyTheme from './src/hooks/useMyTheme'
import useMyContext from './src/hooks/useMyContext'
import SplashScreen from './src/screens/SplashScreen'
import CustomStatusBar from './src/components/CustomStatusBar'

const AppStack = createNativeStackNavigator()

const App = () => {
  // Hooks
  const { appContext, isDarkTheme } = useMyContext()
  const { CustomDarkTheme, CustomDefaultTheme } = useMyTheme()

  // Theme
  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme

  return (
    <PaperProvider theme={theme}>
      <AppContext.Provider value={appContext}>
        <CustomStatusBar isDarkTheme={isDarkTheme} />
        <NavigationContainer theme={theme}>
          <AppStack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <AppStack.Screen name="Splash" component={SplashScreen} />
            <AppStack.Screen name="Onboarding" component={OnboardingScreen} />
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
