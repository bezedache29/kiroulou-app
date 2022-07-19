import { ScrollView, SafeAreaView, View, Text } from 'react-native'
import React from 'react'

import { useTheme } from 'react-native-paper'

import {
  defaultContainer,
  defaultText,
  mb10,
  mb30,
  mt20,
  my10,
  my30,
  TitleH3,
  TitleH4,
} from '../../assets/styles/styles'

import CustomLabelNavigation from '../../components/CustomLabelNavigation'
import CustomButtonInfo from '../../components/CustomButtonInfo'
import CustomLink from '../../components/CustomLink'

const LegalNoticeScreen = ({ navigation }) => {
  const { colors } = useTheme()

  return (
    <SafeAreaView
      style={[defaultContainer, { backgroundColor: colors.background }]}
    >
      <CustomLabelNavigation
        label="Infos légales"
        colors={colors}
        onPress={() => navigation.goBack()}
      />

      <ScrollView>
        <View style={{ flex: 1 }}>
          <View style={mt20} />

          <CustomButtonInfo
            title="Conditions générales"
            onPress={() => {
              navigation.navigate('TermsAndConditions')
            }}
            colors={colors}
          />

          <View style={my10} />

          <CustomButtonInfo
            title="Politique de confidentialité"
            onPress={() => {
              navigation.navigate('Privacy')
            }}
            colors={colors}
          />
        </View>

        {/* <View style={[my30, { marginTop: 30, paddingHorizontal: 20, flex: 3 }]}>
          <Text style={[defaultText, my30, { color: colors.text }]}>
            L'application mobile KiRoulOu est éditée par :
          </Text>

          <Text style={[TitleH3, mb30, { color: colors.text }]}>
            EIRL Bezedache
          </Text>

          <Text
            style={[
              defaultText,
              {
                textDecorationLine: 'underline',
                textDecorationColor: colors.text,
                color: colors.text,
              },
            ]}
          >
            Siège social :
          </Text>
          <Text style={[defaultText, { color: colors.text }]}>
            5 hent kerliver
          </Text>
          <Text style={[defaultText, mb30, { color: colors.text }]}>
            29890 Kerlouan
          </Text>

          <Text
            style={[
              defaultText,
              {
                textDecorationLine: 'underline',
                textDecorationColor: colors.text,
                color: colors.text,
              },
            ]}
          >
            Directeur de publication :
          </Text>
          <Text style={[defaultText, { color: colors.text }]}>
            Monsieur Christophe Salou
          </Text>
        </View> */}

        <View style={[my30, { marginTop: 30, paddingHorizontal: 20, flex: 3 }]}>
          <Text style={[TitleH3, mb30, { color: colors.text }]}>
            Mentions légales
          </Text>
          <Text style={[TitleH4, mb10, { color: colors.text }]}>Editeur</Text>
          <Text
            style={[
              defaultText,
              {
                textDecorationLine: 'underline',
                textDecorationColor: colors.text,
                color: colors.text,
              },
            ]}
          >
            Siège social :
          </Text>
          <Text style={[defaultText, { color: colors.text }]}>
            EIRL Bezedache
          </Text>
          <Text style={[defaultText, { color: colors.text }]}>
            5 hent kerliver
          </Text>
          <Text style={[defaultText, mb30, { color: colors.text }]}>
            29890 Kerlouan
          </Text>
          <Text style={[defaultText, mb30, { color: colors.text }]}>
            Contacter l'éditeur :{' '}
            <CustomLink
              onPress={() => {}}
              label="bezedache29@gmail.com"
              colors={colors}
            />
          </Text>

          <Text style={[TitleH4, mb10, { color: colors.text }]}>
            Directeur de publication
          </Text>
          <Text style={[defaultText, mb30, { color: colors.text }]}>
            Monsieur Christophe Salou
          </Text>

          <Text style={[TitleH4, mb10, { color: colors.text }]}>
            Accès à l'application et se services
          </Text>
          <Text style={[defaultText, mb10, { color: colors.text }]}>
            L'accès à l'application mobile et ses services est possible 24
            heures sur 24, 7 jours sur 7, sauf en cas de force majeure ou d'un
            événement hors du contrôle de Bezedache et sous réserve des
            éventuelles pannes et interventions de maintenance nécessaires au
            bon fonctionnement du service et des matériels. Bezedache accorde à
            l'internaute, qui l'accepte, le droit ce connecter un ou plusieurs
            mobiles à son application mobile. L'accès au service se fait à
            partir du ou des téléphones mobiles de l'internaute connectés à un
            réseau de télécommunication permettant l'accès à l'application
            mobile. Les protocoles de communication utilisés sont ceux en usage
            sur le réseau d'internet. LEs droits d'accès et d'utilisation à
            l'application mobile de Bezedache sont des droits non exclusifs et
            non transmissibles.
          </Text>

          <Text style={[defaultText, { color: colors.text }]}>
            L’application mobile et les services associés (collectivement, les
            “Services”) sont mis à votre disposition par KiRoulOu, Inc. dont le
            siège est situé au 5 hent kerliver, 29890 Kerlouan, sous réserve des
            présentes Conditions de service (les “Conditions”) et conformément à
            la{' '}
            <CustomLink
              onPress={() => {
                navigation.navigate('Privacy')
              }}
              label="Politique de confidentailité."
              colors={colors}
            />{' '}
            de KiRoulOu (la “Politique de confidentialité”). Vous acceptez de
            respecter les présentes Conditions et toute condition additionnelle
            sont KiRoulOu vous fait part relativement aux Services fera partie
            des Conditions. EN ACCEDANT, EN UTILISANT, OU EN TELECHARGEANT DES
            INFORMATIONS OU DES DOCUMENTS A DESTINATION OU A PARTIR DES
            SERVICES, OU EN INDIQUANT VOTRE CONSENTEMENT A CES CONDITIONS EN
            CREANT UN COMPTE, EN CLIQUANT SUR “INSCRIPTION” OU TOUT MECANISME
            SIMILAIRE, VOUS ACCEPTEZ LES PRESENTES CONDITIONS. SI VOUS
            N’ACCEPTEZ PAS CES CONDITIONS, VOUS NE POURREZ PAS ACCEDER, ET
            UTILISER LES SERVICES.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default LegalNoticeScreen
