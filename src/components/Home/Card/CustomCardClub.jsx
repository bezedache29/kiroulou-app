import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import React, { useEffect, useState } from 'react'

import { useNavigation } from '@react-navigation/native'

import { URL_SERVER } from 'react-native-dotenv'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import RNFetchBlob from 'rn-fetch-blob'

import Share from 'react-native-share'

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

const CustomCardClub = ({ onPress, item, disabled = false }) => {
  const navigation = useNavigation()
  const { axiosPostWithToken, axiosGetWithToken } = useAxios()

  const [likesCount, setLikesCount] = useState(item.postlikes_count)
  const [liked, setLiked] = useState(false)

  const commentsCount = item.comments_count

  const shareHike = () => {
    let filePath = null
    const configOptions = { fileCache: true }
    const { fs } = RNFetchBlob
    RNFetchBlob.config(configOptions)
      .fetch('GET', `${URL_SERVER}/storage/${item.hike_vtt.flyer}`)
      .then((resp) => {
        filePath = resp.path()
        return resp.readFile('base64')
      })
      .then(async (base64Data) => {
        base64Data = `data:image/jpeg;base64,${base64Data}`
        await Share.open({
          message: `Je vous partage une rando vtt organisée par ${item.club_name}, trouvé sur KiRoulOu : ${item.description}`,
          url: base64Data,
        })
        // remove the image or pdf from device's storage
        await fs.unlink(filePath)
      })
  }

  useEffect(() => {
    checkUserLike()
    console.log('itemCardClub', item)
  }, [])

  const like = async () => {
    setLiked(!liked)
    const response = await axiosPostWithToken(
      `clubs/${item.club_id}/posts/${item.id}/likeOrUnlike`
    )
    const { post } = response.data

    setLikesCount(post.post_likes_count)
  }

  const checkUserLike = async () => {
    const response = await axiosGetWithToken(
      `clubs/${item.club_id}/posts/${item.id}/isPostLiked`
    )

    if (response.status === 200) {
      setLiked(true)
    } else {
      setLiked(false)
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        style={[{ width: '100%', height: '100%', flex: 1 }]}
        imageStyle={{ opacity: 0.2 }}
        resizeMode="cover"
        source={
          item.hike_vtt !== null || item.cancelled === 0
            ? {
                uri: `${URL_SERVER}/storage/${item.hike_vtt.flyer}`,
              }
            : require('../../../assets/images/png/cancelled.png')
        }
      >
        <TouchableOpacity
          onPress={onPress}
          style={{ padding: 10 }}
          disabled={disabled}
        >
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ClubProfile', { club: item.club })
              }
            >
              <ImageBackground
                source={
                  item.club_avatar !== null
                    ? {
                        uri: `${URL_SERVER}/storage/${item.club_avatar}`,
                      }
                    : require('../../../assets/images/png/default-person.png')
                }
                style={styles.avatar}
                imageStyle={styles.avatarStyle}
              />
            </TouchableOpacity>
            <View style={{ flex: 4 }}>
              <Text
                style={[littleTitle, textAlignCenter, { color: darkColor }]}
              >
                {item.title}
              </Text>
              <Text
                style={[defaultText, textAlignCenter, { color: darkColor }]}
              >
                {item.club.name}
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
            onPress={like}
            isText
            text={likesCount}
            icon={
              <MaterialCommunityIcons
                name={liked ? 'thumb-up' : 'thumb-up-outline'}
                size={24}
                color={whiteColor}
                style={ml10}
              />
            }
          />

          {/* Bouton Comments */}
          <CustomIconButton
            onPress={() => navigation.navigate('Comments', { item })}
            isText
            text={commentsCount}
            iconLeft={
              <MaterialCommunityIcons
                name="comment-text-outline"
                size={24}
                color={whiteColor}
                style={mr10}
              />
            }
          />

          {/* Bouton share */}
          <CustomIconButton
            onPress={shareHike}
            icon={
              <MaterialCommunityIcons
                name="share-variant-outline"
                size={24}
                color={whiteColor}
              />
            }
          />
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: whiteColor,
    marginBottom: 20,
    marginHorizontal: 10,
    borderRadius: 8,
    borderColor: darkPrimaryColor,
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
    padding: 10,
  },
})

export default CustomCardClub
