import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useEffect, useState } from 'react'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { useStoreState } from 'easy-peasy'

import { URL_SERVER } from 'react-native-dotenv'
import {
  cancelColor,
  dangerColor,
  darkColor,
  defaultText,
  defaultTextBold,
  ml10,
  mr10,
  secondaryColor,
} from '../../../assets/styles/styles'

import CustomDivider from '../../CustomDivider'
import CustomButton from '../../CustomButton'
import useAxios from '../../../hooks/useAxios'
import useCustomToast from '../../../hooks/useCustomToast'

const MembersCard = ({
  member,
  redBtn,
  onPressLeftBtn,
  onPressRightBtn,
  disabled,
  club,
}) => {
  console.log('member', member)
  const { axiosGetWithToken, axiosPostWithToken } = useAxios()
  const { toastShow } = useCustomToast()

  const userStore = useStoreState((state) => state.user)
  const { user } = userStore

  const [follow, setFollow] = useState(false)
  const [userName, setUserName] = useState('')

  useEffect(() => {
    if (member.firstname) {
      setUserName(`${member.firstname} ${member.lastname}`)
    } else {
      setUserName(member.email)
    }
    checkIfUserFollowed()
  }, [])

  const checkIfUserFollowed = async () => {
    const response = await axiosGetWithToken(
      `users/${member.id}/isUserFollowed`
    )

    if (response.status === 200) {
      setFollow(true)
    }
  }

  const followPressed = async () => {
    setFollow(!follow)

    const response = await axiosPostWithToken(
      `users/${member.id}/followOrUnfollow`
    )

    if (response.status === 201) {
      toastShow({
        title: 'Utilisateur follow !',
        message: `Vous suiviez désormais ${userName}`,
      })

      // TODO Notification
    }

    if (response.status === 202) {
      toastShow({
        title: 'Utilisateur unfollow !',
        message: `Vous ne suiviez plus désormais ${userName}`,
      })

      // TODO Notification
    }
  }

  return (
    <View style={styles.container}>
      {/* Ajout favoris */}
      {user.id !== member.id && (
        <TouchableOpacity onPress={followPressed} style={styles.editIcon}>
          <MaterialCommunityIcons
            name={follow ? 'star' : 'star-outline'}
            size={25}
            color={darkColor}
          />
        </TouchableOpacity>
      )}

      {/* Icon */}
      <View style={styles.header}>
        <ImageBackground
          source={
            member.avatar !== null
              ? {
                  uri: `${URL_SERVER}/storage/${member.avatar}`,
                }
              : require('../../../assets/images/png/default-avatar.png')
          }
          style={styles.avatar}
          imageStyle={{ borderRadius: 25 }}
        />

        <View>
          {/* Nom du member */}
          <Text style={[defaultTextBold, { color: darkColor }]}>
            {member.firstname
              ? `${member.firstname} ${member.lastname}`
              : member.email}
          </Text>
          {/* Ville du member */}
          <Text style={[defaultText, { color: darkColor, fontSize: 14 }]}>
            {member.address ? member.address.city.name : 'Ville non renseignée'}
          </Text>
        </View>
      </View>

      <CustomDivider addStyle={{ borderTopColor: darkColor }} />

      <View style={styles.content}>
        {/* Date membre */}
        <Text style={[defaultText, mr10, { color: darkColor }]}>
          Premium : {member.premium === 'active' ? 'Oui' : 'Non'}
        </Text>
        <Text style={[defaultText, ml10, { color: darkColor }]}>
          Followers : {member.followers_count}
        </Text>
      </View>

      <CustomDivider addStyle={{ borderTopColor: darkColor }} />

      <View style={styles.buttons}>
        {/* Btn demande adhesion */}

        {user.is_club_admin === 1 && user.club_id === club.id && (
          <CustomButton
            onPress={onPressLeftBtn}
            disabled={disabled}
            btnStyle={{ width: '49%' }}
            gradient={[cancelColor, dangerColor]}
          >
            {redBtn}
          </CustomButton>
        )}

        {/* Btn voir détails */}
        <CustomButton
          onPress={onPressRightBtn}
          btnStyle={{
            width:
              user.is_club_admin === 1 && user.club_id === club.id
                ? '49%'
                : '100%',
          }}
        >
          Voir détails
        </CustomButton>
      </View>
    </View>
  )
}

export default MembersCard

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 10,
    backgroundColor: secondaryColor,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
    shadowColor: darkColor,
    marginBottom: 10,
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
  editIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 2,
  },
})
