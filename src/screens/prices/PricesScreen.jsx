import { View, Text } from 'react-native'
import React from 'react'

import { useTheme } from 'react-native-paper'

const PricesScreen = () => {
  const { colors } = useTheme()

  return (
    <View>
      <Text>PricesScreen</Text>
    </View>
  )
}

export default PricesScreen
