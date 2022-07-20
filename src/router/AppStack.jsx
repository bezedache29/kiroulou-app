import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/auth/LoginScreen'
import SplashScreen from '../screens/SplashScreen'
import RegisterScreen from '../screens/auth/RegisterScreen'
import AppDrawer from './AppDrawer'
import OnboardingScreen from '../screens/OnboardingScreen'

const Stack = createNativeStackNavigator()

const AppStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="Drawer" component={AppDrawer} />
  </Stack.Navigator>
)

export default AppStack
