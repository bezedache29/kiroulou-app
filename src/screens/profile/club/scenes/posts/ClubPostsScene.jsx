import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import LayoutPosts from '../../../../../components/Profile/LayoutPosts'

import useFaker from '../../../../../hooks/useFaker'

const ClubPostsScene = () => {
  const [data, setData] = useState([])

  // Pour les tests
  const { createFakePost } = useFaker()
  useEffect(() => {
    for (let i = 0; i < 10; i++) {
      setData((oldData) => [...oldData, createFakePost(i + 1)])
    }
  }, [])

  if (data.length) {
    return <LayoutPosts data={data} club />
  }

  return <View />
}

export default ClubPostsScene
