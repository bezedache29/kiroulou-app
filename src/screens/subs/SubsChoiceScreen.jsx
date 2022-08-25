import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { useTheme } from 'react-native-paper'

import { useStoreState } from 'easy-peasy'

import {
  darkColor,
  darkPrimaryColor,
  defaultLink,
  defaultText,
  littleTitle,
  mb30,
  ml20,
  mt10,
  mt20,
  mt30,
  mt5,
  mx20,
  secondaryColor,
  textAlignCenter,
} from '../../assets/styles/styles'

import CustomLabelNavigation from '../../components/CustomLabelNavigation'
import CustomBox from '../../components/Clubs/CustomBox'
import CustomModal from '../../components/CustomModal'
import CustomBigButton from '../../components/CustomBigButton'
import AdvantagesModal from '../../components/Subs/AdvantagesModal'
import useAxios from '../../hooks/useAxios'
import CustomLoader from '../../components/CustomLoader'

const SubsChoiceScreen = ({ navigation }) => {
  const { colors } = useTheme()
  const { axiosGetWithToken, axiosPostWithToken } = useAxios()

  const userStore = useStoreState((state) => state.user)
  const { user } = userStore

  // State pour selection du premium
  const [premium, setPremium] = useState(false)
  const [premiumSelected, setPremiumSelected] = useState(1)
  const [premiums, setPremiums] = useState([])
  const [loading, setLoading] = useState(true)

  // State pour selection du premium dans la modal
  const [advantages, setAdvantages] = useState({
    first: false,
    second: false,
  })

  // State pour ouvrir ou non la Modal des avantages
  const [showModalAdvantages, setShowModalAdvantages] = useState(false)

  useEffect(() => {
    if (user.premium_name === 'Premium 1') {
      setPremiumSelected('Premium 2')
    } else if (user.premium_name === 'Premium 2') {
      setPremiumSelected('Premium 1')
    } else {
      setPremiumSelected('Premium 1')
    }
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const res = await axiosGetWithToken('subscriptions/plans')
    console.log('plans', res.data)

    const { data } = res

    setPremiums(data.reverse())
    setPremium(res.data[0])

    // const response = await axiosGetWithToken('subscriptions/types')
    // fetchPricesAndProducts(response.data)
    setLoading(false)
  }

  // Fonction permettant d'ouvrir la modal des avantages
  const openModal = (premium) => {
    if (premium === 'Premium 1') {
      setAdvantages({ ...advantages, first: true })
    } else {
      setAdvantages({ ...advantages, second: true })
    }
    setShowModalAdvantages(true)
  }

  // Fonction permettant de fermer la modal des avantages
  const closeModal = () => {
    setShowModalAdvantages(false)
    setAdvantages({ first: false, second: false })
  }

  const validSub = async () => {
    if (user.premium_actif === premium.nickname) {
      // TODO Modal Alert
      alert(`Deja abonné pour ${premium.nickname}`)
      return
    }

    if (
      user.premium_actif !== null &&
      user.premium_actif !== premium.nickname
    ) {
      // TODO Modal Alert
      alert("Etes vous sur de vouloir changer d'abonnement ?")
      return
    }

    navigation.navigate('SubPayment', { premium })
  }

  if (loading) {
    return <CustomLoader />
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomLabelNavigation
        label="Choix Abonnements"
        colors={colors}
        onPress={() => {
          navigation.goBack()
        }}
      />

      <View>
        <Text
          style={[textAlignCenter, littleTitle, mt20, { color: colors.text }]}
        >
          Choisir mon abonnement
        </Text>

        <Text
          style={[textAlignCenter, defaultText, mt10, { color: colors.text }]}
        >
          Facturation récurrente. Annulez à tout moment.
        </Text>

        <ScrollView style={[mt20, ml20]}>
          {premiums &&
            premiums.length > 0 &&
            premiums.map((premium) => (
              <View
                style={[mb30, mt30, { alignItems: 'center' }]}
                key={premium.id}
              >
                <CustomBox
                  title={premium.nickname}
                  price={`${premium.amount / 100} € / mois`}
                  onPress={() => {
                    setPremium(premium)
                    setPremiumSelected(premium.nickname)
                  }}
                  // disabled={user.premium_name === premium.nickname}
                  textColor={
                    premiumSelected === premium.nickname
                      ? darkColor
                      : colors.text
                  }
                  borderColor={
                    premiumSelected === premium.nickname
                      ? darkPrimaryColor
                      : colors.border
                  }
                  backgroundColor={
                    premiumSelected === premium.nickname
                      ? secondaryColor
                      : colors.background
                  }
                />

                <TouchableOpacity onPress={() => openModal(premium.nickname)}>
                  <Text
                    style={[
                      defaultLink,
                      textAlignCenter,
                      mt5,
                      { color: colors.link },
                    ]}
                  >
                    Voir les avantages
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
        </ScrollView>

        <View style={[mx20]}>
          <CustomBigButton label="Valider mon abonnement" onPress={validSub} />
        </View>
      </View>

      {/* Ouvre la Modal qui informe les avantages des différents premium */}
      <CustomModal showModal={showModalAdvantages} closeModal={closeModal}>
        {advantages.first ? (
          <AdvantagesModal premium="first" />
        ) : (
          <AdvantagesModal premium="second" />
        )}
      </CustomModal>
    </View>
  )
}

export default SubsChoiceScreen
