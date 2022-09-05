import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import FadingEdge from 'react-native-fading-edge'

import { useIsFocused } from '@react-navigation/native'
import {
  darkColor,
  defaultText,
  mb30,
  px20,
  secondaryColor,
} from '../assets/styles/styles'

import useAxios from '../hooks/useAxios'
import TabContainer from '../components/Navigation/TabContainer'
import HeaderDrawer from '../components/Navigation/HeaderDrawer'
import CustomBigButton from '../components/CustomBigButton'
import CustomCardUser from '../components/Home/Card/CustomCardUser'
import CustomCardClub from '../components/Home/Card/CustomCardClub'

const HomeScreen = ({ navigation, route }) => {
  const { axiosGetWithToken } = useAxios()

  const isFocused = useIsFocused()

  const flatListPosts = useRef()

  const [isFetching, setIsFetching] = useState(false)
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [moreLoading, setMoreLoading] = useState(false)
  const [isListEnd, setIsListEnd] = useState(null)

  useEffect(() => {
    setPage(1)
  }, [])

  useEffect(() => {
    if (isFocused) {
      console.log('route name', route)
      if (page !== null) {
        setLoading(true)
        if (page !== 1) {
          setPage(1)
        } else {
          loadPosts(1, true)
        }
      }
    }
  }, [isFocused])

  useEffect(() => {
    if (page !== null) {
      if (page === 1) {
        loadPosts(page, true)
      } else {
        loadPosts(page)
      }
    }
  }, [page])

  useEffect(() => {
    if (!loading) {
      moveToTop()
    }
  }, [loading])

  const moveToTop = () => {
    if (posts.length - 1 > 0) {
      flatListPosts.current.scrollToIndex({ index: 0 })
    }
  }

  const loadPosts = async (page, refresh = false) => {
    const response = await axiosGetWithToken(`posts?page=${page}`)

    console.log('posts', response.data.posts)
    console.log('length', response.data.posts.length)

    if (refresh) {
      setPosts(response.data.posts)
      setIsListEnd(false)
    } else if (response.data.posts.length === 0) {
      setIsListEnd(true)
    } else {
      setPosts((oldData) => [...oldData, ...response.data.posts])
    }

    setMoreLoading(false)
    setLoading(false)
  }

  // Au refresh en haut de screen
  const onRefresh = useCallback(() => {
    setIsFetching(true)
    setPage(1)
    setTimeout(() => {
      setIsFetching(false)
    }, 2000)
  })

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
          Plus d'articles pour le moment
        </Text>
      )}
    </View>
  )

  return (
    <TabContainer>
      <FadingEdge bottom={500}>
        <View style={{ flex: 1 }}>
          {/* Header avec avatar */}
          <View>
            <HeaderDrawer
              title="KiRoulOu"
              onPress={() => navigation.openDrawer()}
            />
          </View>

          {/* Les Posts */}
          <View
            style={{ paddingTop: 10, backgroundColor: secondaryColor, flex: 1 }}
          >
            {loading ? (
              <>
                <View style={styles.loader}>
                  <ActivityIndicator size="large" />
                </View>
                <View style={{ flex: 1 }} />
              </>
            ) : (
              <FlatList
                ref={flatListPosts}
                data={posts}
                ListEmptyComponent={() => (
                  <View style={styles.containerNoFeed}>
                    <Text style={[defaultText, mb30, { color: darkColor }]}>
                      Vous n'avez pas de fil d'acutalités. Suivez des clubs et
                      des utilisateurs pour être aux courtant de leur dernières
                      nouvelles !
                    </Text>
                    <CustomBigButton
                      label="Rechercher des clubs"
                      onPress={() => navigation.navigate('Clubs')}
                      styleBtn={px20}
                    />
                  </View>
                )}
                renderItem={({ item }) => {
                  if (item.club_id) {
                    return (
                      <CustomCardClub
                        item={item}
                        disabled={item.cancelled === 1}
                        onPress={() =>
                          navigation.navigate('Hike', {
                            hikeId: item.hike_vtt.id,
                          })
                        }
                      />
                    )
                  }
                  return (
                    <CustomCardUser
                      item={item}
                      onPress={() =>
                        navigation.navigate('Post', {
                          postId: item.id,
                          type: 'user',
                        })
                      }
                    />
                  )
                }}
                keyExtractor={(item) => item.id}
                onRefresh={onRefresh}
                refreshing={isFetching}
                onEndReachedThreshold={0.5} // Formule (20 - (1.6666 * 6)) - Se declenche au 10 eme post
                onEndReached={fetchMorePosts}
                ListFooterComponent={renderFooter}
              />
            )}
          </View>
        </View>
      </FadingEdge>
    </TabContainer>
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

export default HomeScreen
