import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'react-native-paper'

import {
  defaultText,
  mb20,
  mt10,
  my20,
  primaryColor,
  px10,
} from '../../assets/styles/styles'

import CustomContainer from '../CustomContainer'
import CustomBigButton from '../CustomBigButton'

const AddHikeLayout = ({
  label,
  step,
  title,
  subTitle,
  children,
  nextStepCondition,
  buttonLabel,
  buttonPress,
}) => {
  const navigation = useNavigation()
  const { colors } = useTheme()

  return (
    <CustomContainer label={label} pressBack={() => navigation.goBack()}>
      <View style={[px10, { flex: 1 }]}>
        <Text style={[defaultText, mt10, styles.step]}>Etape {step}/3</Text>
        <Text style={[defaultText, title && my20, { color: colors.text }]}>
          {title}
        </Text>
        <Text style={[defaultText, mb20, { color: colors.text }]}>
          {subTitle}
        </Text>
        {children}

        {nextStepCondition && (
          <CustomBigButton
            label={buttonLabel}
            onPress={buttonPress}
            style={styles.buttonNextStep}
          />
        )}
      </View>
    </CustomContainer>
  )
}

export default AddHikeLayout

const styles = StyleSheet.create({
  step: {
    color: primaryColor,
    fontSize: 16,
    textAlign: 'right',
  },
  buttonNextStep: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignSelf: 'center',
  },
})
