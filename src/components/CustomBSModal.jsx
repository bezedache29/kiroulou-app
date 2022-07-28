/**
 * Custom BottomSheet
 */
import { StyleSheet, Text, View } from 'react-native'
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react'

import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useTheme } from 'react-native-paper'
import {
  darkColor,
  mb10,
  textAlignCenter,
  TitleH4,
} from '../assets/styles/styles'

const CustomBSModal = forwardRef(
  ({ children, title, onDismiss, SP = ['25%', '50%'] }, ref) => {
    const { colors } = useTheme()

    // ref
    const bottomSheetModalRef = useRef(null)

    // variables
    const snapPoints = useMemo(() => SP, [])

    // callbacks
    const openBottomSheet = useCallback(() => {
      bottomSheetModalRef.current?.present()
    }, [])
    const closeBottomSheet = useCallback(() => {
      bottomSheetModalRef.current?.dismiss()
    }, [])
    // const handleSheetChanges = useCallback((index) => {
    //   console.log('handleSheetChanges', index)
    // }, [])

    // Permet d'envoyer au parent la fonction d'ouverture
    useImperativeHandle(ref, () => ({ openBottomSheet, closeBottomSheet }), [
      openBottomSheet,
      closeBottomSheet,
    ])

    return (
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        animateOnMount
        onDismiss={onDismiss}
        handleIndicatorStyle={{
          backgroundColor: colors.reverseText,
        }}
        handleStyle={[
          styles.handleStyle,
          {
            backgroundColor: colors.text,
          },
        ]}
        style={[
          styles.container,
          {
            borderColor: colors.text,
          },
        ]}
        backgroundStyle={[
          styles.background,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        <View style={styles.contentContainer}>
          <Text
            style={[textAlignCenter, TitleH4, mb10, { color: colors.text }]}
          >
            {title}
          </Text>
          {children}
        </View>
      </BottomSheetModal>
    )
  }
)

export default CustomBSModal

const styles = StyleSheet.create({
  handleStyle: {
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingVertical: 13,
    borderColor: darkColor,
    borderWidth: 3,
  },
  container: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  background: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 20,
  },
})
