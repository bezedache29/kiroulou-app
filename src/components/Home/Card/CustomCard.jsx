import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import React from 'react'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import Share from 'react-native-share'

import {
  darkColor,
  darkPrimaryColor,
  defaultText,
  littleTitle,
  my10,
  secondaryColor,
  textAlignCenter,
  whiteColor,
} from '../../../assets/styles/styles'

import CustomIconButton from '../../CustomIconButton'

import file from '../../../assets/images/base64/image64'

const CustomCard = ({ onPress, item }) => {
  const customShare = async () => {
    const shareOptions = {
      message: `${item.hike ? item.club : item.user} vous informe :\n${
        item.description
      }`,
      // message: 'mon message',
      url: file.image1,
    }

    try {
      const shareResponse = await Share.open(shareOptions)
      console.log(JSON.stringify(shareResponse))
    } catch (err) {
      console.log('error => ', err)
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.header}>
          <ImageBackground
            source={{
              uri: item.avatar,
            }}
            style={styles.avatar}
            imageStyle={styles.avatarStyle}
          />
          <View style={{ flex: 4 }}>
            <Text style={[littleTitle, textAlignCenter, { color: darkColor }]}>
              {item.title}
            </Text>
            <Text style={[defaultText, textAlignCenter, { color: darkColor }]}>
              {item.club ? item.club : item.hike}
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
          onPress={() => {}}
          icon={
            <MaterialCommunityIcons
              name="thumb-up-outline"
              size={24}
              color={whiteColor}
            />
          }
        />

        {/* Bouton Comments */}
        <CustomIconButton
          onPress={() => {}}
          icon={
            <MaterialCommunityIcons
              name="comment-text-outline"
              size={24}
              color={whiteColor}
            />
          }
        />

        {/* Bouton share */}
        <CustomIconButton
          onPress={customShare}
          icon={
            <MaterialCommunityIcons
              name="share-variant-outline"
              size={24}
              color={whiteColor}
            />
          }
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 5,
    borderColor: darkPrimaryColor,
    backgroundColor: secondaryColor,
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

export default CustomCard
