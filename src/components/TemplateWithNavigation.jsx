import { SafeAreaView } from 'react-native'
import React from 'react'

import { useTheme } from 'react-native-paper'
import CustomLabelNavigation from './CustomLabelNavigation'

const TemplateWithNavigation = ({ navigationNavigate, label, children }) => {
  const { colors } = useTheme()
  return (
    <SafeAreaView style={[{ backgroundColor: colors.background, flex: 1 }]}>
      <CustomLabelNavigation
        label={label}
        colors={colors}
        onPress={navigationNavigate}
      />
      {children}
    </SafeAreaView>
  )
}

export default TemplateWithNavigation
