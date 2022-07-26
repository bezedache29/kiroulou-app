import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import { useTheme } from 'react-native-paper'

import {
  darkColor,
  darkPrimaryColor,
  defaultLink,
  littleTitle,
  mb30,
  ml20,
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

const SubsChoiceScreen = ({ navigation }) => {
  const { colors } = useTheme()

  // State pour selection du premium
  const [premium, setPremium] = useState({
    first: true,
    second: false,
  })

  // State pour selection du premium dans la modal
  const [advantages, setAdvantages] = useState({
    first: false,
    second: false,
  })

  // State pour ouvrir ou non la Modal des avantages
  const [showModalAdvantages, setShowModalAdvantages] = useState(false)

  // Fonction permettant d'ouvrir la modal des avantages
  const openModal = (premium) => {
    if (premium === 'first') {
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

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomLabelNavigation
        label="Choix Abonnements"
        colors={colors}
        onPress={() => {
          navigation.goBack()
        }}
      />

      <ScrollView>
        <Text
          style={[textAlignCenter, littleTitle, mt20, { color: colors.text }]}
        >
          Choisir mon abonnement
        </Text>

        <View style={[mt30, ml20]}>
          {/* BOX Premium 1 */}
          <View style={[mb30, mt30, { alignItems: 'center' }]}>
            <CustomBox
              title="Premium 1"
              price="2€ / mois"
              premium="first"
              onPress={() => setPremium({ first: true, second: false })}
              textColor={premium.first ? darkColor : colors.text}
              borderColor={premium.first ? darkPrimaryColor : colors.border}
              backgroundColor={
                premium.first ? secondaryColor : colors.background
              }
            />

            <TouchableOpacity onPress={() => openModal('first')}>
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

          {/* Box Premium 2 */}
          <View style={[mb30, mt30, { alignItems: 'center' }]}>
            <CustomBox
              title="Premium 2"
              premium="second"
              price="5€ / mois"
              onPress={() => setPremium({ first: false, second: true })}
              textColor={premium.second ? darkColor : colors.text}
              borderColor={premium.second ? darkPrimaryColor : colors.border}
              backgroundColor={
                premium.second ? secondaryColor : colors.background
              }
            />

            <TouchableOpacity onPress={() => openModal('second')}>
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
        </View>

        <View style={[mx20]}>
          <CustomBigButton
            label="Valider mon abonnement"
            onPress={() =>
              alert(
                `Abonnement choisi : ${premium.first ? 'Premium1' : 'premium2'}`
              )
            }
          />
        </View>
      </ScrollView>

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
