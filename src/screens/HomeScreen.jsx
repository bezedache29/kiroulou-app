import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'

import { useTheme } from 'react-native-paper'

import FadingEdge from 'react-native-fading-edge'

import TabContainer from '../components/Navigation/TabContainer'
import HeaderDrawer from '../components/Navigation/HeaderDrawer'
import CustomCard from '../components/Home/Card/CustomCard'

import {
  defaultText,
  mb30,
  secondaryColor,
  TitleH3,
} from '../assets/styles/styles'
import useFaker from '../hooks/useFaker'

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
    for (let i = 0; i < 10; i++) {
      setData((oldData) => [...oldData, createFakePost(i + 1)])
    }
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
          <View style={{ paddingTop: 10, backgroundColor: secondaryColor }}>
            {data && data.length > 0 ? (
              <FlatList
                data={data}
                renderItem={({ item }) => (
                  <CustomCard
                    item={item}
                    onPress={() => console.log(item.id)}
                  />
                )}
                keyExtractor={(item) => item.id}
                onRefresh={onRefresh}
                refreshing={isFetching}
                ListFooterComponent={() => (
                  <View style={{ marginVertical: 80 }} />
                )}
              />
            ) : (
              <View style={styles.containerNoFeed}>
                <Text style={[defaultText, mb30, { color: colors.text }]}>
                  Vous n'avez pas de fil d'acutalités. Suivez des clubs et des
                  utilisateurs pour être aux courtant de leur dernières
                  nouvelles !
                </Text>
                <TouchableOpacity
                  onPress={() => {}}
                  style={[
                    styles.btn,
                    {
                      backgroundColor: colors.background,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Text style={[TitleH3, { color: colors.text, padding: 10 }]}>
                    Rechercher des clubs
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </FadingEdge>
    </TabContainer>
  )
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
  },
  content: {
    flex: 9,
  },
  footer: {
    flex: 2,
  },
  containerNoFeed: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  btn: {
    borderWidth: 1,
    borderRadius: 8,
  },
})

export default HomeScreen
