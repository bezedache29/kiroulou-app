import { ScrollView, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'

import { useTheme } from 'react-native-paper'

import {
  defaultText,
  mt20,
  mt30,
  mt50,
  mx10,
  textAlignCenter,
  TitleH3,
} from '../../assets/styles/styles'

import CustomBox from '../CustomBox'
import CustomDropdown from '../CustomDropdown'
import CustomButton from '../CustomButton'

const ModalSearchDepartment = ({
  regions,
  region,
  setRegion,
  setRegionCode,
  departments,
  department,
  setDepartment,
  setDepartmentCode,
  setSearch,
}) => {
  const { colors } = useTheme()

  const scrollRef = useRef()

  // Lorsque le user choisi sa region, on scroll en bas de page pour que le user choisse son departement et ne soit pas gener s'il ouvre son clavier
  useEffect(() => {
    if (region) {
      scrollRef.current.scrollToEnd({ animated: false })
    }
  }, [region])

  return (
    <View style={[mx10, { flex: 1 }]}>
      <Text style={[TitleH3, textAlignCenter, { color: colors.text }]}>
        Choisir le département
      </Text>

      <ScrollView showsVerticalScrollIndicator={false} ref={scrollRef}>
        <CustomBox style={[{ margin: 0 }, mt20]}>
          <Text style={[defaultText, { color: colors.text }]}>
            1 - Pour rechercher une randonnée, sélectionnez une région pour
            filtrer la recherche
          </Text>
        </CustomBox>

        {/* Dropdown pour choisir la region */}
        <CustomDropdown
          data={regions}
          value={region}
          setValue={setRegion}
          setValueCode={setRegionCode}
          renderAttr="nom"
          placeholder="Selectionner une région"
          searchPlaceholder="Nom de la région"
          leftIcon="city-variant-outline"
        />

        {departments && departments.length > 0 && (
          <>
            <CustomBox style={[{ margin: 0 }, mt30]}>
              <Text style={[defaultText, { color: colors.text }]}>
                2 - sélectionnez un département pour affiner la recherche
              </Text>
            </CustomBox>

            {/* Dropdown pour choisir le département */}
            <CustomDropdown
              data={departments}
              value={department}
              setValue={setDepartment}
              setValueCode={setDepartmentCode}
              renderAttr="nom"
              placeholder="Selectionner un département"
              searchPlaceholder="Nom du département"
              leftIcon="home-city-outline"
            />
          </>
        )}

        {department && (
          <CustomButton
            btnStyle={mt50}
            onPress={() => setSearch({ region, department })}
          >
            Valider & Rechercher
          </CustomButton>
        )}

        <View style={{ marginTop: 530 }} />
      </ScrollView>
    </View>
  )
}

export default ModalSearchDepartment
