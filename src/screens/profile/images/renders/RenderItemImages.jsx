import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import React from 'react'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { cancelColor } from '../../../../assets/styles/styles'

const RenderItemImages = ({ onPress, onLongPress, uri, selected }) => (
  <TouchableOpacity
    onPress={onPress}
    onLongPress={onLongPress}
    style={styles.container}
  >
    <ImageBackground source={{ uri }} style={styles.image} />
    {selected && (
      <>
        <View style={styles.overlay} />
        <MaterialCommunityIcons
          name="check-circle"
          size={25}
          color={cancelColor}
          style={styles.icon}
        />
      </>
    )}
  </TouchableOpacity>
)

export default RenderItemImages

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 1,
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(124,182,109,0.5)',
  },
  icon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
})
