import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { defaultText } from '../../assets/styles/styles'

const CustomInfos = ({ info, colors, response }) => (
  <View style={styles.container}>
    <Text style={[defaultText, { flex: 4, color: colors.text }]}>{info}</Text>
    <Text
      style={[
        defaultText,
        { flex: 1, color: colors.link, textAlign: 'right', marginRight: 10 },
      ]}
    >
      {response}
    </Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
})

export default CustomInfos
