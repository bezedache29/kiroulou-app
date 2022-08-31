/**
 * Vue pour afficher les clubs recherchés par nom
 */
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import { useTheme } from 'react-native-paper'

import FadingEdge from 'react-native-fading-edge'

import { useIsFocused, useNavigation } from '@react-navigation/native'

import {
  darkColor,
  defaultText,
  mb30,
  px20,
  TitleH4,
} from '../../../../assets/styles/styles'

import CustomBigButton from '../../../../components/CustomBigButton'
import CustomSearchInput from '../../../../components/CustomSearchInput'
import ClubsCard from '../../../../components/Clubs/ClubsCard'
import useAxios from '../../../../hooks/useAxios'

const ClubsByCity = () => {
  const { colors } = useTheme()

  const { axiosGetWithToken } = useAxios()

  const isFocused = useIsFocused()

  const navigation = useNavigation()

  const flatListClubs = useRef()

  const [clubs, setClubs] = useState([])
  const [moreLoading, setMoreLoading] = useState(false)
  const [isListEnd, setIsListEnd] = useState(null)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(null)
  const [loading, setLoading] = useState(true)

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
    if (!loading) {
      moveToTop()
    }
  }, [loading])

  useEffect(() => {
    if (page && page !== null) {
      if (page === 1) {
        loadClubs(page, true)
      } else {
        loadClubs(page)
      }
    }
  }, [page])

  const moveToTop = () => {
    if (clubs.length - 1 > 0) {
      flatListClubs.current.scrollToIndex({ index: 0 })
    }
  }

  const loadClubs = async (page, refresh = false) => {
    const response = await axiosGetWithToken(`clubs?page=${page}`)

    // console.log('posts', response.data.posts)

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

  // Au refresh en bas de screen
  const fetchMorePosts = async () => {
    if (!isListEnd) {
      setMoreLoading(true)
      setPage(page + 1)
    }
  }

  const refresh = () => {
    setPage(1)
  }

  // S'il n'y a plus de pages a chercher lors d'un refresh en bas de screen
  const renderFooter = () => (
    <View style={styles.footer}>
      {moreLoading && <ActivityIndicator />}
      {isListEnd && (
        <Text style={[defaultText, { color: darkColor }]}>
          Pas d'autres clubs pour le moment
        </Text>
      )}
    </View>
  )

  return (
    <FadingEdge bottom={500}>
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        {clubs.length > 0 && (
          <CustomSearchInput
            placeholder="Rechercher par ville"
            value={search}
            onChangeValue={onChangeText}
          />
        )}

        <View style={styles.content}>
          {
            // TODO Loading
          }
          <FlatList
            ref={flatListClubs}
            data={clubs}
            ListEmptyComponent={() => (
              <View style={styles.containerNoFeed}>
                <Text style={[TitleH4, mb30, { color: colors.text }]}>
                  Aucun clubs de créé pour le moment !
                </Text>
                <Text style={[defaultText, mb30, { color: colors.text }]}>
                  N'hésitez pas a créer le votre en cliquant sur le lien
                  ci-dessous
                </Text>
                <CustomBigButton
                  label="Créer un club"
                  onPress={() => navigation.navigate('AddClub')}
                  styleBtn={px20}
                />
              </View>
            )}
            renderItem={({ item }) => (
              <ClubsCard club={item} refresh={refresh} />
            )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.5} // Formule (20 - (1.6666 * 6)) - Se declenche au 10 eme post
            onEndReached={fetchMorePosts}
            ListFooterComponent={renderFooter}
          />
        </View>
      </View>
    </FadingEdge>
  )
}

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 20,
    marginVertical: 10,
    marginBottom: 50,
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
  containerNoFeed: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
})

export default ClubsByCity
