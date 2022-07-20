import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useCallback, useState } from 'react'

import { useTheme } from 'react-native-paper'

import TabContainer from '../components/Navigation/TabContainer'
import HeaderDrawer from '../components/Navigation/HeaderDrawer'
import CustomCard from '../components/Home/Card/CustomCard'

import { defaultText, mb30, TitleH3 } from '../assets/styles/styles'

const data = [
  {
    id: 1,
    title: 'Mon super titre',
    club: 'Mon super club',
    description:
      'Lorem ipsum dolor sit amet. Sed voluptas consequatur non voluptatibus ratione vel ullam officia 33 vero illum. Quo dolorem consequuntur sed tempora omnis et eveniet galisum sit suscipit velit qui suscipit eveniet!',
    avatar:
      'http://lh3.ggpht.com/-OdRx9XAYxkc/TusHxirp8uI/AAAAAAAABpw/lk-2NDvmJY0/Banana%252520Alien%25255B3%25255D.jpg?imgmax=800',
  },
  {
    id: 2,
    title: 'Mon super titre 2',
    trek: 'Ma super rando',
    description:
      'Lorem ipsum dolor sit amet. Sed quis obcaecati 33 atque facere vel reiciendis Quis et porro quaerat in expedita nisi vel quaerat sapiente. Et quae voluptatem qui nisi exercitationem sed omnis fugiat et maiores eaque sed rerum quibusdam ea quas incidunt cum libero rerum. A quia dicta est quas neque qui velit reiciendis qui consequatur maiores ut illo porro.',
    avatar:
      'https://chamonixsport.com/data/images/551c03ca2ba3d/logo-vtt%20-%20copie.jpg',
  },
  {
    id: 3,
    title: 'Mon super titre 3',
    trek: 'Ma super rando 2',
    description:
      'Lorem ipsum dolor sit amet. Et dicta maxime 33 error fugiat et autem nihil id saepe molestiae. Ut animi quam ad omnis numquam id beatae Quis eum labore iure. Id voluptatibus ducimus est architecto quod eos amet dolores qui harum distinctio sed maiores ratione?',
    avatar:
      'https://image.shutterstock.com/image-vector/logo-mountain-bike-free-ride-600w-743925412.jpg',
  },
]

const HomeScreen = ({ navigation }) => {
  const { colors } = useTheme()

  const [isFetching, setIsFetching] = useState(false)

  const onRefresh = useCallback(() => {
    setIsFetching(true)
    // const item = {
    //   id: 4,
    //   title: 'Mon super titre 4',
    //   club: 'Mon super club',
    //   description:
    //     'Lorem ipsum dolor sit amet. In quae deserunt est nemo magni eos modi quas. Eum illum quos quo fugit sunt aut neque consequuntur sit consequatur incidunt!',
    //   avatar:
    //     'https://caricom.org/wp-content/uploads/Floyd-Morris-Remake-1024x879-1.jpg',
    // }
    // data.splice(0, 0, item)
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
    flex: 10,
  },
  footer: {
    flex: 2,
  },
})

export default HomeScreen
