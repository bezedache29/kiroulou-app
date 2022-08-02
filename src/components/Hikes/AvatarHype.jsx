import { ImageBackground, StyleSheet } from 'react-native'
import React from 'react'

const AvatarHype = () => (
  <ImageBackground
    source={{
      uri: 'https://itigic.com/wp-content/uploads/2022/04/20220414_6257c3e610125.webp?ezimgfmt=rs:372x195/rscb2/ng:webp/ngcb2',
    }}
    style={styles.avatar}
  />
)

export default AvatarHype

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 150,
    marginLeft: -10,
    borderWidth: 3,
    borderColor: 'white',
    overflow: 'hidden',
  },
})
