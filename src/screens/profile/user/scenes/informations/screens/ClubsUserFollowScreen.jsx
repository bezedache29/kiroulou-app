import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import { useTheme } from 'react-native-paper'

import { useIsFocused } from '@react-navigation/native'

import CustomLabelNavigation from '../../../../../../components/CustomLabelNavigation'
import ClubsFollowCard from '../../../../../../components/Profile/User/ClubsFollowCard'
import CustomSearchInput from '../../../../../../components/CustomSearchInput'
import useAxios from '../../../../../../hooks/useAxios'
import { darkColor, defaultText } from '../../../../../../assets/styles/styles'
import useCustomToast from '../../../../../../hooks/useCustomToast'

const ClubsUserFollowScreen = ({ navigation, route }) => {
  const { colors } = useTheme()
  const { axiosGetWithToken, axiosPostWithToken } = useAxios()
  const { toastShow } = useCustomToast()

  const { userId } = route.params

  const isFocused = useIsFocused()

  const flatListClubs = useRef()

  const [search, setSearch] = useState('')
  const [clubs, setClubs] = useState([])
  const [page, setPage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [moreLoading, setMoreLoading] = useState(true)
  const [isListEnd, setIsListEnd] = useState(false)

  useEffect(() => {
    setPage(1)
  }, [])

  useEffect(() => {
    if (isFocused) {
      if (page !== null) {
        setLoading(true)
        if (page !== 1) {
          setPage(1)
        } else {
          loadClubs(1, true)
        }
      }
    }
  }, [isFocused])

  useEffect(() => {
    if (page !== null) {
      if (page === 1) {
        loadClubs(page, true)
      } else {
        loadClubs(page)
      }
    }
  }, [page])

  useEffect(() => {
    if (!loading) {
      moveToTop()
    }
  }, [loading])

  const moveToTop = () => {
    if (clubs.length - 1 > 0) {
      flatListClubs.current.scrollToIndex({ index: 0 })
    }
  }

  const loadClubs = async (page, refresh) => {
    const response = await axiosGetWithToken(
      `users/${userId}/followedClubs?page=${page}`
    )

    console.log('clubs', response.data)

    if (refresh) {
      setClubs(response.data)
      setIsListEnd(false)
    } else if (response.data.length === 0) {
      setIsListEnd(true)
    } else {
      setClubs((oldData) => [...oldData, ...response.data])
    }

    setMoreLoading(false)
    setLoading(false)
  }

  const onChangeText = (text) => {
    setSearch(text)
  }

  const unfollow = async (club) => {
    const response = await axiosPostWithToken(
      `clubs/${club.id}/followOrUnfollow`
    )

    if (response.status === 202) {
      toastShow({
        title: 'Club Unfollow',
        message: `Vous ne suivez plus ${club.name}`,
      })

      if (page === 1) {
        loadClubs(1, true)
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
      {isListEnd && (
        <Text style={[defaultText, { color: darkColor }]}>
          Tous les clubs suivis sont listés
        </Text>
      )}
    </View>
  )

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomLabelNavigation
        label="Les clubs que je suis"
        colors={colors}
        onPress={() => {
          navigation.goBack()
        }}
      />

      <CustomSearchInput
        placeholder="Rechercher par nom"
        value={search}
        onChangeValue={onChangeText}
      />

      <View style={styles.content}>
        <FlatList
          ref={flatListClubs}
          data={clubs}
          renderItem={({ item }) => (
            <ClubsFollowCard club={item} unfollow={unfollow} />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.5} // Formule (20 - (1.6666 * 6)) - Se declenche au 10 eme post
          onEndReached={fetchMorePosts}
          ListFooterComponent={renderFooter}
        />
      </View>
    </View>
  )
}

export default ClubsUserFollowScreen

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 20,
    marginVertical: 10,
    marginBottom: 10,
    flex: 1,
  },
})
