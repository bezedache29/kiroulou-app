import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { defaultText } from '../assets/styles/styles'

const CustomButtonInfo = ({ title, colors, onPress, route }) => (
  <TouchableOpacity
    style={[
      styles.container,
      {
        borderColor: colors.border,
        backgroundColor: route
          ? colors.backgroundColorBtnActive
          : colors.backgroundColorBtn,
      },
    ]}
    onPress={onPress}
    disabled={!!route}
  >
    <View style={styles.containerText}>
      <Text
        style={[
          defaultText,
          { color: route ? colors.textBtnActive : colors.text },
        ]}
      >
        {title}
      </Text>
    </View>
    <View style={styles.icon}>
      <MaterialIcons
        name="keyboard-arrow-right"
        size={30}
        color={route ? colors.textBtnActive : colors.text}
      />
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    marginHorizontal: 20,
    padding: 10,
  },
  containerText: {
    paddingLeft: 10,
  },
  icon: {
    marginLeft: 'auto',
    paddingRight: 10,
  },
})

export default CustomButtonInfo
