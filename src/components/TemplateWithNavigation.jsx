import { SafeAreaView, ScrollView } from 'react-native'
import React from 'react'

import { useTheme } from 'react-native-paper'
import CustomLabelNavigation from './CustomLabelNavigation'
import { pb20 } from '../assets/styles/styles'

const TemplateWithNavigation = ({ navigationNavigate, label, children }) => {
  const { colors } = useTheme()
  return (
    <SafeAreaView
      style={[pb20, { backgroundColor: colors.background, flex: 1 }]}
    >
      <CustomLabelNavigation
        label={label}
        colors={colors}
        onPress={navigationNavigate}
      />
      <ScrollView>{children}</ScrollView>
    </SafeAreaView>
  )
}

export default TemplateWithNavigation
