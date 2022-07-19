import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider as PaperProvider } from 'react-native-paper'

import useMyTheme from './src/hooks/useMyTheme'
import useMyContext from './src/hooks/useMyContext'

import { AppContext } from './src/components/Context'

import OnboardingScreen from './src/screens/OnboardingScreen'
import HomeScreen from './src/screens/HomeScreen'
import LoginScreen from './src/screens/auth/LoginScreen'
import RegisterScreen from './src/screens/auth/RegisterScreen'
import SplashScreen from './src/screens/SplashScreen'
import CustomStatusBar from './src/components/CustomStatusBar'
import ForgotPasswordScreen from './src/screens/auth/ForgotPasswordScreen'
import LegalFoundationsScreen from './src/screens/legals/LegalFoundationsScreen'
import CookiePolicyScreen from './src/screens/legals/CookiePolicyScreen'
import TermsAndConditionsScreen from './src/screens/legals/TermsAndConditions/TermsAndConditionsScreen'
import CancellationScreen from './src/screens/legals/TermsAndConditions/TermsOfService/CancellationScreen'
import ConductScreen from './src/screens/legals/TermsAndConditions/TermsOfService/ConductScreen'
import TerminationScreen from './src/screens/legals/TermsAndConditions/TermsOfService/TerminationScreen'
import SupportAndQuestionsScreen from './src/screens/legals/TermsAndConditions/TermsOfService/SupportAndQuestionsScreen'
import PrivacyScreen from './src/screens/legals/PrivacyScreen'
import LegalNoticeScreen from './src/screens/legals/LegalNoticeScreen'

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
            <AppStack.Screen name="Login" component={LoginScreen} />
            <AppStack.Screen name="LegalNotice" component={LegalNoticeScreen} />
            <AppStack.Screen name="Home" component={HomeScreen} />
            <AppStack.Screen name="Conduct" component={ConductScreen} />
            <AppStack.Screen name="Termination" component={TerminationScreen} />
            <AppStack.Screen name="Privacy" component={PrivacyScreen} />
            <AppStack.Screen
              name="SupportAndQuestions"
              component={SupportAndQuestionsScreen}
            />
            <AppStack.Screen
              name="Cancellation"
              component={CancellationScreen}
            />
            <AppStack.Screen
              name="CookiePolicy"
              component={CookiePolicyScreen}
            />
            <AppStack.Screen
              name="LegalFoundation"
              component={LegalFoundationsScreen}
            />
            <AppStack.Screen
              name="TermsAndConditions"
              component={TermsAndConditionsScreen}
            />
            <AppStack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
          </AppStack.Navigator>
        </NavigationContainer>
      </AppContext.Provider>
    </PaperProvider>
  )
}

export default App
