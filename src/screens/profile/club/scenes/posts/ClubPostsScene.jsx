import { FlatList, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { my10 } from '../../../../../assets/styles/styles'

import useFaker from '../../../../../hooks/useFaker'
import CustomPost from '../../../../../components/Profile/CustomPost'
import CustomBSModal from '../../../../../components/CustomBSModal'
import ButtonBS from '../../../../../components/ButtonBS'

const ClubPostsScene = () => {
  const [data, setData] = useState([])
  const [overlay, setOverlay] = useState(false)
  const [post, setPost] = useState(false)

  // Pour les tests
  const { createFakePost } = useFaker()
  useEffect(() => {
    for (let i = 0; i < 10; i++) {
      setData((oldData) => [...oldData, createFakePost(i + 1)])
    }
  }, [])

  // Ref pour la bottomSheet Type
  const bottomSheetRef = useRef(null)

  // Permet d'ouvrir et fermer la bottomSheet pour choisir le type de vélo
  const toggleBottomSheet = (item) => {
    if (overlay) {
      setOverlay(false)
      setPost(false)
      bottomSheetRef?.current?.closeBottomSheet()
    } else {
      setOverlay(true)
      setPost(item)
      bottomSheetRef?.current?.openBottomSheet()
    }
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View style={[my10, { flex: 1 }]}>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <CustomPost
                item={item}
                likes={item.likes}
                comments={item.comments}
                edit={() => {
                  toggleBottomSheet(item)
                }}
                hypes={item.hypes}
              />
            )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* BottomSheet pour les types de vélo */}
        <CustomBSModal
          title="Que souhaitez vous faire ?"
          SP={['25%', '50%']}
          ref={bottomSheetRef}
          onDismiss={toggleBottomSheet}
        >
          <ButtonBS onPress={() => {}} cancel>
            Supprimer l'article
          </ButtonBS>
          <ButtonBS
            onPress={() => {
              alert(post.title)
            }}
          >
            Modifier l'article
          </ButtonBS>
        </CustomBSModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

export default ClubPostsScene
