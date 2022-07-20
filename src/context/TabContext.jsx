import React, { useContext, useMemo, useState } from 'react'
import { TabContext } from './Context'

export const TabContextProvider = ({ children }) => {
  const [opened, setOpened] = useState(false)

  const tabContext = useMemo(() => ({
    opened,
    toggleOpened: () => {
      setOpened(!opened)
    },
  }))

  return (
    <TabContext.Provider value={tabContext}>{children}</TabContext.Provider>
  )
}

export const useTabMenu = () => useContext(TabContext)
