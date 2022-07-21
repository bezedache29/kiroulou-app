import { View, Text } from 'react-native'
import React from 'react'

import { useTheme } from 'react-native-paper'

import {
  defaultText,
  littleTitle,
  mb10,
  mt10,
  mt20,
  my10,
  p20,
  textAlignCenter,
  TitleH3,
} from '../../assets/styles/styles'

import TemplateWithNavigation from '../../components/TemplateWithNavigation'
import CustomDivider from '../../components/CustomDivider'
import CustomInfos from '../../components/Privacy/CustomInfos'
import CustomLink from '../../components/CustomLink'

const PrivacyScreen = ({ navigation }) => {
  const { colors } = useTheme()
  return (
    <TemplateWithNavigation
      navigationNavigate={() => {
        navigation.goBack()
      }}
      label="Politique de Confidentialité"
    >
      <View style={p20}>
        <Text style={[defaultText, { color: colors.text }]}>
          La protection de votre vie privée est très importante à nos yeux.
          Avant d’entrer dans les détails, consultez notre page Label de
          confidentialité où vous trouverez un récapitulatif de nos pratiques en
          matière de confidentialité. Cliquez sur les liens ci-dessous pour en
          savoir plus et lire la politique dans son intégralité.
        </Text>

        <CustomDivider addStyle={my10} />

        <Text style={[TitleH3, textAlignCenter, mb10, { color: colors.text }]}>
          Label de confidentialité
        </Text>

        <Text style={[littleTitle, { color: colors.text }]}>
          Collecte et vente de données
        </Text>

        <CustomInfos
          info="Est-ce que nous vendons vos informations personnelles ?"
          response="Non"
          colors={colors}
        />

        <CustomInfos
          info="Est-ce que nous partageons ou vendons des informations agrégées ?"
          response="Non"
          colors={colors}
        />

        <CustomInfos
          info="Est-ce que nous utilisons des données sensibles, comme des informations médicales ?"
          response="Oui"
          colors={colors}
        />

        <CustomInfos
          info="Est-ce que nous utilisons votre liste de contacts si vous nous accordez l’accès ?"
          response="Oui"
          colors={colors}
        />

        <CustomInfos
          info="Est-ce que nous supprimons vos données lorsque vous demandez la suppression de votre compte ?"
          response="Oui"
          colors={colors}
        />

        <CustomInfos
          info="Est-ce que nous conservons vos données aussi longtemps que nécessaire, à moins que vous en demandiez la suppression ?"
          response="Oui"
          colors={colors}
        />

        <CustomDivider addStyle={my10} />

        <Text style={[littleTitle, { color: colors.text }]}>Suivi</Text>

        <CustomInfos
          info="Suivons-nous la localisation de votre appareil pour vous fournir les services de KiRoulOu ?"
          response="Oui"
          colors={colors}
        />

        <CustomInfos
          info="Suivons-nous la localisation de votre appareil lorsque vous n’utilisez pas l’application ?"
          response="Non"
          colors={colors}
        />

        <CustomInfos
          info="Suivons-nous vos activités de navigation sur d’autres sites ?"
          response="Non"
          colors={colors}
        />

        <CustomInfos
          info="Est-ce que nous vous écoutons lorsque vous utilisez le micro de votre appareil ?"
          response="Non"
          colors={colors}
        />

        <CustomDivider addStyle={my10} />

        <Text style={[littleTitle, { color: colors.text }]}>Communication</Text>

        <CustomInfos
          info="Est-ce que nous vous adressons un préavis lorsque nous apportons des modifications importantes à notre politique de confidentialité ?"
          response="Oui"
          colors={colors}
        />

        <CustomInfos
          info="Est-ce que nous vous envoyons des communications marketing avec la possibilité de vous désinscrire ?"
          response="Oui"
          colors={colors}
        />

        <CustomInfos
          info="Est-ce que nous vous envoyons des notifications push avec la possibilité de vous désinscrire ?"
          response="Oui"
          colors={colors}
        />

        <CustomDivider addStyle={my10} />

        <Text style={[TitleH3, textAlignCenter, mb10, { color: colors.text }]}>
          Politique de confidentialité
        </Text>

        <Text style={[littleTitle, { color: colors.text }]}>Introduction</Text>

        <Text style={[defaultText, mt10, { color: colors.text }]}>
          Notre politique de confidentialité (la « Politique de confidentialité
          ») décrit les informations que nous recueillons, la manière dont nous
          les utilisons et les partageons, la manière de gérer vos contrôles de
          confidentialité et vos droits en rapport avec nos sites Web et nos
          applications et services mobiles connexes (collectivement, les «
          Services »). Veuillez également lire les{' '}
          <CustomLink
            onPress={() => {
              navigation.navigate('Conduct')
            }}
            label="conditions de service"
            colors={colors}
          />{' '}
          qui établissent les conditions régissant les Services.
        </Text>

        <Text style={[defaultText, mt20, { color: colors.text }]}>
          Le siège de KiRoulOu se trouve à Kerlouan et nos Services vous sont
          fournis par KiRoulOu. Si vous résidez dans l’Espace économique
          européen (« EEE »), KiRoulOu est le responsable du traitement de vos
          données personnelles aux fins de la loi de l’EEE relative à la
          protection des données.
        </Text>

        <Text style={[defaultText, mt20, { color: colors.text }]}>
          Des questions ou des commentaires sur cette Politique de
          confidentialité peuvent être envoyés par courrier à l’adresse
          ci-dessous :
        </Text>

        <View style={mt20}>
          <Text style={[littleTitle, { color: colors.text }]}>KiRoulOu</Text>
          <Text style={[defaultText, { color: colors.text }]}>
            5 hent kerliver
          </Text>
          <Text style={[defaultText, { color: colors.text }]}>
            29890 Kerlouan
          </Text>
          <CustomLink
            onPress={() => {}}
            label="contact@kiroulou.com"
            colors={colors}
          />
        </View>
      </View>
    </TemplateWithNavigation>
  )
}

export default PrivacyScreen
