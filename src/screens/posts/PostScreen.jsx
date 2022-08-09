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
import React from 'react'

import { useTheme } from 'react-native-paper'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

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

const { width, height } = Dimensions.get('window')

const PostScreen = ({ navigation, route }) => {
  const { colors } = useTheme()
  const { formatDate } = useUtils()

  const { post } = route.params

  return (
    <CustomContainer label={post.title} pressBack={() => navigation.goBack()}>
      <View style={[p20, { flex: 1 }]}>
        {/* HEADER */}
        <View style={[rowCenter, mb10]}>
          <TouchableOpacity onPress={() => {}} style={rowCenter}>
            <ImageBackground
              source={{
                uri: post.avatar,
              }}
              style={styles.avatar}
              imageStyle={styles.avatarStyle}
            />
            <View style={ml20}>
              <Text style={[littleTitle, { color: darkColor }]}>
                Prénom Nom
              </Text>
              <Text style={[defaultText, { color: darkColor }]}>
                {post.club ? post.club : post.hike}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={{ marginLeft: 'auto' }}>
            <MaterialCommunityIcons
              name="star-outline"
              size={30}
              color={colors.text}
            />
          </TouchableOpacity>
        </View>

        <View style={[rowCenter, { justifyContent: 'space-between' }]}>
          <CustomIconButton
            text={`J'aime (${post.likes})`}
            size="45%"
            onPress={() => {}}
            textStyle={{ fontSize: 16 }}
            iconLeft={
              <MaterialCommunityIcons
                name="thumb-up-outline"
                size={22}
                color={whiteColor}
                style={mr10}
              />
            }
          />

          <CustomIconButton
            text={`Commenter (${post.comments})`}
            size="45%"
            onPress={() => navigation.navigate('Comments', { data: post })}
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
              Article créé le : {formatDate(post.date)}
            </Text>
            <View style={styles.imageContainer}>
              <Image
                source={{
                  // uri: 'https://www.hautbugey-tourisme.com/wp-content/uploads/wpetourisme/12021513-diaporama-1023x682.jpg',
                  uri: 'https://www.cycletyres.fr/blog/wp-content/uploads/2018/06/assegai-og-spot3-e1528644947129.jpg',
                }}
                style={styles.image}
              />
            </View>

            <Text style={[defaultText, my10, { color: colors.text }]}>
              {post.message}
            </Text>
          </View>
        </ScrollView>
      </View>
    </CustomContainer>
  )
}

export default PostScreen

const styles = StyleSheet.create({
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
