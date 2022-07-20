import { createContext } from 'react'

export const AppContext = createContext()
export const TabContext = createContext({
  opened: false,
  toggleOpened: () => {},
})
