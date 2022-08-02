import { View, Text } from 'react-native'
import React from 'react'

import { useTheme } from 'react-native-paper'

const HikeScreen = () => {
  const { colors } = useTheme()
  return (
    <View>
      <Text>HikeScreen</Text>
    </View>
  )
}

export default HikeScreen
