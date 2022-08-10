import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import { useTheme } from 'react-native-paper'

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {
  darkPrimaryColor,
  defaultText,
  littleTitle,
  ml20,
  my10,
  rowCenter,
  textAlignCenter,
} from '../../assets/styles/styles'

import CustomContainer from '../../components/CustomContainer'
import useFaker from '../../hooks/useFaker'
import useUtils from '../../hooks/useUtils'
import CustomBSModal from '../../components/CustomBSModal'
import ButtonBS from '../../components/ButtonBS'
import CustomAlert from '../../components/CustomAlert'
import CustomOverlay from '../../components/CustomOverlay'

const CommentsScreen = ({ navigation, route }) => {
  const { colors } = useTheme()
  const { formatDate } = useUtils()
  const { createFakeComment } = useFaker()

  const { data } = route.params

  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')
  const [myPost, setMyPost] = useState(true) // Pour intégration / tests
  const [overlay, setOverlay] = useState(false)
  const [showDeleteComment, setShowDeleteComment] = useState(false)
  const [commentBS, setCommentBS] = useState(false)

  useEffect(() => {
    for (let i = 0; i < 3; i++) {
      setComments((oldData) => [...oldData, createFakeComment(i + 1)])
    }
  }, [])

  // Ref pour la bottomSheet
  const bottomSheetRef = useRef(null)

  // Permet d'ouvrir et fermer la bottomSheet pour afficher les options de l'article
  const toggleBottomSheet = (item) => {
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

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <CustomContainer
          label="Commentaires"
          pressBack={() => navigation.goBack()}
        >
          {overlay && <CustomOverlay />}

          <View style={{ flex: 1, backgroundColor: colors.backgroundNav }}>
            <FlatList
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
                <View
                  style={[
                    styles.renderItem,
                    {
                      backgroundColor: colors.backgroundBox,
                    },
                  ]}
                >
                  <View style={[rowCenter]}>
                    <TouchableOpacity onPress={() => {}} style={styles.header}>
                      <ImageBackground
                        source={{
                          uri: item.avatar,
                        }}
                        style={styles.avatar}
                        imageStyle={styles.avatarStyle}
                      />
                      <View style={ml20}>
                        <Text style={[littleTitle, { color: colors.text }]}>
                          {item.firstname} {item.lastname}
                        </Text>
                        <Text style={[defaultText, { color: colors.text }]}>
                          {item.club ? item.club : item.hike}
                        </Text>
                      </View>
                    </TouchableOpacity>

                    {/* Icon et fonction différente si c'est mon commentaire ou non */}
                    {myPost ? (
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
                        onPress={() => {}}
                        style={{ marginLeft: 'auto' }}
                      >
                        <MaterialCommunityIcons
                          name="star-outline"
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
                      { color: colors.text, fontSize: 16 },
                    ]}
                  >
                    {formatDate(item.date)}
                  </Text>

                  <Text style={[defaultText, { color: colors.text }]}>
                    {item.message}
                  </Text>
                </View>
              )}
              keyExtractor={(item) => item.id}
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
                <TouchableOpacity onPress={() => {}} style={styles.iconSend}>
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
            onConfirmPressed={() => setShowDeleteComment(false)}
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
  renderItem: {
    borderWidth: 1,
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
    borderRadius: 8,
    elevation: 5,
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
})
