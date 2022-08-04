import { ImageBackground, StyleSheet, Text } from 'react-native'
import React from 'react'

import { useTheme } from 'react-native-paper'
import { darkColor, defaultText } from '../../assets/styles/styles'

const AvatarHype = ({ user, nbUsers }) => {
  const { colors } = useTheme()

  return (
    <ImageBackground
      source={{
        uri: user.avatar,
      }}
      style={[styles.avatar, { borderColor: colors.borderAvatar }]}
      imageStyle={{ opacity: nbUsers ? 0.3 : 1 }}
    >
      {nbUsers && (
        <Text
          style={[defaultText, { color: colors.borderAvatar, fontSize: 16 }]}
        >
          +{nbUsers}
        </Text>
      )}
    </ImageBackground>
  )
}
export default AvatarHype

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 150,
    marginLeft: -10,
    borderWidth: 3,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: darkColor,
  },
})
