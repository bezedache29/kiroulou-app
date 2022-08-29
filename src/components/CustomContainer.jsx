import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'

import { useTheme } from 'react-native-paper'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CustomLabelNavigation from './CustomLabelNavigation'

const CustomContainer = ({
  label,
  pressBack,
  children,
  style,
  onPressEdit,
  iconName,
  editIcon = false,
}) => {
  const { colors } = useTheme()

  return (
    <View style={[{ flex: 1, backgroundColor: colors.background }, style]}>
      <CustomLabelNavigation
        label={label}
        colors={colors}
        onPress={pressBack}
      />
      {editIcon && (
        <TouchableOpacity onPress={onPressEdit} style={styles.editIcon}>
          <MaterialCommunityIcons
            name={iconName}
            size={28}
            color={colors.text}
          />
        </TouchableOpacity>
      )}
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  editIcon: {
    position: 'absolute',
    top: 10,
    right: 20,
  },
})

export default CustomContainer
