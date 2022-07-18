import { View, Text } from 'react-native'
import React from 'react'

import { useTheme } from 'react-native-paper'
import TemplateWithNavigation from '../../../../components/TemplateWithNavigation'
import {
  defaultText,
  littleTitle,
  my10,
  px20,
  textAlignCenter,
} from '../../../../assets/styles/styles'

const ConductScreen = ({ navigation }) => {
  const { colors } = useTheme()
  return (
    <TemplateWithNavigation
      navigationNavigate={() => {
        navigation.goBack()
      }}
      label="Conduite"
    >
      <View style={px20}>
        <Text
          style={[littleTitle, my10, textAlignCenter, { color: colors.text }]}
        >
          Conduite non respectueuse
        </Text>

        <Text style={[defaultText, { color: colors.text }]}>
          Les Services sont destinés à votre utilisation personnelle et non
          commerciale. Vous ne pouvez pas modifier, copier, distribuer,
          transmettre, afficher, donner en représentation, reproduire, publier,
          concéder sous licence, créer des travaux dérivés, transférer ou vendre
          à des fins commerciales une quelconque portion des Services, de
          l’utilisation des Services ou de l’accès au Contenu.
        </Text>
      </View>
    </TemplateWithNavigation>
  )
}

export default ConductScreen
