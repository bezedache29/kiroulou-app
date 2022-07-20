import React from 'react'

import { Provider as PaperProvider } from 'react-native-paper'

import useMyTheme from './src/hooks/useMyTheme'
import useMyContext from './src/hooks/useMyContext'

import { AppContext } from './src/context/Context'

import CustomStatusBar from './src/components/CustomStatusBar'
import AppRouter from './src/router/AppRouter'
import { TabContextProvider } from './src/context/TabContext'

const App = () => {
  // Hooks
  const { appContext, isDarkTheme } = useMyContext()
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
