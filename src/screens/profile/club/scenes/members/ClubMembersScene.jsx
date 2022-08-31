import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import { useIsFocused, useNavigation } from '@react-navigation/native'

import { useTheme } from 'react-native-paper'

import { useStoreState } from 'easy-peasy'

import {
  darkColor,
  darkPrimaryColor,
  defaultLink,
  defaultText,
  mb30,
  mt10,
  mx10,
  my10,
  textAlignCenter,
} from '../../../../../assets/styles/styles'

import MembersCard from '../../../../../components/Profile/Club/MemberCard'
import CustomAlert from '../../../../../components/CustomAlert'
import useAxios from '../../../../../hooks/useAxios'
import useCustomToast from '../../../../../hooks/useCustomToast'

const ClubMembersScene = ({ item }) => {
  const { colors } = useTheme()
  const { axiosGetWithToken, axiosPutWithToken } = useAxios()
  const { toastShow } = useCustomToast()

  const userStore = useStoreState((state) => state.user)
  const { user } = userStore

  const isFocused = useIsFocused()

  const flatListMembers = useRef()

  const [club, setClub] = useState(item)
  const [members, setMembers] = useState([])
  const [member, setMember] = useState({})
  const [showAlert, setShowAlert] = useState(false)
  const [page, setPage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isListEnd, setIsListEnd] = useState(true)
  const [moreLoading, setMoreLoading] = useState(true)
  const [pendingUsers, setPendingUsers] = useState(0)

  const navigation = useNavigation()

  useEffect(() => {
    setPage(1)
  }, [])

  useEffect(() => {
    if (page !== null) {
      if (page === 1) {
        loadMembers(page, true)
      } else {
        loadMembers(page)
      }
    }
  }, [page])

  useEffect(() => {
    if (isFocused) {
      setLoading(true)
      if (page !== 1) {
        setPage(1)
      } else {
        loadMembers(1, true)
      }
    }
  }, [isFocused])

  useEffect(() => {
    if (!loading) {
      moveToTop()
    }
  }, [loading])

  const moveToTop = () => {
    if (members && members.length - 1 > 0) {
      flatListMembers.current.scrollToIndex({ index: 0 })
    }
  }

  const loadMembers = async (page, refresh = false) => {
    const response = await axiosGetWithToken(
      `clubs/${club.id}/clubMembers?page=${page}`
    )

    // console.log('members', response.data.members)
    // console.log(
    //   'members user joint requests',
    //   response.data.user_joint_requests
    // )

    if (response.status === 403) {
      toastShow({
        title: 'Accès refusé !',
        message: response.data.message,
        type: 'toast_danger',
      })
    }

    if (response.status === 200) {
      if (refresh) {
        setMembers(response.data.members)
        setPendingUsers(response.data.user_joint_requests)
        setIsListEnd(false)
      } else if (response.data.members.length === 0) {
        setIsListEnd(true)
      } else {
        setMembers((oldData) => [...oldData, ...response.data.members])
      }
    }

    setMoreLoading(false)
    setLoading(false)
  }

  const expelMember = async () => {
    setShowAlert(false)
    const response = await axiosPutWithToken(
      `clubs/${club.id}/users/${member.id}/expelMember`
    )

    // console.log('response expuls', response.data)

    if (response.status === 201) {
      toastShow({
        title: 'Utilisateur expulsé !',
        message: "L'utilisateur ne fait plus partie du club",
      })

      setClub(response.data.club)

      if (page !== 1) {
        setPage(1)
      } else {
        loadMembers(page, true)
      }
    } else {
      toastShow({
        title: 'Action impossible !',
        message: 'Merci de réessayer plus tard',
        type: 'toast_danger',
      })
    }
  }

  // Au refresh en bas de screen
  const fetchMorePosts = async () => {
    if (!isListEnd) {
      setMoreLoading(true)
      setPage(page + 1)
    }
  }

  // S'il n'y a plus de pages a chercher lors d'un refresh en bas de screen
  const renderFooter = () => (
    <View style={styles.footer}>
      {moreLoading && <ActivityIndicator />}
      {isListEnd && members.length > 0 && (
        <Text style={[defaultText, { color: darkColor }]}>
          Tous les membres sont listés
        </Text>
      )}
    </View>
  )

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {user.club_id === club.id && user.is_club_admin === 1 && (
        <Text
          style={[
            textAlignCenter,
            defaultLink,
            my10,
            { flex: 1, color: darkPrimaryColor },
          ]}
          onPress={() =>
            navigation.navigate('NewMembersRequest', { club, pendingUsers })
          }
        >
          Demandes en attentes : {pendingUsers.length}
        </Text>
      )}

      <View style={{ flex: 20 }}>
        <FlatList
          ref={flatListMembers}
          data={members}
          ListEmptyComponent={() => (
            <View style={styles.containerNoFeed}>
              <Text style={[defaultText, mb30, { color: colors.text }]}>
                Aucun membres dans votre club pour le moment. Acceptez les
                utilisateurs en attentes pour les voir ici
              </Text>
            </View>
          )}
          renderItem={({ item }) => (
            <MembersCard
              member={item}
              club={club}
              redBtn="Expulser"
              disabled={item.id === user.id && user.is_club_admin === 1}
              onPressLeftBtn={() => {
                setShowAlert(true)
                setMember(item)
              }}
              onPressRightBtn={() =>
                navigation.navigate('UserProfile', { userId: item.id })
              }
            />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          style={[mx10, mt10]}
          onEndReachedThreshold={0.2} // Formule (20 - (1.6666 * 6)) - Se declenche au 10 eme post
          onEndReached={fetchMorePosts}
          ListFooterComponent={renderFooter}
        />
      </View>

      {/* Alert avant de supprimer un membre */}
      <CustomAlert
        showAlert={showAlert}
        title="Attention !"
        message={`Supprimer ${
          member.firstname
            ? `${member.firstname} ${member.lastname}`
            : member.email
        } du club ${club.name} ?`}
        onDismiss={() => {
          setShowAlert(false)
        }}
        onCancelPressed={() => {
          setShowAlert(false)
        }}
        onConfirmPressed={expelMember}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  containerNoFeed: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  footer: {
    marginBottom: 160,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    flex: 3,
    justifyContent: 'center',
  },
})

export default ClubMembersScene
