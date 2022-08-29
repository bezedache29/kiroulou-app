import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { darkColor, defaultText } from '../assets/styles/styles'

const CustomButtonInfo = ({
  title,
  colors,
  onPress,
  route,
  backgroundColor,
  style,
  disabled = false,
}) => (
  <TouchableOpacity
    style={[
      styles.container,
      {
        borderColor: darkColor,
        backgroundColor:
          backgroundColor ||
          (route ? colors.backgroundColorBtnActive : colors.backgroundColorBtn),
      },
      style,
    ]}
    onPress={onPress}
    disabled={!!route || disabled}
  >
    <View style={styles.containerText}>
      <Text
        style={[
          defaultText,
          { color: route ? colors.textBtnActive : darkColor },
        ]}
      >
        {title}
      </Text>
    </View>
    <View style={styles.icon}>
      <MaterialIcons
        name="keyboard-arrow-right"
        size={30}
        color={route ? colors.textBtnActive : darkColor}
      />
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 8,
    elevation: 5,
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
