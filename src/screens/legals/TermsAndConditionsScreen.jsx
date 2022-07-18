import { Text } from 'react-native'
import React from 'react'

import { useTheme } from 'react-native-paper'

import { defaultText } from '../../assets/styles/styles'

import CustomLI from '../../components/TermsAndConditions/CustomLI'
import TermsAndConditionsTemplate from './TermsAndConditions/TermsAndConditionsTemplate'

const TermsAndConditionsScreen = ({ navigation }) => {
  const { colors } = useTheme()

  return (
    <TermsAndConditionsTemplate
      navigation={navigation}
      title="Conditions de service de KiRoulOu"
      route="service"
    >
      <Text style={[defaultText, { color: colors.text }]}>
        Bienvenue sur KiRoulOu. Nous voulons que vous connaissiez et que vous
        compreniez vos droits et nos droits relatifs à la fourniture des
        Services (tels que définis ci-dessous). Veuillez les lire attentivement.
        Voici quelques points essentiels :
      </Text>

      <CustomLI
        colors={colors}
        text="La protection de votre vie privée est d’une importance critique à nos yeux. Découvrez comment nous recueillons et utilisons vos informations personnelles dans notre"
        link="Politique de confidentialité"
        onPress={() => {}}
      />

      <CustomLI
        colors={colors}
        link="Vous pouvez annuler votre abonnement ou supprimer votre compte à tout moment."
        onPress={() => {}}
      />

      <CustomLI
        colors={colors}
        link="Nous attendons de vous que vous agissiez avec respect et nous annulerons votre compte si vous agissez de manière inappropriée."
        onPress={() => {}}
      />

      <CustomLI
        colors={colors}
        link="Nous pouvons supprimer votre compte si vous agissez de manière inappropriée."
        onPress={() => {}}
      />

      <CustomLI
        colors={colors}
        link="Il existe des façons faciles de nous contacter si vous avez des questions ou pour obtenir de l’aide."
        onPress={() => {}}
      />
    </TermsAndConditionsTemplate>
  )
}

export default TermsAndConditionsScreen
