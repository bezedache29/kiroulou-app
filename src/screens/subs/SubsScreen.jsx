import { ScrollView, Text, View } from 'react-native'
import React from 'react'

import { useTheme } from 'react-native-paper'

import {
  littleTitle,
  ml20,
  mt20,
  mt30,
  mx20,
  textAlignCenter,
} from '../../assets/styles/styles'

import CustomLabelNavigation from '../../components/CustomLabelNavigation'
import CheckLine from '../../components/Subs/CheckLine'
import CustomBigButton from '../../components/CustomBigButton'

const SubsScreen = ({ navigation }) => {
  const { colors } = useTheme()
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomLabelNavigation
        label="Abonnements"
        colors={colors}
        onPress={() => {
          navigation.goBack()
        }}
      />

      <ScrollView>
        <Text
          style={[textAlignCenter, littleTitle, mt20, { color: colors.text }]}
        >
          Essayez le meilleur de KiRoulOu !
        </Text>

        <View style={[mt30, ml20]}>
          <CheckLine>Commentaires illimités</CheckLine>
          <CheckLine>Voir les membres d'un club</CheckLine>
          <CheckLine>Recherche de magasins / réparateurs cycles</CheckLine>
          <CheckLine>Accès au calendrier annuel des randonnées VTT</CheckLine>
          <CheckLine>
            Accès aux archives des anciennes randonnées VTT d'un club
          </CheckLine>
          <CheckLine>
            Voir toutes les photos / images qu'un club partage
          </CheckLine>
          <CheckLine>Un badge premium</CheckLine>
        </View>

        <View style={[mx20, mt30]}>
          <CustomBigButton onPress={() => {}} label="Choisir mon abonnement" />
        </View>
      </ScrollView>
    </View>
  )
}

export default SubsScreen
