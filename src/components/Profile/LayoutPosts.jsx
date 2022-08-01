import { FlatList, View } from 'react-native'
import React, { useRef, useState } from 'react'

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { my10 } from '../../assets/styles/styles'

import CustomPost from './CustomPost'
import CustomAlert from '../CustomAlert'
import ButtonBS from '../ButtonBS'
import CustomBSModal from '../CustomBSModal'

const LayoutPosts = ({ data, club = false }) => {
  const [overlay, setOverlay] = useState(false)
  const [post, setPost] = useState(false)
  const [showDeletePost, setShowDeletePost] = useState(false)

  // Ref pour la bottomSheet
  const bottomSheetRef = useRef(null)

  // Permet d'ouvrir et fermer la bottomSheet pour afficher les options de l'article
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
                hypes={club && item.hypes}
                edit={() => toggleBottomSheet(item)}
              />
            )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* BottomSheet pour options de l'article */}
        <CustomBSModal
          title="Que souhaitez vous faire ?"
          SP={['25%', '50%']}
          ref={bottomSheetRef}
          onDismiss={toggleBottomSheet}
        >
          <ButtonBS onPress={() => setShowDeletePost(true)} cancel>
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

        <CustomAlert
          showAlert={showDeletePost}
          title="Attention !"
          message={`Etes vous sur de vouloir supprimer l'article : ${post?.title} ?`}
          onDismiss={() => setShowDeletePost(false)}
          onCancelPressed={() => setShowDeletePost(false)}
          onConfirmPressed={() => setShowDeletePost(false)}
        />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

export default LayoutPosts
