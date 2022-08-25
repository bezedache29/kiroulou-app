import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { useTheme } from 'react-native-paper'
import { textAlignCenter, TitleH3 } from '../../assets/styles/styles'
import CheckLine from './CheckLine'

const premium1 = require('../../assets/json/premium1.json')
const premium2 = require('../../assets/json/premium2.json')

const AdvantagesModal = ({ premium, contentStyle, textStyle }) => {
  const { colors } = useTheme()
  const [advantages, setAdvantages] = useState(false)

  useEffect(() => {
    if (premium === 'first' || premium === 'Premium 1') {
      setAdvantages(premium1)
    } else {
      setAdvantages(premium2)
    }
  }, [])

  return (
    <>
      <Text
        style={[
          TitleH3,
          textAlignCenter,
          { color: colors.text, flex: 1 },
          textStyle,
        ]}
      >
        Liste des avantages
      </Text>
      <View style={[{ flex: 10 }, contentStyle]}>
        {advantages &&
          advantages.map((advantage, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <CheckLine key={index}>{advantage.text}</CheckLine>
          ))}
      </View>
    </>
  )
}

export default AdvantagesModal
