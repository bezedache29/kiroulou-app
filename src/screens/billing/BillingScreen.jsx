import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { useTheme } from 'react-native-paper'

import CustomContainer from '../../components/CustomContainer'
import useAxios from '../../hooks/useAxios'
import CustomLoader from '../../components/CustomLoader'
import {
  darkPrimaryColor,
  defaultText,
  mb10,
  mt10,
  mt20,
  my10,
  secondaryColor,
  textAlignCenter,
  TitleH4,
} from '../../assets/styles/styles'
import CustomDivider from '../../components/CustomDivider'
import useUtils from '../../hooks/useUtils'
import CustomButtonInfo from '../../components/CustomButtonInfo'
import CustomModal from '../../components/CustomModal'
import CustomOverlay from '../../components/CustomOverlay'

const BillingScreen = ({ navigation }) => {
  const { colors } = useTheme()
  const { axiosGetWithToken } = useAxios()
  const { formatDateHike, timestampToDate, formatDate } = useUtils()

  const [billing, setBilling] = useState()
  const [loading, setLoading] = useState(true)
  const [openInformation, setOpenInformation] = useState(false)
  const [overlay, setOverlay] = useState(false)

  useEffect(() => {
    loadBilling()
  }, [])

  const loadBilling = async () => {
    const response = await axiosGetWithToken('billing')

    if (response.status === 200) {
      setBilling(response.data)
    }

    setLoading(false)
  }

  return (
    <CustomContainer
      label="Facturation"
      pressBack={() => navigation.goBack()}
      editIcon
      iconName="information"
      onPressEdit={() => {
        setOverlay(true)
        setOpenInformation(true)
      }}
    >
      {overlay && <CustomOverlay />}

      {loading ? (
        <CustomLoader />
      ) : (
        <View style={{ flex: 1, padding: 20 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text
              style={[TitleH4, textAlignCenter, mb10, { color: colors.text }]}
            >
              Informations de paiement
            </Text>

            <Text style={[defaultText, mt10, { color: colors.text }]}>
              {billing.payment_method.type === 'card' && 'Carte'}{' '}
              {billing.payment_method.card.brand.toUpperCase()} |
              {' **** **** **** '}
              {billing.payment_method.card.last4}
            </Text>

            <Text style={[defaultText, mt10, { color: colors.text }]}>
              prochaine date de facturation :
            </Text>
            <Text style={[defaultText, mb10, { color: darkPrimaryColor }]}>
              le{' '}
              {formatDate(
                timestampToDate(billing.sub.current_period_end * 1000)
              )}
            </Text>

            <CustomDivider addStyle={my10} />

            <Text
              style={[TitleH4, textAlignCenter, mb10, { color: colors.text }]}
            >
              Détails du forfait
            </Text>
            <Text style={[defaultText, mb10, { color: colors.text }]}>
              Forfait : {billing.sub.plan.nickname}
            </Text>
            <Text style={[defaultText, mb10, { color: colors.text }]}>
              Prix : {billing.sub.plan.amount / 100} € /{' '}
              {billing.sub.plan.interval === 'month' && 'mois'}
            </Text>
            <Text style={[defaultText, mb10, { color: colors.text }]}>
              Statut :{' '}
              {billing.sub.cancel_at_period_end
                ? 'Arrêt à la fin de la période'
                : 'En cours'}
            </Text>

            <CustomDivider addStyle={my10} />

            <Text
              style={[TitleH4, textAlignCenter, mb10, { color: colors.text }]}
            >
              Période de service
            </Text>
            <Text style={[defaultText, mb10, { color: colors.text }]}>
              Du{' '}
              {formatDateHike(
                timestampToDate(billing.sub.current_period_start * 1000)
              )}{' '}
              au{' '}
              {formatDateHike(
                timestampToDate(billing.sub.current_period_end * 1000)
              )}
            </Text>

            <CustomDivider addStyle={my10} />

            <Text
              style={[TitleH4, textAlignCenter, mb10, { color: colors.text }]}
            >
              Dernière facture
            </Text>
            <CustomButtonInfo
              title="Voir le reçu du dernier paiement"
              onPress={() => Linking.openURL(billing.latest_charge.receipt_url)}
              colors={colors}
              style={[my10, styles.btn]}
              backgroundColor={secondaryColor}
            />

            <CustomButtonInfo
              title="Télécharger la dernière facture"
              onPress={() =>
                Linking.openURL(billing.latest_invoice.invoice_pdf)
              }
              colors={colors}
              style={[my10, styles.btn]}
              backgroundColor={secondaryColor}
            />
          </ScrollView>

          <CustomModal
            showModal={openInformation}
            closeModal={() => {
              setOverlay(false)
              setOpenInformation(false)
            }}
            animation="fade"
            transparent
            closeRight
            style={styles.modal}
          >
            <Text
              style={[TitleH4, textAlignCenter, mt20, { color: colors.text }]}
            >
              Informations Abonnements
            </Text>
            <Text
              style={[
                defaultText,
                styles.textModal,
                mt20,
                {
                  color: colors.text,
                },
              ]}
            >
              Les frais d'abonnement sont facturés au début de chaque période et
              il est possible que vous deviez attendre quelques jours après la
              date de facturation avant que ces frais n'apparaissent sur votre
              compte.
            </Text>
          </CustomModal>
        </View>
      )}
    </CustomContainer>
  )
}

export default BillingScreen

const styles = StyleSheet.create({
  modal: {
    width: '80%',
    alignSelf: 'center',
    marginTop: 250,
    marginBottom: 250,
    borderRadius: 8,
  },
  textModal: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  btn: {
    width: '95%',
    marginHorizontal: 0,
    alignSelf: 'center',
  },
})
