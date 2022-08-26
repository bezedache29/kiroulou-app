import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import React, { useEffect, useState } from 'react'

import { useNavigation } from '@react-navigation/native'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { URL_SERVER } from 'react-native-dotenv'

import { useStoreState } from 'easy-peasy'

import {
  darkColor,
  darkPrimaryColor,
  defaultText,
  littleTitle,
  ml10,
  mr10,
  my10,
  textAlignCenter,
  whiteColor,
} from '../../../assets/styles/styles'

import CustomIconButton from '../../CustomIconButton'
import useAxios from '../../../hooks/useAxios'

const CustomCardUser = ({ onPress, item }) => {
  const navigation = useNavigation()
  const { axiosPostWithToken, axiosGetWithToken } = useAxios()

  const userStore = useStoreState((state) => state.user)
  const { user } = userStore

  const [likesCount, setLikesCount] = useState(item.post_user_likes_count)
  const [liked, setLiked] = useState(false)

  const commentsCount = item.post_user_comments_count

  useEffect(() => {
    checkUserLike()
    // console.log('user card', item)
  }, [])

  const checkUserLike = async () => {
    const response = await axiosGetWithToken(
      `users/posts/${item.id}/isPostLiked`
    )

    if (response.status === 200) {
      setLiked(true)
    } else {
      setLiked(false)
    }
  }

  const like = async () => {
    const response = await axiosPostWithToken(
      `users/posts/${item.id}/likeOrUnlike`
    )
    const { post } = response.data

    checkUserLike()
    setLikesCount(post.post_user_likes_count)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} disabled={user.id === item.user.id}>
        <View style={styles.header}>
          {
            // TODO Mettre le lien de l'avatar du user
          }
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('UserProfile', { user: item.user })
            }
          >
            <ImageBackground
              source={{
                uri: `${URL_SERVER}/storage/avatars/${item.user.avatar}`,
              }}
              style={styles.avatar}
              imageStyle={styles.avatarStyle}
            />
          </TouchableOpacity>
          <View style={{ flex: 4 }}>
            <Text style={[littleTitle, textAlignCenter, { color: darkColor }]}>
              {item.title}
            </Text>
            <Text style={[defaultText, textAlignCenter, { color: darkColor }]}>
              {item.user.club_name}
            </Text>
          </View>
        </View>
        <View style={my10}>
          <Text numberOfLines={3} style={[defaultText, { color: darkColor }]}>
            {item.description}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.containerPosts}>
        {/* Bouton like */}
        <CustomIconButton
          disabled={user.id === item.user.id}
          onPress={like}
          size="49%"
          icon={
            <MaterialCommunityIcons
              name={liked ? 'thumb-up' : 'thumb-up-outline'}
              size={24}
              color={whiteColor}
              style={ml10}
            />
          }
          isText
          text={likesCount}
        />

        {/* Bouton Comments */}
        <CustomIconButton
          size="49%"
          onPress={() => navigation.navigate('Comments', { item })}
          iconLeft={
            <MaterialCommunityIcons
              name="comment-text-outline"
              size={24}
              color={whiteColor}
              style={mr10}
            />
          }
          isText
          text={commentsCount}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 8,
    borderColor: darkPrimaryColor,
    backgroundColor: whiteColor,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
    shadowColor: darkColor,
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
  containerPosts: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
})

export default CustomCardUser
