import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'

import { useTheme } from 'react-native-paper'

import AsyncStorage from '@react-native-async-storage/async-storage'

import FadingEdge from 'react-native-fading-edge'

import TabContainer from '../components/Navigation/TabContainer'
import HeaderDrawer from '../components/Navigation/HeaderDrawer'
import CustomCard from '../components/Home/Card/CustomCard'

import {
  defaultText,
  mb30,
  px20,
  secondaryColor,
} from '../assets/styles/styles'
import useFaker from '../hooks/useFaker'
import CustomBigButton from '../components/CustomBigButton'

const HomeScreen = ({ navigation }) => {
  const { colors } = useTheme()

  const [isFetching, setIsFetching] = useState(false)
  const [data, setData] = useState([])

  // Pour les tests
  const { createFakePost } = useFaker()

  /**
   * Charge 10 posts fake
   */
  useEffect(() => {
    AsyncStorage.getItem('kro_auth_token').then((res) => {
      console.log(res)
    })
    // for (let i = 0; i < 10; i++) {
    //   setData((oldData) => [...oldData, createFakePost(i + 1)])
    // }
  }, [])

  const onRefresh = useCallback(() => {
    setIsFetching(true)
    setData((oldData) => [...oldData, createFakePost(data.length + 1)])
    setTimeout(() => {
      setIsFetching(false)
    }, 2000)
  })

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
            <FlatList
              data={data}
              ListEmptyComponent={() => (
                <View style={styles.containerNoFeed}>
                  <Text style={[defaultText, mb30, { color: colors.text }]}>
                    Vous n'avez pas de fil d'acutalités. Suivez des clubs et des
                    utilisateurs pour être aux courtant de leur dernières
                    nouvelles !
                  </Text>
                  <CustomBigButton
                    label="Rechercher des clubs"
                    onPress={() => navigation.navigate('Clubs')}
                    styleBtn={px20}
                  />
                </View>
              )}
              renderItem={({ item }) => (
                <CustomCard
                  item={item}
                  onPress={() => navigation.navigate('Post', { post: item })}
                />
              )}
              keyExtractor={(item) => item.id}
              onRefresh={onRefresh}
              refreshing={isFetching}
              ListFooterComponent={() => (
                <View style={{ marginVertical: 80 }} />
              )}
            />
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
})

export default HomeScreen
