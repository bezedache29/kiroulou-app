import { Text, View } from 'react-native'
import React from 'react'

import { useTheme } from 'react-native-paper'

import TemplateWithNavigation from '../../../../components/TemplateWithNavigation'
import CustomLink from '../../../../components/CustomLink'
import {
  defaultText,
  littleTitle,
  my10,
  px20,
  textAlignCenter,
} from '../../../../assets/styles/styles'
import CustomDivider from '../../../../components/CustomDivider'

const CancellationScreen = ({ navigation }) => {
  const { colors } = useTheme()
  return (
    <TemplateWithNavigation
      navigationNavigate={() => {
        navigation.goBack()
      }}
      label="Annulation"
    >
      <View style={px20}>
        <Text
          style={[littleTitle, my10, textAlignCenter, { color: colors.text }]}
        >
          Annulation abonnement
        </Text>

        <Text style={[defaultText, { color: colors.text }]}>
          Vous pouvez annuler votre abonnement en visitant les « Paramètres » et
          en sélectionnant « Abonnement actif ». Lorsque votre abonnement
          prendra fin, votre compte subsistera et se transformera en abonnement
          gratuit. Vous pouvez renouveler votre abonnement à tout moment sans
          ouvrir un nouveau compte, bien que les frais d’abonnement aient pu
          augmenter dans l’intervalle. Vous pouvez{' '}
          <CustomLink
            onPress={() => {}}
            label="supprimer votre compte"
            colors={colors}
          />{' '}
          à tout moment.
        </Text>

        <CustomDivider />

        <Text
          style={[littleTitle, my10, textAlignCenter, { color: colors.text }]}
        >
          Essais gratuits
        </Text>
        <Text style={[defaultText, { color: colors.text }]}>
          Votre abonnement peut commencer par un essai gratuit. Pour tout
          abonnement, la période d’essai gratuit sera valable pour la durée
          spécifiée lors de votre inscription. Les essais gratuits ne peuvent
          pas être combinés avec certaines autres offres, comme spécifié. Si
          vous commencez votre abonnement par un essai gratuit, nous
          commencerons à vous facturer les frais d’abonnement mensuel à la fin
          de la période d’essai gratuit de votre abonnement, selon le moyen de
          paiement indiqué, à moins que vous n’annuliez votre abonnement avant
          la fin de cette période d’essai gratuit. Votre moyen de paiement sera
          autorisé jusqu’à environ un mois de service dès que vous vous
          inscrivez pour un essai gratuit. Dans certains cas, votre solde ou
          limite de crédit disponible peut être réduit(e) pour refléter
          l’autorisation ; cependant, aucuns frais ne seront facturés au moyen
          de paiement à moins que vous n’annuliez pas avant la fin de votre
          période d’essai gratuit. Vous pouvez annuler votre abonnement à tout
          moment en allant dans les{' '}
          <CustomLink onPress={() => {}} label="paramètres." colors={colors} />
        </Text>
      </View>
    </TemplateWithNavigation>
  )
}

export default CancellationScreen
