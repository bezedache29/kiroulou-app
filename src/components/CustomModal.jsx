import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'

import { useTheme } from 'react-native-paper'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { cancelColor, mt10, mt50 } from '../assets/styles/styles'

const CustomModal = ({
  children,
  showModal,
  closeModal,
  style,
  animation = 'slide',
  closeRight = false,
  transparent = false,
}) => {
  const { colors } = useTheme()

  return (
    <Modal
      animationType={animation}
      visible={showModal}
      onRequestClose={() => {}}
      transparent={transparent}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
          },
          style,
        ]}
      >
        {closeModal && (
          <TouchableOpacity
            onPress={closeModal}
            style={closeRight ? styles.closeBtnRight : styles.closeBtn}
          >
            <MaterialCommunityIcons
              name="close-circle"
              size={35}
              color={cancelColor}
            />
          </TouchableOpacity>
        )}

        <View style={[closeRight ? mt10 : mt50, { flex: 1 }]}>{children}</View>
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
  closeBtnRight: {
    position: 'absolute',
    top: -10,
    right: -10,
    zIndex: 2,
  },
})
