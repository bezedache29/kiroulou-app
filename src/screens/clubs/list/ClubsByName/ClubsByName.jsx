/**
 * Vue pour afficher les clubs recherchés par nom
 */
import { FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import FadingEdge from 'react-native-fading-edge'

import { useTheme } from 'react-native-paper'
import CustomSearchInput from '../../../../components/CustomSearchInput'
import ClubsCard from '../../../../components/Clubs/ClubsCard'
import useFaker from '../../../../hooks/useFaker'

const ClubsByName = () => {
  const [search, setSearch] = useState('')
  const [clubs, setClubs] = useState([])

  const { colors } = useTheme()

  // Pour les tests
  const { createFakeClub } = useFaker()

  const onChangeText = (text) => {
    setSearch(text)
  }

  useEffect(() => {
    for (let i = 0; i < 10; i++) {
      setClubs((oldData) => [...oldData, createFakeClub(i + 1)])
    }
  }, [])

  return (
    <FadingEdge bottom={500}>
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
    </FadingEdge>
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
