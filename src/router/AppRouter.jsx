import React from 'react'

import { NavigationContainer } from '@react-navigation/native'

import AppStack from './AppStack'

const AppRouter = ({ theme }) => (
  <NavigationContainer theme={theme}>
    <AppStack />
  </NavigationContainer>
)

export default AppRouter
