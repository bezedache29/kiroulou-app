import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { URL_SERVER } from 'react-native-dotenv'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { useStoreState } from 'easy-peasy'

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
import useUtils from '../../../hooks/useUtils'

const ClubsFollowCard = ({ club, unfollow }) => {
  const { formatDate } = useUtils()

  const navigation = useNavigation()

  const userStore = useStoreState((state) => state.user)
  const { user } = userStore

  return (
    <View style={styles.container}>
      {/* Icon */}
      <View style={styles.header}>
        <ImageBackground
          source={{
            uri: `${URL_SERVER}/storage/${club.avatar}`,
          }}
          style={styles.avatar}
          imageStyle={{ borderRadius: 25 }}
        />
        <View>
          {/* Nom du club */}
          <Text style={[defaultTextBold, { color: darkColor }]}>
            {club.short_name !== null ? club.short_name : club.name}
          </Text>
          {/* Ville du club */}
          <Text style={[defaultText, { color: darkColor, fontSize: 14 }]}>
            {club.address.city.name} ({club.address.department_code})
          </Text>
        </View>
      </View>

      <CustomDivider addStyle={{ borderTopColor: darkColor }} />

      {user.premium === 'active' ||
        (user.club_id === club.id && user.is_club_admin === 1 && (
          <View style={styles.content}>
            {/* Nombre de membres */}
            <Text style={[defaultText, { color: darkColor }]}>
              {club.members_count} membres
            </Text>
            <MaterialCommunityIcons
              name="circle-small"
              size={20}
              color={darkColor}
            />
            {/* Nombre de publications */}
            <Text style={[defaultText, { color: darkColor }]}>
              {club.user_follows_count} followers
            </Text>
          </View>
        ))}

      <CustomDivider addStyle={{ borderTopColor: darkColor }} />

      <View style={styles.content}>
        <Text style={[defaultText, { color: darkColor }]}>
          Prochaine rando :{' '}
          {club.next_hike
            ? formatDate(new Date(club.next_hike.date))
            : 'Pas encore de date'}
        </Text>
      </View>

      <View style={styles.buttons}>
        {/* Btn demande adhesion */}
        <CustomButton
          onPress={() => unfollow(club)}
          btnStyle={{ width: '49%' }}
          gradient={[cancelColor, dangerColor]}
        >
          Ne plus suivre
        </CustomButton>

        {/* Btn voir détails */}
        <CustomButton
          onPress={() =>
            navigation.navigate('ClubProfile', { clubId: club.id })
          }
          btnStyle={{ width: '49%' }}
        >
          Voir détails
        </CustomButton>
      </View>
    </View>
  )
}

export default ClubsFollowCard

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
