import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { useTheme } from 'react-native-paper'

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { useIsFocused } from '@react-navigation/native'
import {
  darkColor,
  darkPrimaryColor,
  defaultText,
  littleTitle,
  rowCenter,
  textAlignCenter,
} from '../../assets/styles/styles'

import CustomContainer from '../../components/CustomContainer'
import CustomBSModal from '../../components/CustomBSModal'
import ButtonBS from '../../components/ButtonBS'
import CustomAlert from '../../components/CustomAlert'
import CustomOverlay from '../../components/CustomOverlay'
import useAxios from '../../hooks/useAxios'
import CustomCommentCard from '../../components/Comments/CustomCommentCard'

const CommentsScreen = ({ navigation, route }) => {
  const { colors } = useTheme()
  const { axiosGetWithToken, axiosPostWithToken, axiosDeleteWithToken } =
    useAxios()

  const { item } = route.params
  const isFocused = useIsFocused()

  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')
  const [overlay, setOverlay] = useState(false)
  const [showDeleteComment, setShowDeleteComment] = useState(false)
  const [commentBS, setCommentBS] = useState(false)
  const [postBelongUser, setPostBelongUser] = useState(null)
  const [page, setPage] = useState(null)
  const [moreLoading, setMoreLoading] = useState(false)
  const [isListEnd, setIsListEnd] = useState(null)
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    // console.log('item on comments', item)
    setPostBelongUser(!item.club_id)
  }, [])

  useEffect(() => {
    if (postBelongUser !== null) {
      setPage(1)
    }
  }, [postBelongUser])

  useEffect(() => {
    if (page !== null) {
      if (page === 1) {
        loadComments(page, true)
      } else {
        loadComments(page)
      }
    }
  }, [page])

  useEffect(() => {
    if (isFocused) {
      if (page !== 1) {
        setPage(1)
      } else {
        loadComments(1, true)
      }
      // TODO Toast message updated
    }
  }, [isFocused])

  // Ref pour la bottomSheet
  const bottomSheetRef = useRef(null)
  const flatList = useRef()

  // Permet d'ouvrir et fermer la bottomSheet pour afficher les options de l'article
  const toggleBottomSheet = (item) => {
    // console.log('item toggle', item)
    if (overlay) {
      setOverlay(false)
      setCommentBS(false)
      bottomSheetRef?.current?.closeBottomSheet()
    } else {
      setOverlay(true)
      setCommentBS(item)
      bottomSheetRef?.current?.openBottomSheet()
    }
  }

  const moveToTop = () => {
    if (comments.length - 1 > 0) {
      flatList.current.scrollToIndex({ index: 0 })
    }
  }

  const loadComments = async (page, refresh = false) => {
    if (postBelongUser !== null) {
      let response

      if (postBelongUser) {
        response = await axiosGetWithToken(
          `users/posts/${item.id}/comments?page=${page}`
        )
      } else {
        response = await axiosGetWithToken(
          `clubs/${item.club_id}/posts/${item.id}/comments?page=${page}`
        )
      }

      if (response.status === 200) {
        if (refresh) {
          setComments(response.data)
          setIsListEnd(false)
        } else if (response.data.length === 0) {
          setIsListEnd(true)
        } else {
          setComments((oldData) => [...oldData, ...response.data])
        }
      }
    }

    setMoreLoading(false)
  }

  // Au refresh en haut de screen
  const onRefresh = useCallback(() => {
    setIsFetching(true)
    setPage(1)
    setTimeout(() => {
      setIsFetching(false)
    }, 2000)
  })

  // Au refresh en bas de screen
  const fetchMoreComments = async () => {
    if (!isListEnd) {
      setMoreLoading(true)
      setPage(page + 1)
    }
  }

  // S'il n'y a plus de pages a chercher lors d'un refresh en bas de screen
  const renderFooter = () => (
    <View style={styles.footer}>
      {moreLoading && <ActivityIndicator />}
      {isListEnd && (
        <Text style={[defaultText, { color: darkColor }]}>
          Pas d'autres commentaires
        </Text>
      )}
    </View>
  )

  const sendComment = async () => {
    if (comment !== '' && comment.length > 0) {
      let response

      if (postBelongUser) {
        response = await axiosPostWithToken(`users/posts/${item.id}/comments`, {
          message: comment,
        })
      } else {
        response = await axiosPostWithToken(
          `clubs/${item.club_id}/posts/${item.id}/comments`,
          {
            message: comment,
          }
        )
      }

      // console.log('resp comment', response.data)

      if (response.status === 201) {
        if (page !== 1) {
          setPage(1)
        } else {
          loadComments(1, true)
        }
        moveToTop()
        setComment('')
        setIsListEnd(false)
        // TODO TOast
      }
    }
  }

  const deleteComment = async (comment) => {
    setShowDeleteComment(false)
    let response

    if (postBelongUser) {
      response = await axiosDeleteWithToken(
        `users/posts/comments/${comment.id}`
      )

      // console.log('response delete comment user', response.data)
    } else {
      response = await axiosDeleteWithToken(`comments/${comment.id}`)

      // console.log('response delete comment club', response.data)
    }

    if (response.status === 201) {
      setOverlay(false)
      setCommentBS(false)
      bottomSheetRef?.current?.closeBottomSheet()

      if (page !== 1) {
        setPage(1)
      } else {
        loadComments(1, true)
      }

      // TODO Toast Suppression success
    }
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <CustomContainer
          label="Commentaires"
          pressBack={() => navigation.goBack()}
        >
          <View style={{ flex: 1, backgroundColor: colors.backgroundNav }}>
            {overlay && <CustomOverlay />}

            <FlatList
              ref={flatList}
              style={styles.flatlist}
              data={comments}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={() => (
                <View style={{ flex: 1 }}>
                  <Text
                    style={[
                      littleTitle,
                      textAlignCenter,
                      { color: colors.text },
                    ]}
                  >
                    Pas de commentaires
                  </Text>
                </View>
              )}
              renderItem={({ item }) => (
                <CustomCommentCard
                  item={item}
                  toggleBottomSheet={() => toggleBottomSheet(item)}
                />
              )}
              keyExtractor={(item) => item.id}
              onEndReachedThreshold={0.5} // Formule (20 - (1.6666 * 6)) - Se declenche au 10 eme post
              onEndReached={fetchMoreComments}
              ListFooterComponent={renderFooter}
              onRefresh={onRefresh}
              refreshing={isFetching}
            />

            {/* Input pour ajouter un commentaire */}
            <View style={styles.inputContainer}>
              <View style={[rowCenter]}>
                <TextInput
                  onChangeText={setComment}
                  value={comment}
                  placeholder="Votre commentaire ..."
                  placeholderTextColor={colors.text}
                  style={[
                    defaultText,
                    {
                      backgroundColor: colors.background,
                      borderColor: colors.border,
                      color: colors.text,
                    },
                    styles.inputComment,
                  ]}
                />

                {/* IconSend Commentaire */}
                <TouchableOpacity onPress={sendComment} style={styles.iconSend}>
                  <MaterialCommunityIcons
                    name="send"
                    size={33}
                    color={comment !== '' ? darkPrimaryColor : colors.text}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* BottomSheet pour options du commentaire */}
          <CustomBSModal
            title="Que souhaitez vous faire ?"
            SP={['25%', '30%']}
            ref={bottomSheetRef}
            onDismiss={() => {
              bottomSheetRef?.current?.closeBottomSheet()
              setOverlay(false)
              setCommentBS(false)
            }}
          >
            <ButtonBS onPress={() => setShowDeleteComment(true)} cancel>
              Supprimer le commentaire
            </ButtonBS>
            <ButtonBS
              onPress={() => {
                bottomSheetRef?.current?.closeBottomSheet()
                setOverlay(false)
                navigation.navigate('EditComment', {
                  editComment: commentBS,
                  postBelongUser,
                })
              }}
            >
              Modifier le commentaire
            </ButtonBS>
          </CustomBSModal>

          {/* Alert du suppression de commentaire */}
          <CustomAlert
            showAlert={showDeleteComment}
            title="Attention !"
            message="Etes vous sur de vouloir supprimer le commentaire ?"
            onDismiss={() => setShowDeleteComment(false)}
            onCancelPressed={() => setShowDeleteComment(false)}
            onConfirmPressed={() => deleteComment(commentBS)}
          />
        </CustomContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

export default CommentsScreen

const styles = StyleSheet.create({
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
  flatlist: {
    marginBottom: 50,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    marginTop: 50,
  },
  inputComment: {
    borderTopWidth: 1,
    padding: 10,
    width: '100%',
  },
  iconSend: {
    position: 'absolute',
    bottom: 8,
    right: 5,
  },
  footer: {
    marginBottom: 30,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
