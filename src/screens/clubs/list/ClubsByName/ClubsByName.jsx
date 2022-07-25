/**
 * Vue pour afficher les clubs recherchés par nom
 */
import { FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { useTheme } from 'react-native-paper'

import { faker } from '@faker-js/faker/locale/fr'
import CustomSearchInput from '../../../../components/CustomSearchInput'
import ClubsCard from '../../../../components/Clubs/ClubsCard'

const ClubsByName = () => {
  const { colors } = useTheme()

  const [search, setSearch] = useState('')
  const [clubs, setClubs] = useState([])

  const onChangeText = (text) => {
    setSearch(text)
  }

  useEffect(() => {
    for (let i = 0; i < 10; i++) {
      setClubs((oldData) => [...oldData, createFakeClub(i + 1)])
    }
  }, [])

  // Permet de créer un club fake
  const createFakeClub = (i) => {
    const club = {
      id: faker.datatype.uuid(),
      uri: faker.image.avatar(),
      name: `${i} - ${faker.company.companyName()}`,
      city: faker.address.city(),
      members: faker.random.numeric(2),
      posts: faker.random.numeric(3),
    }
    return club
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomSearchInput
        placeholder="Rechercher par nom"
        value={search}
        onChangeValue={onChangeText}
      />

      <View style={styles.content}>
        <FlatList
          data={clubs}
          renderItem={({ item }) => <ClubsCard club={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 20,
    marginVertical: 10,
    marginBottom: 50,
  },
})

export default ClubsByName
