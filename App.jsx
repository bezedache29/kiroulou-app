import React from 'react'

import { Provider as PaperProvider } from 'react-native-paper'

import useMyTheme from './src/hooks/useMyTheme'

import { AppContext } from './src/context/Context'
import useAppContext from './src/context/AppContext'

import CustomStatusBar from './src/components/CustomStatusBar'
import AppRouter from './src/router/AppRouter'
import { TabContextProvider } from './src/context/TabContext'

const App = () => {
  // Hooks
  const { appContext, isDarkTheme } = useAppContext()
  const { CustomDarkTheme, CustomDefaultTheme } = useMyTheme()

  // Theme
  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme

  return (
    <PaperProvider theme={theme}>
      <AppContext.Provider value={appContext}>
        <TabContextProvider>
          <CustomStatusBar isDarkTheme={isDarkTheme} />
          <AppRouter theme={theme} />
        </TabContextProvider>
      </AppContext.Provider>
    </PaperProvider>
  )
}

export default App
