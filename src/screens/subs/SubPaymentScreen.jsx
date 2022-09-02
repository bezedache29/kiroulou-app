import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from 'react-native-paper'

import { useStripe } from '@stripe/stripe-react-native'

import {
  defaultText,
  mt20,
  mx10,
  my10,
  textAlignCenter,
} from '../../assets/styles/styles'

import CustomContainer from '../../components/CustomContainer'
import CustomBigButton from '../../components/CustomBigButton'
import useAxios from '../../hooks/useAxios'
import ReinsuranceElement from '../../components/Payment/ReinsuranceElement'
import CustomLoader from '../../components/CustomLoader'
import useCustomToast from '../../hooks/useCustomToast'

const securityPNG = require('../../assets/images/png/payment/security.png')
const cardsPNG = require('../../assets/images/png/payment/cards.png')
const faqPNG = require('../../assets/images/png/payment/faq.png')
const satisfiedOrRefundedPNG = require('../../assets/images/png/payment/satisfiedOrRefunded.png')

const SubPaymentScreen = ({ navigation, route }) => {
  const { colors } = useTheme()
  const { axiosPostWithToken, axiosGetWithToken } = useAxios()
  const { initPaymentSheet, presentPaymentSheet } = useStripe()
  const { toastShow } = useCustomToast()

  const { premium } = route.params

  const [loader, setLoader] = useState(false)
  const [loading, setLoading] = useState(false)
  const [subTypeId, setSubTypeId] = useState(1)

  // On initialise un paiement au chargement du screen
  useEffect(() => {
    console.log('premium', premium)
    setSubTypeId(premium.nickname === 'Premium 1' ? 1 : 2)
    // initializePaymentSheet()
  }, [])

  // Permet d'initialiser un paiement d'abonnement depuis l'api
  const fetchPaymentSheetParams = async () => {
    // Check si y a un abonnement en cours et qui n'a pas déjà été annulé. Si c'est le cas il faut annulé celui en cours avant de créer un nouveau
    const res = await axiosGetWithToken('subscriptions/check')

    let subInProgressId = false

    if (res.status === 200) {
      // On stock l'abonnement a annuler
      subInProgressId = res.data
    }

    if (res.status === 202) {
      subInProgressId = res.data
    }

    console.log('subInProgressId', subInProgressId)

    const response = await axiosPostWithToken('subscriptions/subscribe', {
      price_id: premium.id,
    })

    console.log('subscribe', response.data)

    if (response.status !== 200) {
      console.log(`error request fetchPaymentSheetParams ${response.status}`)
      toastShow({
        title: 'Acction impossible !',
        message: `Une erreur durant l'initiation de paiement. Réessayez plus tard (${response.status})`,
      })
    }

    const { subscriptionId, clientSecret, ephemeralKey, customer } =
      response.data

    return {
      ephemeralKey,
      customer,
      clientSecret,
      subscriptionId,
      subInProgressId,
    }
  }

  // Permet de récupérer les infos de l'intention de paiement
  const initializePaymentSheet = async () => {
    const {
      clientSecret,
      ephemeralKey,
      customer,
      subscriptionId,
      subInProgressId,
    } = await fetchPaymentSheetParams()

    const { error } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: clientSecret,
      merchantDisplayName: 'Kiroulou Premiums',
      allowsDelayedPaymentMethods: true,
    })
    if (error) {
      console.log('error', error)
      toastShow({
        title: 'Acction impossible !',
        message: `Une erreur durant l'initiation de paiement. Réessayez plus tard`,
      })
    }
    // setLoader(true)
    return {
      subscriptionId,
      subInProgressId,
    }
  }

  // Ouvre la modal de paiement stripe
  const openPaymentSheet = async () => {
    setLoader(true)
    // On initialize un intention de paiement
    const { subscriptionId, subInProgressId } = await initializePaymentSheet()
    setLoader(false)
    const { error } = await presentPaymentSheet()

    if (error) {
      toastShow({
        title: `Error code: ${error.code}`,
        message: error.message,
        type: 'Toast_danger',
      })
      // console.log(`Error code: ${error.code}`, error.message)
      // console.log('subId', subscriptionId)
      // On delete l'intention de paiement créé a l'instant
      await axiosPostWithToken('subscriptions/delete', {
        subscription_id: subscriptionId,
      })
    } else {
      // console.log('subscriptionId 12', subscriptionId)
      // console.log('subInProgressId 12', subInProgressId)
      setLoading(true)
      // On envoie le l'id du sub qui a été créé sur Stripe, l'id du type du sub, l'id du prix et le sub en cours s'il existe
      const response = await axiosPostWithToken('subscriptions/create', {
        subscription_id: subscriptionId,
        subscription_type_id: subTypeId,
        price_id: premium.id,
        sub_in_progress_id: subInProgressId,
      })

      if (response.status !== 201) {
        console.log(`error request fetchPaymentSheetParams ${response.status}`)
      } else {
        toastShow({
          title: 'Bravo et merci !',
          message: `Vous êtes désormais un membre premium KiRoulOu`,
        })
        navigation.reset({
          index: 0,
          routes: [{ name: 'SubSuccess', params: { sub: response.data.sub } }],
        })
      }

      console.log('subs-created', response.data)
    }

    setLoading(false)
  }

  if (loading) {
    return <CustomLoader />
  }

  return (
    <CustomContainer
      label={`Abonnement à ${premium.nickname}`}
      pressBack={() => navigation.goBack()}
    >
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <ReinsuranceElement
            text="Toutes les cartes acceptées"
            image={cardsPNG}
          />
          <ReinsuranceElement
            text="Paiement 100% sécurisé"
            image={securityPNG}
          />
        </View>

        <View style={{ flexDirection: 'row' }}>
          <ReinsuranceElement
            text="Service Après Vente 7jours / 7"
            image={faqPNG}
          />
          <ReinsuranceElement
            text="Satisfait ou remboursé"
            image={satisfiedOrRefundedPNG}
          />
        </View>

        <View style={[mx10, my10]}>
          <Text
            style={[defaultText, textAlignCenter, mt20, { color: colors.text }]}
          >
            Abonnement {premium.nickname} - {premium.amount / 100} € / mois
          </Text>
          <CustomBigButton
            loading={loader}
            label="Valider et Payer"
            disabled={loader}
            onPress={openPaymentSheet}
          />
        </View>
      </View>
    </CustomContainer>
  )
}

export default SubPaymentScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
})
