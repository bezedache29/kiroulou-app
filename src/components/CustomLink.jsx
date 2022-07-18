import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { defaultLink } from '../assets/styles/styles'

const CustomLink = ({ onPress, label, colors }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={[defaultLink, { color: colors.link }]}>{label}</Text>
  </TouchableOpacity>
)

export default CustomLink
