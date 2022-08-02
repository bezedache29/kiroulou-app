import { Modal } from 'react-native'
import React from 'react'

import { useTheme } from 'react-native-paper'

import ImageViewer from 'react-native-image-zoom-viewer'

const CustomImageViewer = ({
  showModal,
  setShowModal,
  imageUrls = false,
  renderHeader,
  children,
  index,
}) => {
  const { colors } = useTheme()

  return (
    <Modal
      visible={showModal}
      transparent
      onRequestClose={() => {
        setShowModal(!showModal)
      }}
    >
      <ImageViewer
        imageUrls={imageUrls}
        renderHeader={renderHeader}
        renderIndicator={() => null}
        backgroundColor={colors.background}
        index={index}
      />

      {children}
    </Modal>
  )
}

export default CustomImageViewer
