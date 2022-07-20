import { View, Text } from 'react-native'
import React from 'react'

import { useTheme } from 'react-native-paper'

const ClubScreen = () => {
  const { colors } = useTheme()
  return (
    <View>
      <Text>ClubScreen</Text>
    </View>
  )
}

export default ClubScreen
