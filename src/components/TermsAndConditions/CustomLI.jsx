import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { defaultLink, defaultText, mt20 } from '../../assets/styles/styles'

const CustomLI = ({ colors, text, link, onPress }) => (
  <View style={[mt20, { flexDirection: 'row' }]}>
    <View style={{ flex: 1, marginTop: 5 }}>
      <MaterialIcons name="circle" size={10} color={colors.text} />
    </View>
    {text ? (
      <Text style={[defaultText, { flex: 11, color: colors.text }]}>
        {text}{' '}
        <TouchableOpacity onPress={onPress}>
          <Text style={[defaultLink, { color: colors.link }]}>{link}</Text>
        </TouchableOpacity>
      </Text>
    ) : (
      <TouchableOpacity onPress={onPress} style={{ flex: 11 }}>
        <Text style={[defaultLink, { color: colors.link }]}>{link}</Text>
      </TouchableOpacity>
    )}
  </View>
)

export default CustomLI
