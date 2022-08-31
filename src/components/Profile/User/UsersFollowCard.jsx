import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { URL_SERVER } from 'react-native-dotenv'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { useNavigation } from '@react-navigation/native'
import {
  cancelColor,
  dangerColor,
  darkColor,
  defaultText,
  defaultTextBold,
  secondaryColor,
} from '../../../assets/styles/styles'

import CustomDivider from '../../CustomDivider'
import CustomButton from '../../CustomButton'

const UsersFollowCard = ({ user, unfollow }) => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      {/* Icon */}
      <View style={styles.header}>
        <ImageBackground
          source={
            user.avatar !== null
              ? {
                  uri: `${URL_SERVER}/storage/${user.avatar}`,
                }
              : require('../../../assets/images/png/default-avatar.png')
          }
          style={styles.avatar}
          imageStyle={{ borderRadius: 25 }}
        />
        <View>
          {/* Nom du user */}
          <Text style={[defaultTextBold, { color: darkColor }]}>
            {user.firstname ? `${user.firstname} ${user.lastname}` : user.email}
          </Text>
          {/* club du user */}
          <Text style={[defaultText, { color: darkColor, fontSize: 14 }]}>
            {user.club_name}
          </Text>
        </View>
      </View>

      <CustomDivider addStyle={{ borderTopColor: darkColor }} />

      <View style={styles.content}>
        {/* Département du user */}
        <Text style={[defaultText, { color: darkColor }]}>
          {user.address !== null
            ? `${user.address.city.name} (${user.address.department_code})`
            : 'Ville non rensigné'}
        </Text>
        <MaterialCommunityIcons
          name="circle-small"
          size={20}
          color={darkColor}
        />
        {/* Nombre de followers */}
        <Text style={[defaultText, { color: darkColor }]}>
          {user.followers_count} followers
        </Text>
      </View>

      <View style={styles.buttons}>
        {/* Btn unfollow */}
        <CustomButton
          onPress={() => unfollow(user)}
          btnStyle={{ width: '49%' }}
          gradient={[cancelColor, dangerColor]}
        >
          Ne plus suivre
        </CustomButton>

        {/* Btn voir détails */}
        <CustomButton
          onPress={() =>
            navigation.navigate('UserProfile', { userId: user.id })
          }
          btnStyle={{ width: '49%' }}
        >
          Voir détails
        </CustomButton>
      </View>
    </View>
  )
}

export default UsersFollowCard

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 10,
    backgroundColor: secondaryColor,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
    shadowColor: darkColor,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 35,
    height: 35,
    marginRight: 20,
    marginLeft: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
})
