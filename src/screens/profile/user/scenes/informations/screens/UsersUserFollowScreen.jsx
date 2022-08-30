import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import { useTheme } from 'react-native-paper'

import { useStoreState } from 'easy-peasy'

import { useIsFocused } from '@react-navigation/native'

import {
  darkColor,
  defaultText,
  mb30,
  TitleH3,
} from '../../../../../../assets/styles/styles'

import CustomLabelNavigation from '../../../../../../components/CustomLabelNavigation'
import UsersFollowCard from '../../../../../../components/Profile/User/UsersFollowCard'
import CustomSearchInput from '../../../../../../components/CustomSearchInput'
import useAxios from '../../../../../../hooks/useAxios'
import useCustomToast from '../../../../../../hooks/useCustomToast'

const UsersUserFollowScreen = ({ navigation, route }) => {
  const { colors } = useTheme()
  const { axiosGetWithToken, axiosPostWithToken } = useAxios()
  const { toastShow } = useCustomToast()

  const { userId } = route.params

  const userStore = useStoreState((state) => state.user)
  const { user } = userStore

  const isFocused = useIsFocused()

  const flatListUsers = useRef()

  const [search, setSearch] = useState('')
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isListEnd, setIsListEnd] = useState(true)
  const [moreLoading, setMoreLoading] = useState(true)

  useEffect(() => {
    setPage(1)
  }, [])

  useEffect(() => {
    if (page !== null) {
      if (page === 1) {
        loadUsers(page, true)
      } else {
        loadUsers(page)
      }
    }
  }, [page])

  useEffect(() => {
    if (isFocused) {
      setLoading(true)
      if (page !== 1) {
        setPage(1)
      } else {
        loadUsers(1, true)
      }
    }
  }, [isFocused])

  useEffect(() => {
    if (!loading) {
      moveToTop()
    }
  }, [loading])

  const moveToTop = () => {
    if (users && users.length - 1 > 0) {
      flatListUsers.current.scrollToIndex({ index: 0 })
    }
  }

  const loadUsers = async (page, refresh = false) => {
    const response = await axiosGetWithToken(
      `users/${userId}/followedUsers?page=${page}`
    )

    console.log('users', response.data)

    if (response.status === 403) {
      toastShow({
        title: 'Accès refusé !',
        message: response.data.message,
        type: 'toast_danger',
      })
    }

    if (response.status === 200) {
      if (refresh) {
        setUsers(response.data)
        setIsListEnd(false)
      } else if (response.data.length === 0) {
        setIsListEnd(true)
      } else {
        setUsers((oldData) => [...oldData, ...response.data])
      }
    }

    setMoreLoading(false)
    setLoading(false)
  }

  const onChangeText = (text) => {
    setSearch(text)
  }

  const unfollow = async (user) => {
    const response = await axiosPostWithToken(
      `users/${user.id}/followOrUnfollow`
    )

    if (response.status === 202) {
      toastShow({
        title: 'Utilisateur Unfollow',
        message: `Vous ne suivez plus ${
          user.firstname ? `${user.firstname} ${user.lastname}` : user.email
        }`,
      })

      if (page === 1) {
        loadUsers(1, true)
      } else {
        setPage(1)
      }
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
      {isListEnd && users.length > 0 && (
        <Text style={[defaultText, { color: darkColor }]}>
          Tous les utilisateurs sont listés
        </Text>
      )}
    </View>
  )

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomLabelNavigation
        label="Les personnes que je suis"
        colors={colors}
        onPress={() => {
          navigation.goBack()
        }}
      />

      {users.length > 0 && (
        <CustomSearchInput
          placeholder="Rechercher par prénom ou nom"
          value={search}
          onChangeValue={onChangeText}
        />
      )}

      <View style={styles.content}>
        <FlatList
          ref={flatListUsers}
          data={users}
          ListEmptyComponent={() => (
            <View style={styles.containerNoFeed}>
              <Text style={[TitleH3, mb30, { color: colors.text }]}>
                Aucun club suivis !
              </Text>
              {user.id === userId && (
                <Text style={[defaultText, mb30, { color: colors.text }]}>
                  Suivez des personnes pour suivre leur actualités.
                </Text>
              )}
            </View>
          )}
          renderItem={({ item }) => (
            <UsersFollowCard user={item} unfollow={unfollow} />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.2} // Formule (20 - (1.6666 * 6)) - Se declenche au 10 eme post
          onEndReached={fetchMorePosts}
          ListFooterComponent={renderFooter}
        />
      </View>
    </View>
  )
}

export default UsersUserFollowScreen

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 20,
    marginVertical: 10,
    marginBottom: 10,
    flex: 1,
  },
  containerNoFeed: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
})
