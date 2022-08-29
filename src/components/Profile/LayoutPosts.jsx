import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { useStoreState } from 'easy-peasy'

import { useTheme } from 'react-native-paper'
import {
  darkColor,
  defaultText,
  mb30,
  my10,
  px20,
} from '../../assets/styles/styles'

import useAxios from '../../hooks/useAxios'
import CustomBigButton from '../CustomBigButton'
import CustomCardClub from '../Home/Card/CustomCardClub'
import CustomCardUser from '../Home/Card/CustomCardUser'

const { height } = Dimensions.get('window')

const LayoutPosts = ({ data, profile = 'users' }) => {
  const { colors } = useTheme()
  const { axiosGetWithToken } = useAxios()

  const userStore = useStoreState((state) => state.user)
  const { user } = userStore

  const flatListPosts = useRef()

  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(null)
  const [isListEnd, setIsListEnd] = useState(false)
  const [moreLoading, setMoreLoading] = useState(false)
  const [loading, setLoading] = useState(true)

  const navigation = useNavigation()

  //* Suivant le profile on charge les bon posts
  //* Dans la flatlist le render est different suivant le profile

  useEffect(() => {
    setPage(1)
  }, [])

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
    if (posts && posts.length - 1 > 0) {
      flatListPosts.current.scrollToIndex({ index: 0 })
    }
  }

  const loadPosts = async (page, refresh = false) => {
    // Profile = clubs || users
    const response = await axiosGetWithToken(
      `${profile}/${data.id}/posts?page=${page}`
    )

    if (response.status === 200) {
      if (refresh) {
        setPosts(response.data)
        setIsListEnd(false)
      } else if (response.data.length === 0) {
        setIsListEnd(true)
      } else {
        setPosts((oldData) => [...oldData, ...response.data])
      }
    }

    setMoreLoading(false)
    setLoading(false)
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
          Plus d'articles pour le moment
        </Text>
      )}
    </View>
  )

  const renderEmpty = () => {
    if (loading) {
      return (
        <View style={styles.containerLoader}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    if (profile === 'clubs') {
      if (user.is_club_admin === 1 && user.club_id === data.id) {
        return (
          <View style={styles.containerNoFeed}>
            <Text style={[defaultText, mb30, { color: colors.text }]}>
              Aucun articles disponibles. Créez une randonnée pour créer un
              article et le proposer à la communauté
            </Text>
            <CustomBigButton
              label="Créer une rando VTT"
              onPress={() => navigation.navigate('AddHikeStep1')}
              styleBtn={px20}
            />
          </View>
        )
      }
      return (
        <View style={styles.containerNoFeed}>
          <Text style={[defaultText, mb30, { color: colors.text }]}>
            Le club n'a pas encore proposé de randonnées, et par conséquents
            aucun articles n'est disponible. Revenez plus tard
          </Text>
        </View>
      )
    }
    if (profile === 'users') {
      if (user.id === data.id) {
        return (
          <View style={styles.containerNoFeed}>
            <Text style={[defaultText, mb30, { color: colors.text }]}>
              Aucun articles disponibles. Cliquez sur le bouton ci dessous pour
              créer un article afin de le partager a la communauté
            </Text>
            <CustomBigButton
              label="Créer un article"
              onPress={() => navigation.navigate('AddOrEditPostScreen')}
              styleBtn={px20}
            />
          </View>
        )
      }
      return (
        <View style={styles.containerNoFeed}>
          <Text style={[defaultText, mb30, { color: colors.text }]}>
            Cet utilisateur n'a pas créé d'articles pour le moment.
          </Text>
        </View>
      )
    }
    return null
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View style={[my10, { flex: 1 }]}>
          <FlatList
            ref={flatListPosts}
            data={posts}
            ListEmptyComponent={() => renderEmpty()}
            renderItem={({ item }) => {
              if (profile === 'clubs') {
                return (
                  <CustomCardClub
                    item={item}
                    onPress={() => navigation.navigate('Hike', { hike: item })}
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
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.2} // Formule (20 - (1.6666 * 6)) - Se declenche au 10 eme post
            onEndReached={fetchMorePosts}
            ListFooterComponent={renderFooter}
          />
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
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
  containerLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: height / 5,
  },
})

export default LayoutPosts
