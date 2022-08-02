import { Animated, Dimensions } from 'react-native'
import React from 'react'

const { width } = Dimensions.get('window')
const SPACING_FOR_CARD_INSET = width * 0.1 - 10

const CustomCarousel = ({ children, snapToInterval, style, animation }) => (
  <Animated.ScrollView
    horizontal
    scrollEventThrottle={1}
    disableIntervalMomentum
    showsHorizontalScrollIndicator={false}
    style={style}
    pagingEnabled
    snapToInterval={snapToInterval}
    snapToAlignment="center"
    contentInset={{
      top: 0,
      left: SPACING_FOR_CARD_INSET,
      bottom: 0,
      right: SPACING_FOR_CARD_INSET,
    }}
    contentContainerStyle={{
      paddingHorizontal: 0,
    }}
    onScroll={Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: animation,
            },
          },
        },
      ],
      { useNativeDriver: true }
    )}
  >
    {children}
  </Animated.ScrollView>
)

export default CustomCarousel
