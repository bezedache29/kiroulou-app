import { View, Text, SafeAreaView, StyleSheet, Button } from 'react-native'
import React, { useEffect, useState } from 'react'

import { useTheme } from 'react-native-paper'

import axios from 'axios'

import TabContainer from '../components/Navigation/TabContainer'
import HeaderDrawer from '../components/Navigation/HeaderDrawer'
import CustomModal from '../components/CustomModal'
import ModalSearchDepartment from '../components/Calendar/ModalSearchDepartment'

const URL_API_GEO = 'https://geo.api.gouv.fr/regions'

const CalendarScreen = ({ navigation }) => {
  const { colors } = useTheme()

  const [regions, setRegions] = useState([])
  const [region, setRegion] = useState(false)
  const [regionCode, setRegionCode] = useState(false)
  const [departments, setDepartments] = useState([])
  const [department, setDepartment] = useState(false)
  const [showModalDepartment, setShowModalDepartment] = useState(true)
  const [search, setSearch] = useState(false)

  // Demande a récupérer les régions
  useEffect(() => {
    loadRegions()
  }, [])

  // Demande a récupérer les départements
  useEffect(() => {
    if (region) {
      loadDepartments()
    }
  }, [region])

  // Lorsque le user a choisi sa region et son département
  useEffect(() => {
    if (search) {
      alert(`${search.region} - ${search.department}`)
    }
  }, [search])

  // Permet de rechercher les Regions sur l'api geo
  const loadRegions = async () => {
    const response = await axios.get(URL_API_GEO)

    console.log(response.data)

    setRegions(response.data)
  }

  // Permet de rechercher les Départements sur l'api geo depuis le code region
  const loadDepartments = async () => {
    const response = await axios.get(
      `${URL_API_GEO}/${regionCode}/departements`
    )

    console.log(response.data)

    setDepartments(response.data)
  }

  // Quand le user ferme la modal
  const closeModalDepartment = () => {
    setRegion(false)
    setRegionCode(false)
    setDepartments([])
    setDepartment(false)
    setShowModalDepartment(false)
  }

  return (
    <TabContainer>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header avec avatar */}
        <HeaderDrawer
          title="KiRoulOu"
          onPress={() => navigation.openDrawer()}
        />

        <View>
          <Text>CalendarScreen</Text>
          <Button
            title="Rechercher par département"
            onPress={() => setShowModalDepartment(true)}
          />
        </View>

        <CustomModal
          showModal={showModalDepartment}
          closeModal={() => closeModalDepartment()}
        >
          <ModalSearchDepartment
            regions={regions}
            region={region}
            departments={departments}
            setRegion={setRegion}
            setRegionCode={setRegionCode}
            department={department}
            setDepartment={setDepartment}
            setSearch={setSearch}
          />
        </CustomModal>
      </SafeAreaView>
    </TabContainer>
  )
}

export default CalendarScreen

const styles = StyleSheet.create({})
