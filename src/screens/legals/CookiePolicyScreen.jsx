import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from 'react-native-paper'

import { defaultText, mt20 } from '../../assets/styles/styles'

import TermsAndConditionsTemplate from './TermsAndConditions/TermsAndConditionsTemplate'
import CustomRadioButton from '../../components/CustomRadioButton'

const CookiePolicyScreen = ({ navigation }) => {
  const { colors } = useTheme()

  const [cookies, setCookies] = useState(true)

  const refuseCookies = () => {
    if (cookies) {
      setCookies(false)
      // Change les cookies en back
    }
  }

  const acceptCookies = () => {
    if (!cookies) {
      setCookies(true)
      // Change les cookies en back
    }
  }

  return (
    <TermsAndConditionsTemplate
      navigation={navigation}
      title="Définir vos préférences relatives aux cookies"
      route="cookies"
    >
      <Text style={[defaultText, mt20, { color: colors.text }]}>
        Nous utilisons des Cookies tiers non essentiels pour améliorer votre
        expérience, réaliser des analyses et diffuser des annonces pertinentes.
        Veuillez sélectionner vos préférences relatives aux Cookies tiers non
        essentiels ci-dessous. Si vous cliquez sur « Accepter », nous
        utiliserons des Cookies tiers non essentiels. Nous n'en utiliserons pas
        si vous cliquez sur « Refuser ». Vous pouvez modifier vos préférences à
        tout moment.
      </Text>

      <View style={styles.RadioButtonContainer}>
        <CustomRadioButton
          value="cookies"
          status={cookies ? 'checked' : 'unchecked'}
          onPress={acceptCookies}
          label="Accepter"
          colors={colors}
        />
        <CustomRadioButton
          value="cookies"
          status={cookies ? 'unchecked' : 'checked'}
          onPress={refuseCookies}
          label="Refuser"
          colors={colors}
        />
      </View>
    </TermsAndConditionsTemplate>
  )
}

const styles = StyleSheet.create({
  RadioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
})

export default CookiePolicyScreen
