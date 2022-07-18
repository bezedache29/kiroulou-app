import { View, Text } from 'react-native'
import React from 'react'

import { useTheme } from 'react-native-paper'

import {
  defaultText,
  littleTitle,
  my10,
  px20,
  textAlignCenter,
} from '../../../../assets/styles/styles'

import TemplateWithNavigation from '../../../../components/TemplateWithNavigation'

const TerminationScreen = ({ navigation }) => {
  const { colors } = useTheme()
  return (
    <TemplateWithNavigation
      navigationNavigate={() => {
        navigation.goBack()
      }}
      label="Résiliation"
    >
      <View style={px20}>
        <Text
          style={[littleTitle, my10, textAlignCenter, { color: colors.text }]}
        >
          Résiliation de l'abonnement
        </Text>

        <Text style={[defaultText, { color: colors.text }]}>
          Vous convenez que KiRoulOu peut, dans certaines circonstances graves
          et sans préavis, suspendre ou résilier immédiatement votre compte
          et/ou votre accès aux Services. Le motif d’une telle suspension ou
          résiliation pourra inclure, sans s’y limiter, des violations des
          conditions ou d’autres accords, politiques ou directives incorporés,
          des demandes par les autorités d’application de la loi ou d’autres
          organismes gouvernementaux, une demande de votre part (suppression de
          compte de votre propre initiative), une interruption ou modification
          majeure des Services (ou d’une partie de ceux-ci), des problèmes
          techniques ou de sécurité inattendus, des périodes d’inactivité
          prolongées et/ou le non-paiement des frais que vous devez payer dans
          le cadre des Services. La résiliation de votre compte peut inclure la
          suppression de l’accès à toutes les offres contenues dans les
          Services, la suppression des informations, fichiers et contenus
          associés à votre compte, et l’interdiction de tout usage ultérieur des
          Services. De plus, vous convenez que toute suspension ou résiliation
          justifiée se fera à la seule discrétion de KiRoulOu et que KiRoulOu ne
          sera pas tenu responsable envers vous ou tout autre tiers de la
          suspension ou résiliation de votre compte ou de votre accès aux
          Services. Les sections suivantes survivront à la résiliation de votre
          compte et/ou des Conditions : Contenu et conduite, Clubs, Vos
          commentaires, Choix de la loi applicable et de la juridiction
          compétente, et Généralités.
        </Text>
      </View>
    </TemplateWithNavigation>
  )
}

export default TerminationScreen
