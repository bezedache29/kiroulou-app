import { createContext } from 'react'

// eslint-disable-next-line import/prefer-default-export
export const AppContext = createContext()
export const TabContext = createContext({
  opened: false,
  toggleOpened: () => {},
})
