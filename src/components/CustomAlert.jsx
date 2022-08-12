import React from 'react'

import { useTheme } from 'react-native-paper'

import AwesomeAlert from 'react-native-awesome-alerts'
import {
  cancelColor,
  darkPrimaryColor,
  defaultText,
  TitleH3,
} from '../assets/styles/styles'

const CustomAlert = ({
  showAlert,
  title,
  message,
  confirmText = 'Oui',
  cancelText = 'Non',
  onDismiss,
  onCancelPressed,
  onConfirmPressed,
  titleStyle,
  messageStyle,
  backgroundColor,
  showConfirmButton = true,
  showCancelButton = true,
}) => {
  const { colors } = useTheme()

  return (
    <AwesomeAlert
      show={showAlert}
      showProgress={!showAlert}
      title={title}
      message={message}
      closeOnTouchOutside
      closeOnHardwareBackPress={false}
      showCancelButton={showCancelButton}
      showConfirmButton={showConfirmButton}
      cancelText={cancelText}
      confirmText={confirmText}
      confirmButtonColor={darkPrimaryColor}
      cancelButtonColor={cancelColor}
      cancelButtonTextStyle={defaultText}
      confirmButtonTextStyle={defaultText}
      onDismiss={onDismiss}
      contentContainerStyle={{
        backgroundColor: backgroundColor || colors.background,
      }}
      titleStyle={[TitleH3, { color: colors.text }, titleStyle]}
      messageStyle={[defaultText, { color: colors.text }, messageStyle]}
      onCancelPressed={onCancelPressed}
      onConfirmPressed={onConfirmPressed}
    />
  )
}

export default CustomAlert
