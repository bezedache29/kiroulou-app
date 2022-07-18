import { ScrollView, SafeAreaView, View, Text } from 'react-native'
import React from 'react'

import { useTheme } from 'react-native-paper'

import {
  defaultContainer,
  defaultText,
  mb30,
  mt20,
  my10,
  my30,
  TitleH3,
} from '../../assets/styles/styles'

import CustomLabelNavigation from '../../components/CustomLabelNavigation'
import CustomButtonInfo from '../../components/CustomButtonInfo'

const LegalInfoScreen = ({ navigation }) => {
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

        <View style={[my30, { marginTop: 30, paddingHorizontal: 20, flex: 3 }]}>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default LegalInfoScreen
