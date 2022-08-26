import { StyleSheet, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { useTheme } from 'react-native-paper'

import { defaultText, grayColor, p20 } from '../../assets/styles/styles'

import CustomContainer from '../../components/CustomContainer'
import CustomBigButton from '../../components/CustomBigButton'
import useAxios from '../../hooks/useAxios'
import useCustomToast from '../../hooks/useCustomToast'

const EditCommentScreen = ({ navigation, route }) => {
  const { colors } = useTheme()
  const { toastShow } = useCustomToast()
  const { axiosPutWithToken } = useAxios()

  const [comment, setComment] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [postBelongUser, setPostBelongUser] = useState(null)

  useEffect(() => {
    if (route.params?.editComment) {
      setLoading(true)
      setComment(route.params.editComment)
      setMessage(route.params.editComment.message)
      setPostBelongUser(route.params.postBelongUser)
    }
  }, [route.params?.editComment])

  useEffect(() => {
    if (comment) {
      setLoading(false)
      // console.log('comment', comment)
    }
  }, [comment])

  const sendComment = async () => {
    if (message !== '' && message.length > 0) {
      if (postBelongUser) {
        await axiosPutWithToken(`users/posts/comments/${comment.id}`, {
          message,
        })
      } else {
        await axiosPutWithToken(`comments/${comment.id}`, {
          message,
        })
      }

      toastShow({
        title: 'Commentaire modifié !',
        message: 'Commentaire mis à jour avec succès',
      })

      navigation.goBack()
    }
  }

  if (loading) {
    return null
  }

  return (
    <CustomContainer
      label="Modifier commentaire"
      pressBack={() => navigation.goBack()}
    >
      <View style={p20}>
        <View style={styles.textAreaContainer}>
          <TextInput
            multiline
            numberOfLines={10}
            underlineColorAndroid="transparent"
            placeholder="Votre commentaire ici"
            onChangeText={setMessage}
            value={message}
            style={[defaultText, styles.textArea, { color: colors.text }]}
          />
        </View>

        <CustomBigButton label="Modifier Commentaire" onPress={sendComment} />
      </View>
    </CustomContainer>
  )
}

export default EditCommentScreen

const styles = StyleSheet.create({
  textAreaContainer: {
    borderColor: grayColor,
    borderWidth: 1,
    padding: 5,
    borderRadius: 8,
  },
  textArea: {
    height: 150,
    textAlignVertical: 'top',
  },
})
