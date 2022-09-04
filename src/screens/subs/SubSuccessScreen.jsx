import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { useTheme } from 'react-native-paper'

import { useStoreState } from 'easy-peasy'

import Lottie from 'lottie-react-native'
import {
  darkPrimaryColor,
  defaultText,
  defaultTextBold,
  mb20,
  textAlignCenter,
  TitleH3,
} from '../../assets/styles/styles'

import CustomButton from '../../components/CustomButton'

const SubSuccessScreen = ({ navigation, route }) => {
  const { colors } = useTheme()

  const { sub } = route.params

  const userStore = useStoreState((state) => state.user)
  const { user } = userStore

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Lottie
          source={require('../../assets/lottie/success.json')}
          autoPlay
          loop={false}
        />
      </View>
      <View style={styles.content}>
        <Text style={[TitleH3, textAlignCenter, mb20, { color: colors.text }]}>
          SUCCESS DU PAIEMENT
        </Text>
        <Text
          style={[
            defaultTextBold,
            textAlignCenter,
            mb20,
            { color: darkPrimaryColor },
          ]}
        >
          Merci pour votre abonnement !
        </Text>
        <Text
          style={[defaultText, mb20, textAlignCenter, { color: colors.text }]}
        >
          Votre paiement de {sub.plan.amount / 100} € à KiRoulOu a été effectué
          avec succès.
        </Text>
        <Text
          style={[defaultText, textAlignCenter, mb20, { color: colors.text }]}
        >
          Vous pouvez dès à présent profiter des fonctions {sub.plan.nickname}{' '}
          dans l'application
        </Text>
        <Text
          style={[defaultText, mb20, textAlignCenter, { color: colors.text }]}
        >
          Vous allez recevoir de la part de Stripe votre reçu de paiement sur
          votre adresse e-mail : {user.email}
        </Text>
        <Text
          style={[defaultText, mb20, textAlignCenter, { color: colors.text }]}
        >
          Vous pouvez le retrouver également dans la rubrique facturation de
          l'application.
        </Text>
        <CustomButton
          btnStyle={styles.btn}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Splash' }],
            })
          }}
        >
          <Text>Retour à l'accueil</Text>
        </CustomButton>
      </View>
    </View>
  )
}

export default SubSuccessScreen

const styles = StyleSheet.create({
  content: {
    flex: 2,
    paddingHorizontal: 10,
  },
  btn: {
    marginTop: 'auto',
    marginBottom: 80,
  },
})
