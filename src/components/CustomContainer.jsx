import { View } from 'react-native'
import React from 'react'

import { useTheme } from 'react-native-paper'

import CustomLabelNavigation from './CustomLabelNavigation'

const CustomContainer = ({ label, pressBack, children, style }) => {
  const { colors } = useTheme()

  return (
    <View style={[{ flex: 1, backgroundColor: colors.background }, style]}>
      <CustomLabelNavigation
        label={label}
        colors={colors}
        onPress={pressBack}
      />
      {children}
    </View>
  )
}

export default CustomContainer
