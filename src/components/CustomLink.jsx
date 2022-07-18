import { Text } from 'react-native'
import React from 'react'
import { defaultLink } from '../assets/styles/styles'

const CustomLink = ({ onPress, label, colors }) => (
  <Text onPress={onPress} style={[defaultLink, { color: colors.link }]}>
    {label}
  </Text>
)

export default CustomLink
