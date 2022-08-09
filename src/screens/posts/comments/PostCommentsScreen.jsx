import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useEffect, useState } from 'react'

import { useTheme } from 'react-native-paper'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {
  darkPrimaryColor,
  defaultText,
  littleTitle,
  ml20,
  my10,
  rowCenter,
  textAlignCenter,
} from '../../../assets/styles/styles'

import CustomContainer from '../../../components/CustomContainer'
import useFaker from '../../../hooks/useFaker'
import useUtils from '../../../hooks/useUtils'

const PostCommentsScreen = ({ navigation, route }) => {
  const { colors } = useTheme()
  const { formatDate } = useUtils()
  const { createFakeComment } = useFaker()

  const { post } = route.params

  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')

  useEffect(() => {
    for (let i = 0; i < 3; i++) {
      setComments((oldData) => [...oldData, createFakeComment(i + 1)])
    }
  }, [])

  return (
    <CustomContainer label="Commentaires" pressBack={() => navigation.goBack()}>
      <View style={{ flex: 1, backgroundColor: colors.backgroundNav }}>
        <FlatList
          style={styles.flatlist}
          data={comments}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={{ flex: 1 }}>
              <Text
                style={[littleTitle, textAlignCenter, { color: colors.text }]}
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
    </CustomContainer>
  )
}

export default PostCommentsScreen

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
