import React from 'react'

import { Provider as PaperProvider } from 'react-native-paper'

import { StripeProvider } from '@stripe/stripe-react-native'

import { StoreProvider } from 'easy-peasy'
import { STRIPE_TEST } from 'react-native-dotenv'
import useMyTheme from './src/hooks/useMyTheme'

import { AppContext } from './src/context/Context'
import useAppContext from './src/context/AppContext'

import CustomStatusBar from './src/components/CustomStatusBar'
import AppRouter from './src/router/AppRouter'
import { TabContextProvider } from './src/context/TabContext'

import GlobalStore from './src/store/store'

const App = () => {
  // Hooks
  const { appContext, isDarkTheme } = useAppContext()
  const { CustomDarkTheme, CustomDefaultTheme } = useMyTheme()

  // Theme
  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme

  return (
    <StripeProvider publishableKey={STRIPE_TEST}>
      <StoreProvider store={GlobalStore}>
        <PaperProvider theme={theme}>
          <AppContext.Provider value={appContext}>
            <TabContextProvider>
              <CustomStatusBar isDarkTheme={isDarkTheme} />
              <AppRouter theme={theme} />
            </TabContextProvider>
          </AppContext.Provider>
        </PaperProvider>
      </StoreProvider>
    </StripeProvider>
  )
}

export default App
