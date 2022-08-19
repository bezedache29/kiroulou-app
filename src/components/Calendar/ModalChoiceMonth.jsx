import { ScrollView, Text, View } from 'react-native'
import React from 'react'

import { useTheme } from 'react-native-paper'

import {
  mt20,
  mx10,
  my10,
  primaryColor,
  textAlignCenter,
  TitleH4,
} from '../../assets/styles/styles'

import CustomButtonInfo from '../CustomButtonInfo'

const ModalChoiceMonth = ({ monthYear, setChoiceMonth }) => {
  const { colors } = useTheme()

  return (
    <View style={[mx10, { flex: 1 }]}>
      <Text style={[TitleH4, textAlignCenter, { color: colors.text }]}>
        Choisir le mois souhaité pour filtrer les randonnées
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[mt20, { flex: 1, paddingBottom: 20 }]}>
          {monthYear.length > 0 &&
            monthYear.map((item, index) => (
              <CustomButtonInfo
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                title={item}
                colors={colors}
                onPress={() => setChoiceMonth(item)}
                style={my10}
                backgroundColor={primaryColor}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  )
}

export default ModalChoiceMonth
