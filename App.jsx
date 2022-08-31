import React from 'react'

import { Provider as PaperProvider } from 'react-native-paper'

import { StripeProvider } from '@stripe/stripe-react-native'

import { StoreProvider } from 'easy-peasy'
import { STRIPE_TEST } from 'react-native-dotenv'
import { ToastProvider } from 'react-native-toast-notifications'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import useMyTheme from './src/hooks/useMyTheme'

import { AppContext } from './src/context/Context'
import useAppContext from './src/context/AppContext'

import CustomStatusBar from './src/components/CustomStatusBar'
import AppRouter from './src/router/AppRouter'
import { TabContextProvider } from './src/context/TabContext'

import GlobalStore from './src/store/store'
import CustomToast from './src/components/Toast/CustomToast'

const App = () => {
  // Hooks
  const { appContext, isDarkTheme } = useAppContext()
  const { CustomDarkTheme, CustomDefaultTheme } = useMyTheme()

  // Theme
  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme

  return (
    <StripeProvider publishableKey={STRIPE_TEST}>
      <StoreProvider store={GlobalStore}>
        <ToastProvider
          placement="top"
          dangerIcon={<MaterialCommunityIcons name="close" color="#fff" />}
          successIcon={
            <MaterialCommunityIcons name="check" color="#fff" size={18} />
          }
          offset={10}
          swipeEnabled
          renderType={{
            toast_success: (toast) => (
              <CustomToast toast={toast} type="success" />
            ),
            toast_warning: (toast) => (
              <CustomToast toast={toast} type="warning" />
            ),
            toast_danger: (toast) => (
              <CustomToast toast={toast} type="danger" />
            ),
            toast_info: (toast) => <CustomToast toast={toast} type="info" />,
          }}
        >
          <PaperProvider theme={theme}>
            <AppContext.Provider value={appContext}>
              <TabContextProvider>
                <CustomStatusBar isDarkTheme={isDarkTheme} />
                <AppRouter theme={theme} />
              </TabContextProvider>
            </AppContext.Provider>
          </PaperProvider>
        </ToastProvider>
      </StoreProvider>
    </StripeProvider>
  )
}

export default App
