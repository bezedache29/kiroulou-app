import { Text } from 'react-native'
import React from 'react'

import { useTheme } from 'react-native-paper'

import { defaultText, mt20 } from '../../assets/styles/styles'

import TermsAndConditionsTemplate from './TermsAndConditions/TermsAndConditionsTemplate'
import CustomLink from '../../components/CustomLink'

const LegalFoundationsScreen = ({ navigation }) => {
  const { colors } = useTheme()
  return (
    <TermsAndConditionsTemplate
      navigation={navigation}
      route="legal"
      title="Fondements juridiques"
    >
      <Text style={[defaultText, mt20, { color: colors.text }]}>
        KiRoulOu s’engage à vous fournir des informations et des choix utiles
        concernant les informations que vous partagez avec nous. Nous expliquons
        notre manière de recueillir, d’utiliser, de partager et de protéger vos
        informations dans notre{' '}
        <CustomLink
          onPress={() => {
            navigation.navigate('Privacy')
          }}
          label="Politique de confidentailité."
          colors={colors}
        />
      </Text>
    </TermsAndConditionsTemplate>
  )
}

export default LegalFoundationsScreen
