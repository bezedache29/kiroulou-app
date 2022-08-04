import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'

import { useTheme } from 'react-native-paper'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { cancelColor, mt50 } from '../assets/styles/styles'

const CustomModal = ({ children, showModal, closeModal }) => {
  const { colors } = useTheme()

  return (
    <Modal animationType="slide" visible={showModal} onRequestClose={() => {}}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        {closeModal && (
          <TouchableOpacity onPress={closeModal} style={styles.closeBtn}>
            <MaterialCommunityIcons
              name="close-circle"
              size={35}
              color={cancelColor}
            />
          </TouchableOpacity>
        )}

        <View style={[mt50, { flex: 1 }]}>{children}</View>
      </View>
    </Modal>
  )
}

export default CustomModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 20,
    zIndex: 2,
  },
})
