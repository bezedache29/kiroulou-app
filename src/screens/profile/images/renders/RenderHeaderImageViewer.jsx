import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'

import { useTheme } from 'react-native-paper'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import CustomLabelNavigation from '../../../../components/CustomLabelNavigation'

const RenderHeaderImageViewer = ({ setImageViewer, onDelete }) => {
  const { colors } = useTheme()

  return (
    <View style={{ backgroundColor: colors.background }}>
      <CustomLabelNavigation
        label="Image"
        colors={colors}
        onPress={() => setImageViewer(false)}
      />

      {/* Icone en haut a droite qui permet de modifier son profil */}
      <TouchableOpacity onPress={onDelete} style={styles.trashIcon}>
        <MaterialCommunityIcons
          name="trash-can"
          size={28}
          color={colors.text}
        />
      </TouchableOpacity>
    </View>
  )
}

export default RenderHeaderImageViewer

const styles = StyleSheet.create({
  trashIcon: {
    position: 'absolute',
    top: 10,
    right: 20,
  },
})
