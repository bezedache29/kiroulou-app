import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import { URL_SERVER } from 'react-native-dotenv'

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { useTheme } from 'react-native-paper'

import { useStoreState } from 'easy-peasy'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { useIsFocused } from '@react-navigation/native'
import {
  darkColor,
  defaultText,
  littleTitle,
  mb10,
  ml20,
  mr10,
  my10,
  p20,
  rowCenter,
  whiteColor,
} from '../../assets/styles/styles'

import CustomContainer from '../../components/CustomContainer'
import useUtils from '../../hooks/useUtils'
import CustomIconButton from '../../components/CustomIconButton'
import useAxios from '../../hooks/useAxios'
import useCustomToast from '../../hooks/useCustomToast'
import CustomImageViewer from '../../components/CustomImageViewer'
import RenderHeaderImageViewer from '../profile/images/renders/RenderHeaderImageViewer'
import CustomBSModal from '../../components/CustomBSModal'
import ButtonBS from '../../components/ButtonBS'
import CustomAlert from '../../components/CustomAlert'
import CustomOverlay from '../../components/CustomOverlay'

const { width, height } = Dimensions.get('window')

const PostScreen = ({ navigation, route }) => {
  const { colors } = useTheme()
  const { toastShow } = useCustomToast()
  const { axiosGetWithToken, axiosPostWithToken, axiosDeleteWithToken } =
    useAxios()
  const { formatDate, convertDateSQL } = useUtils()

  const isFocused = useIsFocused()

  const userStore = useStoreState((state) => state.user)
  const { user } = userStore

  const { postId, type } = route.params

  const [post, setPost] = useState(false)
  const [follow, setFollow] = useState(false)
  const [likesCount, setLikesCount] = useState(0)
  const [commentsCount, setCommentsCount] = useState(0)
  const [liked, setLiked] = useState(false)
  const [imageViewer, setImageViewer] = useState(false)
  const [overlay, setOverlay] = useState(false)
  const [showAlertDeletePost, setShowAlertDeletePost] = useState(false)

  // Ref pour la bottomSheet Type
  const optionsPost = useRef(null)

  const closeBottomSheet = () => {
    setOverlay(false)
    optionsPost?.current?.closeBottomSheet()
  }

  // Permet d'ouvrir et fermer la bottomSheet pour choisir le type de vélo
  const toggleBottomSheet = () => {
    if (overlay) {
      closeBottomSheet()
    } else {
      setOverlay(true)
      optionsPost?.current?.openBottomSheet()
    }
  }

  useEffect(() => {
    if (post) {
      checkIfUserFollowed()
    }
  }, [post])

  useEffect(() => {
    if (isFocused) {
      closeBottomSheet()
      loadPost()
    }
  }, [isFocused])

  const loadPost = async () => {
    const response = await axiosGetWithToken(`posts/${postId}/${type}/show`)

    setLikesCount(response.data.post_user_likes_count)
    setCommentsCount(response.data.post_user_comments_count)
    setPost(response.data)
  }

  const checkIfUserFollowed = async () => {
    const response = await axiosGetWithToken(
      `users/${post.user_id}/isUserFollowed`
    )

    console.log('response', response.data)

    if (response.status === 200) {
      setFollow(true)
    }
  }

  const followPressed = async () => {
    setFollow(!follow)

    const response = await axiosPostWithToken(
      `users/${post.user_id}/followOrUnfollow`
    )

    if (response.status === 201) {
      toastShow({
        title: 'Utilisateur follow !',
        message: `Vous suiviez désormais ${post.user_name}`,
      })

      // TODO Notificaiton
    }

    if (response.status === 202) {
      toastShow({
        title: 'Utilisateur unfollow !',
        message: `Vous ne suiviez plus désormais ${post.user_name}`,
      })

      // TODO Notificaiton
    }
  }

  const checkUserLikePost = async () => {
    const response = await axiosGetWithToken(
      `users/posts/${post.id}/isPostLiked`
    )

    if (response.status === 200) {
      toastShow({
        title: 'Article aimé !',
        message: `Vous avez aimé l'article ${post.title}`,
      })
      setLiked(true)
    } else {
      toastShow({
        title: 'Article plus aimé !',
        message: `Vous n'aimez plus l'article ${post.title}`,
      })
      setLiked(false)
    }
  }

  const like = async () => {
    setLiked(!liked)

    const response = await axiosPostWithToken(
      `users/posts/${post.id}/likeOrUnlike`
    )

    setLikesCount(response.data.post.post_user_likes_count)
    await checkUserLikePost()
  }

  const deletePost = async () => {
    const response = await axiosDeleteWithToken(`users/posts/${post.id}`)

    if (response.status === 201) {
      toastShow({
        title: 'Article supprimé !',
        message: 'Votre article a bien été supprimé',
      })

      closeBottomSheet()
      navigation.goBack()
    } else {
      toastShow({
        title: 'Action impossible',
        message: `Merci de réessayer plus tard (${response.status})`,
        type: 'toast_danger',
      })
    }
  }

  if (!post) {
    return null
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <CustomContainer
          label={post.title}
          pressBack={() => navigation.goBack()}
          editIcon
          iconName="note-edit"
          onPressEdit={toggleBottomSheet}
        >
          <View style={[p20, { flex: 1 }]}>
            {overlay && <CustomOverlay />}
            {/* HEADER */}
            <View style={[rowCenter, mb10]}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('UserProfile', { userId: post.user_id })
                }
                style={rowCenter}
              >
                <ImageBackground
                  source={{
                    // uri: post.user.avatar,
                    uri: `${URL_SERVER}/storage/${post.user.avatar}`,
                  }}
                  style={styles.avatar}
                  imageStyle={styles.avatarStyle}
                />
                <View style={ml20}>
                  <Text style={[littleTitle, { color: darkColor }]}>
                    {post.user_name}
                  </Text>
                  <Text style={[defaultText, { color: darkColor }]}>
                    {post.user.club_name}
                  </Text>
                </View>
              </TouchableOpacity>
              {user.id !== post.user_id && (
                <TouchableOpacity
                  onPress={followPressed}
                  style={{ marginLeft: 'auto' }}
                >
                  <MaterialCommunityIcons
                    name={follow ? 'star' : 'star-outline'}
                    size={30}
                    color={colors.text}
                  />
                </TouchableOpacity>
              )}
            </View>

            <View style={[rowCenter, { justifyContent: 'space-between' }]}>
              <CustomIconButton
                isText
                text={`J'aime (${likesCount})`}
                size="45%"
                onPress={like}
                textStyle={{ fontSize: 16 }}
                iconLeft={
                  <MaterialCommunityIcons
                    name={liked ? 'thumb-up' : 'thumb-up-outline'}
                    size={22}
                    color={whiteColor}
                    style={mr10}
                  />
                }
              />

              <CustomIconButton
                isText
                text={`Commenter (${commentsCount})`}
                size="45%"
                onPress={() => navigation.navigate('Comments', { item: post })}
                textStyle={{ fontSize: 16 }}
                iconLeft={
                  <MaterialCommunityIcons
                    name="comment-text-outline"
                    size={22}
                    color={whiteColor}
                    style={mr10}
                  />
                }
              />
            </View>

            {/* CONTENT */}
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ flex: 1 }}>
                <Text style={[my10, defaultText, { color: colors.text }]}>
                  Article créé le :{' '}
                  {formatDate(convertDateSQL(post.created_at))}
                </Text>
                {post.images.length > 0 && (
                  <TouchableOpacity
                    onPress={() => setImageViewer(true)}
                    style={styles.imageContainer}
                  >
                    <Image
                      source={{
                        uri: `${URL_SERVER}/storage/${post.images[0].image}`,
                      }}
                      style={styles.image}
                    />
                  </TouchableOpacity>
                )}

                <Text style={[defaultText, my10, { color: colors.text }]}>
                  {post.description}
                </Text>
              </View>
            </ScrollView>
          </View>

          {/* Permet de voir l'image en fullScreen */}
          {post.images.length > 0 && (
            <CustomImageViewer
              showModal={imageViewer}
              setShowModal={setImageViewer}
              imageUrls={[
                { url: `${URL_SERVER}/storage/${post.images[0].image}` },
              ]}
              renderHeader={() => (
                <RenderHeaderImageViewer setImageViewer={setImageViewer} />
              )}
            />
          )}

          {/* BottomSheet pour les les options de post */}
          <CustomBSModal
            title="Que souhaitez vous faire ?"
            SP={['25%', '30%']}
            ref={optionsPost}
            onDismiss={closeBottomSheet}
          >
            <ButtonBS
              onPress={() => {
                setShowAlertDeletePost(true)
              }}
              cancel
            >
              Supprimer l'article
            </ButtonBS>
            <ButtonBS
              onPress={() =>
                navigation.navigate('AddOrEditPost', { editPost: post })
              }
            >
              Modifier l'article
            </ButtonBS>
          </CustomBSModal>

          {/* Alert suppression du post */}
          <CustomAlert
            showAlert={showAlertDeletePost}
            title="Attention !"
            message={`Etes vous sur de vouloir supprimer le post ${post?.title} ?`}
            onDismiss={() => setShowAlertDeletePost(false)}
            onCancelPressed={() => setShowAlertDeletePost(false)}
            onConfirmPressed={() => deletePost()}
          />
        </CustomContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

export default PostScreen

const styles = StyleSheet.create({
  editIcon: {
    position: 'absolute',
    top: 10,
    right: 20,
  },
  avatar: {
    width: 35,
    height: 35,
  },
  avatarStyle: {
    borderRadius: 25,
  },
  imageContainer: {
    width: width - 30,
    maxHeight: height / 3,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
})
