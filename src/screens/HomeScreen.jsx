import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'

import { useTheme } from 'react-native-paper'

import { faker } from '@faker-js/faker/locale/fr'
import TabContainer from '../components/Navigation/TabContainer'
import HeaderDrawer from '../components/Navigation/HeaderDrawer'
import CustomCard from '../components/Home/Card/CustomCard'

import { defaultText, mb30, TitleH3 } from '../assets/styles/styles'

const HomeScreen = ({ navigation }) => {
  const { colors } = useTheme()

  const [isFetching, setIsFetching] = useState(false)
  const [data, setData] = useState([])

  const getRandom = (min, max) => Math.random() * (max - min) + min

  // Permet de créer un post fake
  const createFakePost = (i) => {
    const isTrek = getRandom(1, 2) === 1
    const post = {
      id: faker.datatype.uuid(),
      username: faker.internet.userName(),
      trek: isTrek ? faker.company.companyName() : '',
      club: faker.company.companyName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      registeredAt: faker.date.past(),
      description: faker.lorem.paragraph(),
      title: `${i} - ${faker.commerce.product()}`,
    }
    return post
  }

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
      <View style={{ flex: 1 }}>
        {/* Header avec avatar */}
        <View style={styles.header}>
          <HeaderDrawer
            title="KiRoulOu"
            onPress={() => navigation.openDrawer()}
          />
        </View>

        {/* Les Posts */}
        <View style={styles.content}>
          {data && data.length > 0 ? (
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <CustomCard item={item} onPress={() => console.log(item.id)} />
              )}
              keyExtractor={(item) => item.id}
              onRefresh={onRefresh}
              refreshing={isFetching}
            />
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 20,
              }}
            >
              <Text style={[defaultText, mb30, { color: colors.text }]}>
                Vous n'avez pas de fil d'acutalités. Suivez des clubs et des
                utilisateurs pour être aux courtant de leur dernières nouvelles
                !
              </Text>
              <TouchableOpacity
                onPress={() => {}}
                style={{
                  backgroundColor: colors.background,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 8,
                }}
              >
                <Text style={[TitleH3, { color: colors.text, padding: 10 }]}>
                  Rechercher des clubs
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Bloc vide sous la BottomTabBar */}
        <View
          style={[
            styles.footer,
            {
              backgroundColor: colors.background,
            },
          ]}
        />
      </View>
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
})

export default HomeScreen
