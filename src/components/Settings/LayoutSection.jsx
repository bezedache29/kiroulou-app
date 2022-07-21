import { View, Text } from 'react-native'
import React from 'react'

import {
  darkPrimaryColor,
  littleTitle,
  ml20,
  ml5,
  mt10,
  rowCenter,
} from '../../assets/styles/styles'

const LayoutSection = ({ children, title, icon }) => (
  <>
    <View style={[ml20, mt10, rowCenter]}>
      {icon}
      <Text style={[littleTitle, ml5, { color: darkPrimaryColor }]}>
        {title}
      </Text>
    </View>
    {children}
  </>
)

export default LayoutSection
