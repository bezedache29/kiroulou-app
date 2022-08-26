import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useEffect, useState } from 'react'

import { useTheme } from 'react-native-paper'

import { Formik } from 'formik'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import MultipleImagePicker from '@baronha/react-native-multiple-image-picker'

import {
  cancelColor,
  dangerColor,
  darkPrimaryColor,
  defaultText,
  littleTitle,
  mr5,
  mt20,
  mt30,
  p20,
  rowCenter,
} from '../../assets/styles/styles'

import CustomContainer from '../../components/CustomContainer'
import addPostSchema from '../../validationSchemas/addPostSchema'
import InputField from '../../components/InputField'
import CustomBigButton from '../../components/CustomBigButton'
import CustomIconButton from '../../components/CustomIconButton'
import useImages from '../../hooks/useImages'
import useAxios from '../../hooks/useAxios'
import CustomAlert from '../../components/CustomAlert'
import useCustomToast from '../../hooks/useCustomToast'

const { width, height } = Dimensions.get('window')

const AddOrEditPostScreen = ({ navigation, route }) => {
  const { colors } = useTheme()
  const { toastShow } = useCustomToast()
  const { sendImageToServer, compressImage, checkExtension } = useImages()
  const { axiosPostWithToken } = useAxios()

  const [images, setImages] = useState([])
  const [editPost, setEditPost] = useState(false)
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(false)
  const [showDeleteImage, setShowDeleteImage] = useState(false)

  useEffect(() => {
    if (route.params?.editPost) {
      setLoading(true)
      setEditPost(route.params.editPost)

      // TODO Revoir l'edit avec une seule image
      if (route.params.editPost.images) {
        setImages(route.params.editPost.images)
      }
    }
  }, [route.params?.editPost])

  useEffect(() => {
    if (editPost) {
      setLoading(false)
    }
  }, [editPost])

  if (loading) {
    return null
  }

  const openPicker = async () => {
    try {
      const response = await MultipleImagePicker.openPicker({
        mediaType: 'image',
        singleSelectedMode: true,
        doneTitle: 'Valider',
        cancelTitle: 'Annuler',
        selectedColor: darkPrimaryColor,
      })
      console.log('response: ', response)

      // On check que ce sont bien des images qui sont upload (jpeg / jpg / png only)
      if (checkExtension(response.mime)) {
        const compress = await compressImage(`file://${response.realPath}`)
        console.log('compress', compress)
        setImage(compress)
      }
    } catch (e) {
      console.log(e.code, e.message)
    }
  }

  const createPost = async (data) => {
    const response = await axiosPostWithToken('users/posts', data)

    console.log('post created', response.data)

    if (response.status !== 201) {
      // TODO Toast Error

      return
    }

    if (image) {
      // On met l'extension du fichier
      const title = `${image.split('.').pop()}`
      // On envoie l'image pour stockage
      const isSend = await sendImageToServer(
        `users/posts/${response.data.post_user_id}/storeImage`,
        {
          name: 'image',
          uri: image,
          title,
        }
      )

      console.log('resp image', isSend.respInfo.status)

      if (isSend.respInfo.status !== 201) {
        // TODO Toast Erreur
        toastShow({
          title: 'Oops !',
          message: "Une erreur avec votre image s'est opéré",
          type: 'toast_danger',
        })
        return
      }
    }

    toastShow({
      title: 'Article créé avec succès !',
      message: 'Votre article a été créé et publié avec succès',
    })

    navigation.navigate('Post', {
      postId: response.data.post_user_id,
      type: 'user',
    })
  }

  const deleteImage = () => {
    setImage(false)
    setShowDeleteImage(false)
  }

  // users/posts/{post}/storeImage

  return (
    <CustomContainer
      label="Créer un article"
      pressBack={() => navigation.goBack()}
    >
      <ScrollView>
        <View style={p20}>
          <Text style={[defaultText, { color: colors.text }]}>
            {editPost ? 'Modifier' : 'Créer'} un article pour proposer ou
            partager des moments, des faits ou tout autre chose auprès de la
            communautés.
          </Text>

          <ScrollView>
            <Formik
              validationSchema={addPostSchema}
              initialValues={{
                title: editPost ? editPost.title : '',
                message: editPost ? editPost.message : '',
              }}
              onSubmit={(values, { resetForm }) => {
                const data = {
                  title: values.title,
                  description: values.message,
                }

                console.log('DATA', data)
                // resetForm()

                // Envoie des datas a l'API
                createPost(data)
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View>
                  {/* TITLE */}
                  <InputField
                    label="Titre de l'article"
                    icon={
                      <MaterialCommunityIcons
                        name="format-title"
                        size={20}
                        color={
                          touched.title && errors.title
                            ? dangerColor
                            : colors.icon
                        }
                        style={mr5}
                      />
                    }
                    colors={colors}
                    error={touched.title && errors.title}
                    name="title"
                    onChange={handleChange('title')}
                    onBlur={handleBlur('title')}
                    value={values.title}
                  />

                  {/* MESSAGE */}
                  <InputField
                    label="Message de l'article"
                    maxLength={250}
                    multiline
                    numberOfLines={4}
                    icon={
                      <MaterialCommunityIcons
                        name="message-processing-outline"
                        size={20}
                        color={
                          touched.message && errors.message
                            ? dangerColor
                            : colors.icon
                        }
                        style={mr5}
                      />
                    }
                    colors={colors}
                    error={touched.message && errors.message}
                    name="message"
                    onChange={handleChange('message')}
                    onBlur={handleBlur('message')}
                    value={values.message}
                  />

                  {/* IMAGES */}
                  <View style={mt20}>
                    <View style={[rowCenter]}>
                      <Text style={[littleTitle, { color: colors.text }]}>
                        Ajouter une image / photo
                      </Text>

                      {image && (
                        <TouchableOpacity
                          style={styles.iconTrash}
                          onPress={() => setShowDeleteImage(true)}
                        >
                          <MaterialCommunityIcons
                            name="trash-can"
                            size={30}
                            color={cancelColor}
                          />
                        </TouchableOpacity>
                      )}
                    </View>

                    {!image ? (
                      <CustomIconButton
                        text="Ajouter une image / photo"
                        isText
                        onPress={openPicker}
                        size="100%"
                      />
                    ) : (
                      <TouchableOpacity
                        onPress={() => openPicker()}
                        style={styles.imageBtn}
                      >
                        <Image
                          source={{ uri: image }}
                          style={[
                            {
                              borderRadius: 8,
                            },
                            styles.image,
                          ]}
                        />
                      </TouchableOpacity>
                    )}
                  </View>

                  <CustomBigButton
                    label={editPost ? "Modifier l'article" : "Créer l'article"}
                    onPress={handleSubmit}
                    style={mt30}
                  />
                </View>
              )}
            </Formik>
          </ScrollView>
        </View>
      </ScrollView>
      <CustomAlert
        showAlert={showDeleteImage}
        title="Attention !"
        message="Etes vous sur de vouloir supprimer l'image' ?"
        onDismiss={() => setShowDeleteImage(false)}
        onCancelPressed={() => setShowDeleteImage(false)}
        onConfirmPressed={() => deleteImage()}
      />
    </CustomContainer>
  )
}

export default AddOrEditPostScreen

const styles = StyleSheet.create({
  iconTrash: {
    marginLeft: 'auto',
    marginRight: 10,
  },
  checkbox: {
    width: '45%',
  },
  imageBtn: {
    flex: 1,
    width,
    height: height / 2.2,
    alignSelf: 'center',
    marginTop: 20,
  },
  image: {
    height: '100%',
    width: '100%',
  },
})
