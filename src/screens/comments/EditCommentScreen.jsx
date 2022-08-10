import { StyleSheet, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { useTheme } from 'react-native-paper'

import { defaultText, grayColor, p20 } from '../../assets/styles/styles'

import CustomContainer from '../../components/CustomContainer'
import CustomBigButton from '../../components/CustomBigButton'

const EditCommentScreen = ({ navigation, route }) => {
  const { colors } = useTheme()

  const [comment, setComment] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (route.params?.editComment) {
      setLoading(true)
      setComment(route.params.editComment)
    }
  }, [route.params?.editComment])

  useEffect(() => {
    if (comment) {
      setLoading(false)
      console.log('comment', comment)
    }
  }, [comment])

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
            onChangeText={setComment}
            value={comment.message}
            style={[defaultText, styles.textArea, { color: colors.text }]}
          />
        </View>

        <CustomBigButton label="Modifier Commentaire" onPress={() => {}} />
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
