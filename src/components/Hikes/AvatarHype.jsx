import { ImageBackground, StyleSheet, Text } from 'react-native'
import React, { useEffect, useState } from 'react'

import { useTheme } from 'react-native-paper'

import { URL_SERVER } from 'react-native-dotenv'

import { darkColor, defaultText } from '../../assets/styles/styles'
import useAxios from '../../hooks/useAxios'
import CustomLoader from '../CustomLoader'

const AvatarHype = ({ userId, nbUsers }) => {
  const { colors } = useTheme()
  const { axiosGetWithToken } = useAxios()

  const [userHype, setUserHype] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('la')
    loadUser()
  }, [])

  const loadUser = async () => {
    const response = await axiosGetWithToken(`users/${userId}`)

    setUserHype(response.data)
    setLoading(false)
  }

  if (loading) {
    return <CustomLoader />
  }

  return (
    <ImageBackground
      source={
        userHype.avatar !== null
          ? {
              uri: `${URL_SERVER}/storage/${userHype.avatar}`,
            }
          : require('../../assets/images/png/default-avatar.png')
      }
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
