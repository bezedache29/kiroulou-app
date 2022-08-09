import {
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

import {
  dangerColor,
  darkPrimaryColor,
  defaultText,
  littleTitle,
  mr5,
  mt40,
  my20,
  p20,
  rowCenter,
} from '../../assets/styles/styles'

import CustomContainer from '../../components/CustomContainer'
import addPostSchema from '../../validationSchemas/addPostSchema'
import InputField from '../../components/InputField'
import CustomBigButton from '../../components/CustomBigButton'
import CustomRadioBox from '../../components/CustomRadioBox'
import CustomDivider from '../../components/CustomDivider'
import CustomIconButton from '../../components/CustomIconButton'

const AddOrEditPostScreen = ({ navigation, route }) => {
  const { colors } = useTheme()

  const [checked, setChecked] = useState(1)
  const [images, setImages] = useState([])
  const [editPost, setEditPost] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (route.params?.editPost) {
      setLoading(true)
      setEditPost(route.params.editPost)
      setChecked(route.params.editPost.is_club)

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

  return (
    <CustomContainer
      label="Créer un article"
      pressBack={() => navigation.goBack()}
    >
      <View style={p20}>
        <Text style={[defaultText, { color: colors.text }]}>
          {editPost ? 'Modifier' : 'Créer'} un article pour proposer ou partager
          des moments, des faits ou tout autre chose auprès de la communautés.
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
                message: values.message,
                user_id: '', // User connecté
                is_club: checked,
                images: [],
              }

              console.log('DATA', data)
              // resetForm()

              // Envoie des datas a l'API
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

                {/* Uniquement si le user est un admin du club */}
                {/* RADIO BOX */}
                <View style={mt40}>
                  <Text style={[littleTitle, { color: colors.text }]}>
                    Poster l'article sous quel label ?
                  </Text>

                  <View
                    style={[rowCenter, { justifyContent: 'space-between' }]}
                  >
                    <CustomRadioBox
                      checked={checked}
                      onPress={() => {
                        setChecked(1)
                      }}
                      value={1}
                      color={darkPrimaryColor}
                      label="Nom du club"
                      style={styles.checkbox}
                    />

                    <CustomRadioBox
                      checked={checked}
                      onPress={() => {
                        setChecked(0)
                      }}
                      value={0}
                      color={darkPrimaryColor}
                      label="Mon nom"
                      style={styles.checkbox}
                    />
                  </View>
                </View>

                <CustomDivider addStyle={my20} />

                {/* IMAGES */}
                <View>
                  <View style={[rowCenter]}>
                    <Text style={[littleTitle, { color: colors.text }]}>
                      Ajouter des images / photos
                    </Text>

                    {images.length > 0 && (
                      <TouchableOpacity
                        style={styles.iconPlus}
                        onPress={() => {}}
                      >
                        <MaterialCommunityIcons
                          name="plus-circle"
                          size={30}
                          color={darkPrimaryColor}
                        />
                      </TouchableOpacity>
                    )}
                  </View>

                  {images.length === 0 && (
                    <CustomIconButton
                      text="Ajouter des images / photos"
                      onPress={() => {}}
                      size="100%"
                    />
                  )}
                </View>

                <CustomBigButton
                  label={editPost ? "Modifier l'article" : "Créer l'article"}
                  onPress={handleSubmit}
                />
              </View>
            )}
          </Formik>
        </ScrollView>
      </View>
    </CustomContainer>
  )
}

export default AddOrEditPostScreen

const styles = StyleSheet.create({
  iconPlus: {
    marginLeft: 'auto',
    marginRight: 10,
  },
  checkbox: {
    width: '45%',
  },
})
