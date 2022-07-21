import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'

import * as Animatable from 'react-native-animatable'

import { useTheme } from 'react-native-paper'

import {
  defaultContainer,
  mt10,
  mt20,
  mx20,
  my10,
  my30,
  TitleH4,
} from '../../../assets/styles/styles'

import CustomLabelNavigation from '../../../components/CustomLabelNavigation'
import CustomButtonInfo from '../../../components/CustomButtonInfo'

const TermsAndConditionsTemplate = ({ navigation, title, children, route }) => {
  const { colors } = useTheme()
  return (
    <SafeAreaView
      style={[defaultContainer, { backgroundColor: colors.background }]}
    >
      <CustomLabelNavigation
        label="Conditions générales"
        colors={colors}
        onPress={() => navigation.goBack()}
      />

      <ScrollView>
        <View style={mt20} />

        <CustomButtonInfo
          title="Conditions de service"
          onPress={() => {
            navigation.navigate('TermsAndConditions')
          }}
          colors={colors}
          route={route === 'service' ? route : ''}
        />

        <View style={my10} />

        <CustomButtonInfo
          title="Politique en matière de cookies"
          onPress={() => {
            navigation.navigate('CookiePolicy')
          }}
          colors={colors}
          route={route === 'cookies' ? route : ''}
        />

        <View style={my10} />

        <CustomButtonInfo
          title="Fondaments juridiques"
          onPress={() => {
            navigation.navigate('LegalFoundation')
          }}
          colors={colors}
          route={route === 'legal' ? route : ''}
        />
        <Animatable.View animation="fadeInLeftBig" style={[my30, mx20]}>
          <Text style={[TitleH4, { color: colors.text }]}>{title}</Text>
          <View style={mt10}>{children}</View>
        </Animatable.View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default TermsAndConditionsTemplate
