import { Animated } from 'react-native'
import React, { useRef } from 'react'
import { darkColor, grayColor, overlayBG } from '../assets/styles/styles'

const CustomOverlay = () => {
  const animation = useRef(new Animated.Value(0)).current

  return (
    <Animated.View
      style={[
        overlayBG,
        {
          backgroundColor: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [grayColor, darkColor],
          }),
        },
      ]}
    />
  )
}

export default CustomOverlay
