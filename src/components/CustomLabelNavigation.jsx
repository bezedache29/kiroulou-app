import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { labelNavigation } from '../assets/styles/styles'

const CustomLabelNavigation = ({ label, textColor, onPress }) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.icon} onPress={onPress}>
      <MaterialIcons name="arrow-back" size={24} color={textColor} />
    </TouchableOpacity>
    <Text style={[styles.text, labelNavigation, { color: textColor }]}>
      {label}
    </Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  icon: {
    width: 100,
    paddingLeft: 10,
  },
  text: {
    flex: 1,
  },
})

export default CustomLabelNavigation
