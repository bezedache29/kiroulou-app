import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/auth/LoginScreen'
import SplashScreen from '../screens/SplashScreen'
import RegisterScreen from '../screens/auth/RegisterScreen'
import AppDrawer from './AppDrawer'
import OnboardingScreen from '../screens/OnboardingScreen'
import SettingsScreen from '../screens/SettingsScreen'
import LegalNoticeScreen from '../screens/legals/LegalNoticeScreen'
import LegalFoundationsScreen from '../screens/legals/LegalFoundationsScreen'
import PrivacyScreen from '../screens/legals/PrivacyScreen'
import CookiePolicyScreen from '../screens/legals/CookiePolicyScreen'
import TermsAndConditionsScreen from '../screens/legals/TermsAndConditions/TermsAndConditionsScreen'
import CancellationScreen from '../screens/legals/TermsAndConditions/TermsOfService/CancellationScreen'
import ConductScreen from '../screens/legals/TermsAndConditions/TermsOfService/ConductScreen'
import SupportAndQuestionsScreen from '../screens/legals/TermsAndConditions/TermsOfService/SupportAndQuestionsScreen'
import TerminationScreen from '../screens/legals/TermsAndConditions/TermsOfService/TerminationScreen'

const Stack = createNativeStackNavigator()

const AppStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    {/* Start */}
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="Onboarding" component={OnboardingScreen} />

    {/* Auth */}
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />

    {/* Divers */}
    <Stack.Screen name="Settings" component={SettingsScreen} />

    {/* Legals */}
    <Stack.Screen name="LegalNotice" component={LegalNoticeScreen} />
    <Stack.Screen name="LegalFoundation" component={LegalFoundationsScreen} />
    <Stack.Screen name="Privacy" component={PrivacyScreen} />
    <Stack.Screen name="CookiePolicy" component={CookiePolicyScreen} />

    {/* Conditions Générales */}
    <Stack.Screen
      name="TermsAndConditions"
      component={TermsAndConditionsScreen}
    />
    <Stack.Screen
      name="SupportAndQuestions"
      component={SupportAndQuestionsScreen}
    />
    <Stack.Screen name="Termination" component={TerminationScreen} />
    <Stack.Screen name="Cancellation" component={CancellationScreen} />
    <Stack.Screen name="Conduct" component={ConductScreen} />

    {/* Drawer */}
    <Stack.Screen name="Drawer" component={AppDrawer} />
  </Stack.Navigator>
)

export default AppStack
