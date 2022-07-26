import { FlatList, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { my10 } from '../../../assets/styles/styles'

import useFaker from '../../../hooks/useFaker'
import CustomPost from '../../../components/Profile/CustomPost'

const UserPosts = () => {
  const [data, setData] = useState([])

  // Pour les tests
  const { createFakePost } = useFaker()
  useEffect(() => {
    for (let i = 0; i < 10; i++) {
      setData((oldData) => [...oldData, createFakePost(i + 1)])
    }
  }, [])

  return (
    <View style={[my10, { flex: 1 }]}>
      <FlatList
        data={data}
        renderItem={({ item }) => <CustomPost item={item} edit={() => {}} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default UserPosts
