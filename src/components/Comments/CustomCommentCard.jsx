import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useEffect, useState } from 'react'

import { useTheme } from 'react-native-paper'

import { URL_SERVER } from 'react-native-dotenv'

import { useStoreState } from 'easy-peasy'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import useAxios from '../../hooks/useAxios'
import useUtils from '../../hooks/useUtils'
import {
  darkPrimaryColor,
  defaultText,
  littleTitle,
  ml20,
  my10,
  rowCenter,
} from '../../assets/styles/styles'
import useCustomToast from '../../hooks/useCustomToast'

const CustomCommentCard = ({ item, toggleBottomSheet }) => {
  const { colors } = useTheme()
  const { axiosGetWithToken, axiosPostWithToken } = useAxios()
  const { formatDate, convertDateSQL } = useUtils()
  const { toastShow } = useCustomToast()

  const userStore = useStoreState((state) => state.user)
  const { user } = userStore

  const [followed, setFollowed] = useState(false)

  useEffect(() => {
    checkFollowed()
    console.log('item comment card', item)
  }, [])

  const follow = async () => {
    setFollowed(!followed)

    const response = await axiosPostWithToken(
      `users/${item.user_id}/followOrUnfollow`
    )

    if (response.status === 201) {
      toastShow({
        title: `${item.user_name} follow !`,
        message: `Bravo ! ${item.user_name} a été ajouté à votre liste de follow`,
      })
    }

    if (response.status === 202) {
      toastShow({
        title: `${item.user_name} unfollow !`,
        message: `${item.user_name} n'est plus dans votre liste de follow`,
      })
    }
  }

  const checkFollowed = async () => {
    const response = await axiosGetWithToken(
      `users/${item.user_id}/isUserFollowed`
    )

    if (response.status === 200) {
      setFollowed(true)
    }
  }

  return (
    <View
      style={[
        styles.renderItem,
        {
          backgroundColor:
            item.user_id === user.id ? darkPrimaryColor : colors.backgroundBox,
        },
      ]}
    >
      <View style={[rowCenter]}>
        <TouchableOpacity onPress={() => {}} style={styles.header}>
          <ImageBackground
            source={
              item.user_avatar_name !== null
                ? {
                    uri: `${URL_SERVER}/storage/${item.user_avatar_name}`,
                  }
                : require('../../assets/images/png/default-avatar.png')
            }
            style={styles.avatar}
            imageStyle={styles.avatarStyle}
          />
          <View style={ml20}>
            <Text style={[littleTitle, { color: colors.text }]}>
              {item.user_name}
            </Text>
            <Text style={[defaultText, { color: colors.text }]}>
              {item.user_club_name}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Icon et fonction différente si c'est mon commentaire ou non */}
        {item.user_id === user.id ? (
          <TouchableOpacity
            onPress={() => toggleBottomSheet(item)}
            style={{ marginLeft: 'auto' }}
          >
            <MaterialCommunityIcons
              name="cog-outline"
              size={30}
              color={colors.text}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => follow()}
            style={{ marginLeft: 'auto' }}
          >
            <MaterialCommunityIcons
              name={followed ? 'star' : 'star-outline'}
              size={30}
              color={colors.text}
            />
          </TouchableOpacity>
        )}
      </View>

      <Text
        style={[
          defaultText,
          my10,
          { color: colors.text, fontSize: 14, fontStyle: 'italic' },
        ]}
      >
        écrit le {formatDate(convertDateSQL(item.created_at))}
      </Text>

      <Text style={[defaultText, { color: colors.text }]}>{item.message}</Text>
    </View>
  )
}

export default CustomCommentCard

const styles = StyleSheet.create({
  renderItem: {
    borderWidth: 1,
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
    borderRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 35,
    height: 35,
  },
  avatarStyle: {
    borderRadius: 25,
  },
})
