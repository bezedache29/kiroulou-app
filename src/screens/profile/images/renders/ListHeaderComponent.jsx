import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { useTheme } from 'react-native-paper'

import { URL_SERVER } from 'react-native-dotenv'

import {
  darkColor,
  darkPrimaryColor,
  defaultText,
  littleTitle,
  mb20,
  textAlignCenter,
} from '../../../../assets/styles/styles'

const ListHeaderComponent = ({ data, profile }) => {
  const { colors } = useTheme()

  return (
    <>
      <View style={styles.avatarContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: `${URL_SERVER}/storage/${data.avatar}` }}
          />
        </View>
      </View>
      <Text style={[littleTitle, textAlignCenter, { color: colors.text }]}>
        {profile === 'club' ? data.name : `${data.firstname} ${data.lastname}`}
      </Text>
      <Text
        style={[defaultText, textAlignCenter, mb20, { color: colors.text }]}
      >
        {profile === 'club' && data.name}
      </Text>
    </>
  )
}

export default ListHeaderComponent

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 20,
  },
  imageContainer: {
    backgroundColor: darkPrimaryColor,
    borderRadius: 80,
    padding: 5,
    marginBottom: 20,
    shadowColor: darkColor,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 0.35,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: 100,
  },
  image: {
    padding: 5,
    width: '100%',
    height: '100%',
    borderRadius: 80,
  },
})
