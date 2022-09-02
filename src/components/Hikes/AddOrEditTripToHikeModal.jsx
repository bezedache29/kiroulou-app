import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import React, { useEffect, useState } from 'react'

import { useTheme } from 'react-native-paper'

import { Formik } from 'formik'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {
  athleticColor,
  beginnerColor,
  dangerColor,
  darkPrimaryColor,
  defaultText,
  littleTitle,
  mb10,
  mr5,
  mt20,
  mt40,
  px10,
  rowCenter,
  sportyColor,
  textAlignCenter,
  TitleH3,
} from '../../assets/styles/styles'

import CustomModal from '../CustomModal'
import addTripSchema from '../../validationSchemas/addTripSchema'
import CustomBigButton from '../CustomBigButton'
import InputField from '../InputField'
import CustomRadioBox from '../CustomRadioBox'

const AddOrEditTripToHikeModal = ({
  showModalTrip,
  closeModal,
  setTripCreated,
  setTripUpdated,
  edit,
}) => {
  const { colors } = useTheme()

  const [checked, setChecked] = useState(1)
  const [trip, setTrip] = useState(false) // Parcours que l'on modifie

  // Si on edit le parcours
  useEffect(() => {
    if (edit) {
      console.log('edit', edit)
      setTrip(edit)
      setChecked(Number(edit.trip.difficulty))
    }
  }, [edit])

  useEffect(() => {
    if (trip) {
      console.log('trip', trip)
    }
  }, [trip])

  return (
    <CustomModal showModal={showModalTrip} closeModal={closeModal}>
      <Text style={[TitleH3, textAlignCenter, { color: colors.text }]}>
        {edit ? 'Modifier' : 'Ajouter'} un parcours
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[px10, mt20, { flex: 1 }]}>
          <Text style={[defaultText, { color: colors.text }]}>
            {edit ? 'Modifier' : 'Ajouter'} un parcours a votre rando, en
            indiquant la distance, le denivelé, la diffculté et le nombre de
            ravitaillements sur celle-ci
          </Text>
          <Formik
            validationSchema={addTripSchema}
            initialValues={{
              distance: trip ? trip.trip.distance : '',
              height_difference: trip ? trip.trip.height_difference : 0,
              difficulty: trip ? trip.trip.difficulty : 1,
              supplies: trip ? trip.trip.supplies : 0,
            }}
            onSubmit={(values, { resetForm }) => {
              const data = {
                trip: {
                  distance: values.distance.toString(),
                  height_difference: values.height_difference.toString(),
                  difficulty: values.difficulty.toString(),
                  supplies: values.supplies.toString(),
                },
              }
              // Envoie les infos a la part 2
              console.log('PARCOURS ', data)
              // resetForm()

              if (edit) {
                if (trip.trip.id) {
                  data.trip.id = trip.trip.id
                  data.trip.hike_vtt_id = trip.trip.hike_vtt_id
                }
                data.index = trip.index
                setTripUpdated(data)
              } else {
                setTripCreated(data)
              }

              setTrip(false)
              resetForm()
              setChecked(1)
              closeModal()
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              values,
              errors,
              touched,
            }) => (
              <View>
                {/* DISTANCE */}
                <InputField
                  label="Distance (Km)"
                  icon={
                    <MaterialCommunityIcons
                      name="road-variant"
                      size={20}
                      color={
                        touched.distance && errors.distance
                          ? dangerColor
                          : colors.icon
                      }
                      style={mr5}
                    />
                  }
                  colors={colors}
                  error={touched.distance && errors.distance}
                  name="distance"
                  onChange={handleChange('distance')}
                  onBlur={handleBlur('distance')}
                  value={values.distance}
                  keyboardType="numeric"
                  inputType="number"
                />

                {/* DENIVELE */}
                <InputField
                  label="Dénivelé + (m)"
                  icon={
                    <MaterialCommunityIcons
                      name="image-filter-hdr"
                      size={20}
                      color={
                        touched.height_difference && errors.height_difference
                          ? dangerColor
                          : colors.icon
                      }
                      style={mr5}
                    />
                  }
                  colors={colors}
                  error={touched.height_difference && errors.height_difference}
                  name="height_difference"
                  onChange={handleChange('height_difference')}
                  onBlur={handleBlur('height_difference')}
                  value={values.height_difference}
                  keyboardType="numeric"
                  inputType="number"
                />

                {/* RAVITOS */}
                <InputField
                  label="Nombre de ravios"
                  icon={
                    <MaterialCommunityIcons
                      name="cup-water"
                      size={20}
                      color={
                        touched.supplies && errors.supplies
                          ? dangerColor
                          : colors.icon
                      }
                      style={mr5}
                    />
                  }
                  colors={colors}
                  error={touched.supplies && errors.supplies}
                  name="supplies"
                  onChange={handleChange('supplies')}
                  onBlur={handleBlur('supplies')}
                  value={values.supplies}
                  keyboardType="numeric"
                  inputType="number"
                />

                {/* DIFFICULTE */}
                <View style={styles.inputDifficulty}>
                  <TextInput
                    onFocus={Keyboard.dismiss}
                    value={checked}
                    name="difficulty"
                  />
                </View>

                {/* RADIO BOX DIFFICULTE */}
                <View style={mt40}>
                  <Text
                    style={[
                      littleTitle,
                      textAlignCenter,
                      mb10,
                      { color: colors.text },
                    ]}
                  >
                    Difficulté du parcours
                  </Text>
                  <View style={rowCenter}>
                    <View style={styles.radioButton}>
                      <CustomRadioBox
                        checked={checked}
                        onPress={() => {
                          setChecked(1)
                          setFieldValue('difficulty', 1)
                        }}
                        value={1}
                        color={darkPrimaryColor}
                        label="Famille"
                      />
                    </View>

                    <View style={styles.radioButton}>
                      <CustomRadioBox
                        checked={checked}
                        onPress={() => {
                          setChecked(2)
                          setFieldValue('difficulty', 2)
                        }}
                        value={2}
                        color={beginnerColor}
                        label="Débutant"
                      />
                    </View>
                  </View>
                  <View style={rowCenter}>
                    <View style={styles.radioButton}>
                      <CustomRadioBox
                        checked={checked}
                        onPress={() => {
                          setChecked(3)
                          setFieldValue('difficulty', 3)
                        }}
                        value={3}
                        color={athleticColor}
                        label="Sportif"
                      />
                    </View>

                    <View style={styles.radioButton}>
                      <CustomRadioBox
                        checked={checked}
                        onPress={() => {
                          setChecked(4)
                          setFieldValue('difficulty', 4)
                        }}
                        value={4}
                        color={sportyColor}
                        label="Sportif +"
                      />
                    </View>
                  </View>

                  {/* ERREUR RADIO BOX */}
                  {touched.difficulty && errors.difficulty && (
                    <Text style={{ color: dangerColor }}>
                      {errors.difficulty}
                    </Text>
                  )}
                </View>

                <CustomBigButton
                  label={trip ? 'Modifier le parcours' : 'Ajouter le parcours'}
                  onPress={handleSubmit}
                />
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </CustomModal>
  )
}

export default AddOrEditTripToHikeModal

const styles = StyleSheet.create({
  radioButton: {
    width: '50%',
  },
  inputDifficulty: {
    width: 0,
    height: 0,
  },
})
