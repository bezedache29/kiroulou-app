import { View, Text } from 'react-native'
import React from 'react'

import { useTheme } from 'react-native-paper'

const TrekScreen = () => {
  const { colors } = useTheme()
  return (
    <View>
      <Text>TrekScreen</Text>
    </View>
  )
}

export default TrekScreen
