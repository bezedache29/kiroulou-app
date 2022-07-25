import { Dimensions, StyleSheet, View } from 'react-native'

import React, { forwardRef, useCallback, useImperativeHandle } from 'react'

import { Gesture, GestureDetector } from 'react-native-gesture-handler'

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated'

import { darkPrimaryColor, whiteColor } from '../assets/styles/styles'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

const BottomSheet = forwardRef(({ children }, ref) => {
  const translateY = useSharedValue(0)

  // Permet de faire monter la bottomSheet jusqu'a la destination voulu
  // worklet evite les erreurs critique lorsqu'on redescend la bottomSheet
  const scrollTo = useCallback((destination) => {
    // Evite les erreurs

    'worklet'

    translateY.value = withSpring(destination, { damping: 50 }) // damping enleve l'effet bouncing
  }, [])

  // Permet au parent d'utiliser la fonction
  useImperativeHandle(ref, () => ({ scrollTo }), [scrollTo])

  const context = useSharedValue({ y: 0 })

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value }
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.y

      // Permet de ne pas aller dans les chiffres negatifs et donc de ne pas ouvrir la bottomsheet a l'infini
      // Ici on défini la taille du bottomSheet
      translateY.value = Math.max(translateY.value, -SCREEN_HEIGHT)
    })
    .onEnd(() => {
      if (translateY.value > -SCREEN_HEIGHT / 3) {
        scrollTo(-SCREEN_HEIGHT / 7)
      } else if (translateY.value < -SCREEN_HEIGHT / 1.8) {
        scrollTo(-SCREEN_HEIGHT)
      }
    })

  /**
   * Permet de définir la hauter du bottomSheet
   */
  // useEffect(() => {
  //   scrollTo(0)
  // }, [])

  const bottomSheetStyle = useAnimatedStyle(() => {
    // Permet d'enlever le borderRadius lorsque le bottomSheet est en haut de l'ecran
    const borderRadius = interpolate(
      translateY.value,
      [-SCREEN_HEIGHT + 50, -SCREEN_HEIGHT],
      [25, 5],
      Extrapolate.CLAMP
    )
    return {
      borderRadius,
      transform: [{ translateY: translateY.value }],
    }
  })

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.bottomSheetContainer, bottomSheetStyle]}>
        <View style={styles.line} />
        {children}
      </Animated.View>
    </GestureDetector>
  )
})

export default BottomSheet

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: darkPrimaryColor,
    position: 'absolute',
    top: SCREEN_HEIGHT,
    borderRadius: 25,
    zIndex: 2,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: whiteColor,
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 2,
  },
})
