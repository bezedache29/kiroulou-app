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
import CustomLink from '../../../../components/CustomLink'

const SupportAndQuestionsScreen = ({ navigation }) => {
  const { colors } = useTheme()
  return (
    <TemplateWithNavigation
      navigationNavigate={() => {
        navigation.goBack()
      }}
      label="Assistance & Questions"
    >
      <View style={px20}>
        <Text
          style={[littleTitle, my10, textAlignCenter, { color: colors.text }]}
        >
          Assistance et Questions
        </Text>

        <Text style={[defaultText, { color: colors.text }]}>
          Nous répondrons à toute question concernant les Services et ces
          conditions via{' '}
          <CustomLink
            onPress={() => {}}
            label="support@kiroulou.com"
            colors={colors}
          />
        </Text>
      </View>
    </TemplateWithNavigation>
  )
}

export default SupportAndQuestionsScreen
