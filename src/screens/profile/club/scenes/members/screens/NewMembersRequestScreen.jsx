import { FlatList, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'

import { useTheme } from 'react-native-paper'

import {
  darkColor,
  defaultText,
  mt20,
  textAlignCenter,
  TitleH3,
  TitleH4,
} from '../../../../../../assets/styles/styles'

import CustomContainer from '../../../../../../components/CustomContainer'
import CustomBox from '../../../../../../components/CustomBox'
import UserWaitMembershipCard from '../../../../../../components/Profile/Club/UserWaitMembershipCard'
import useAxios from '../../../../../../hooks/useAxios'
import useCustomToast from '../../../../../../hooks/useCustomToast'

const NewMembersRequestScreen = ({ navigation, route }) => {
  const { colors } = useTheme()
  const { axiosGetWithToken, axiosDeleteWithToken, axiosPostWithToken } =
    useAxios()
  const { toastShow } = useCustomToast()

  const { club, pendingUsers } = route.params

  const [users, setUsers] = useState(pendingUsers)
  const [isFetching, setIsFetching] = useState(false)

  // Au refresh en haut de screen
  const onRefresh = useCallback(() => {
    setIsFetching(true)
    loadPendingUsers()
    setTimeout(() => {
      setIsFetching(false)
    }, 2000)
  })

  // Permet de chercher les demandes d'adhésion au club
  const loadPendingUsers = async () => {
    const response = await axiosGetWithToken(
      `clubs/${club.id}/showJoinRequests`
    )

    const users = []

    for (const user of response.data) {
      const res = await axiosGetWithToken(`users/${user.user_id}`)
      users.push(res.data)
    }

    setUsers(users)
  }

  // Refuse une adhésion au club
  const refuse = async (userId) => {
    const response = await axiosDeleteWithToken(
      `clubs/${club.id}/denyRequestToJoin`,
      { user_id: userId }
    )

    if (response.status === 201) {
      toastShow({
        title: 'Refus de la demande',
        message: 'Le refus de la demande a bien été pris en compte',
      })

      // TODO Notification au user pour refus

      const users = []

      for (const user of response.data.join_requests) {
        const res = await axiosGetWithToken(`users/${user.user_id}`)
        users.push(res.data)
      }

      setUsers(users)
    }
  }

  // Accpet la demande d'adhésion au club
  const accept = async (userId) => {
    const response = await axiosPostWithToken(
      `clubs/${club.id}/acceptRequestToJoin`,
      { user_id: userId }
    )

    if (response.status === 409) {
      toastShow({
        title: 'Action impossible !',
        message: response.data.message,
        type: 'toast_danger',
      })
    }

    if (response.status === 201) {
      toastShow({
        title: 'Nouveau membre !',
        message: "L'utilisateur fait maintenant partie du club",
      })

      // TODO Notification au user pour acceptation adhésion au club

      const users = []

      for (const user of response.data.join_requests) {
        const res = await axiosGetWithToken(`users/${user.user_id}`)
        users.push(res.data)
      }

      setUsers(users)
    }
  }

  return (
    <CustomContainer
      label="Demandes d'adhésion"
      pressBack={() => navigation.goBack()}
    >
      <View style={{ flex: 1 }}>
        <CustomBox style={{ backgroundColor: colors.box }}>
          <Text style={[TitleH4, { color: darkColor }]}>
            Total de membres : {club.members_count}
          </Text>
        </CustomBox>

        <CustomBox style={{ backgroundColor: colors.box }}>
          <Text style={[TitleH4, { color: darkColor }]}>
            Demandes en attente : {users.length}
          </Text>
        </CustomBox>

        <CustomBox
          style={[
            { backgroundColor: colors.box },
            users.length > 0 && { flex: 1 },
          ]}
        >
          <Text style={[defaultText, { color: darkColor }]}>
            Vous pouvez accepter ou refuser les personnes qui shouaite adhérer.
          </Text>

          <FlatList
            data={users}
            ListEmptyComponent={() => (
              <View>
                <Text
                  style={[
                    textAlignCenter,
                    TitleH3,
                    { color: darkColor, marginVertical: 50 },
                  ]}
                >
                  Pas de demandes pour le moment
                </Text>
              </View>
            )}
            renderItem={({ item }) => (
              <UserWaitMembershipCard
                user={item}
                refuse={() => refuse(item.id)}
                accept={() => accept(item.id)}
              />
            )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            onRefresh={onRefresh}
            refreshing={isFetching}
            style={[mt20]}
          />
        </CustomBox>
      </View>
    </CustomContainer>
  )
}

export default NewMembersRequestScreen
