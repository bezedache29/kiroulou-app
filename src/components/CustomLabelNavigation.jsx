import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { labelNavigation, ml20 } from '../assets/styles/styles'

const CustomLabelNavigation = ({ label, colors, onPress }) => (
  <View style={[styles.container, { borderColor: colors.border }]}>
    <TouchableOpacity style={styles.icon} onPress={onPress}>
      <MaterialIcons name="arrow-back" size={24} color={colors.text} />
    </TouchableOpacity>
    <Text style={[ml20, labelNavigation, { color: colors.text }]}>{label}</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingRight: 85,
  },
  icon: {
    paddingLeft: 10,
  },
})

export default CustomLabelNavigation
