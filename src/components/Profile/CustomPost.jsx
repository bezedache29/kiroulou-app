import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import React from 'react'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

import {
  darkColor,
  darkPrimaryColor,
  defaultText,
  littleTitle,
  my10,
  secondaryColor,
  textAlignCenter,
  whiteColor,
} from '../../assets/styles/styles'

import CustomIconButton from '../CustomIconButton'

// edit permet d'afficher l'icone d'édition du post, et de desactiver le touchableopacity de la card
const CustomPost = ({ onPress, item, edit = false }) => (
  <View style={styles.container}>
    {/* Icone pour edit le post */}
    {edit && (
      <TouchableOpacity onPress={edit} style={styles.editIcon}>
        <Ionicons name="create-outline" size={35} color={darkColor} />
      </TouchableOpacity>
    )}

    {/* Card */}
    <TouchableOpacity onPress={onPress} disabled={edit}>
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
            {item.club ? item.club : item.trek}
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
        size="49%"
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
        size="49%"
        icon={
          <MaterialCommunityIcons
            name="comment-text-outline"
            size={24}
            color={whiteColor}
          />
        }
      />
    </View>
  </View>
)

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
  editIcon: {
    position: 'absolute',
    top: -5,
    right: -5,
  },
})

export default CustomPost
