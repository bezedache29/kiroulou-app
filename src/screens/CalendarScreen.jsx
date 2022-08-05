import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import React, { useEffect, useState } from 'react'

import { useTheme } from 'react-native-paper'

import axios from 'axios'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import FadingEdge from 'react-native-fading-edge'

import {
  defaultTextBold,
  littleTitle,
  mx10,
  rowCenter,
  textAlignCenter,
  darkColor,
  primaryColor,
  mt20,
  mr10,
} from '../assets/styles/styles'

import TabContainer from '../components/Navigation/TabContainer'
import HeaderDrawer from '../components/Navigation/HeaderDrawer'
import CustomModal from '../components/CustomModal'
import ModalSearchDepartment from '../components/Calendar/ModalSearchDepartment'
import useUtils from '../hooks/useUtils'
import CalendarCard from '../components/Calendar/CalendarCard'
import ModalChoiceMonth from '../components/Calendar/ModalChoiceMonth'

const URL_API_GEO = 'https://geo.api.gouv.fr/regions'

const myHikes = [
  {
    id: '1',
    date: new Date(),
    position: { lat: 48.6049675528421, lng: -4.368736230974384 },
    // icon: '📍',
    icon: `
    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.9 1a8.6 8.6 0 00-8.6 8.6c0 4.35 7.2 12.05 8.42 13.33a.24.24 0 00.35 0c1.22-1.27 8.42-9 8.42-13.33A8.6 8.6 0 0011.9 1zm0 11.67A3.07 3.07 0 1115 9.6a3.07 3.07 0 01-3.1 3.07z"/>
    </svg>
    `,
    size: [24, 24],
    imgUrl: 'https://picsum.photos/id/11/200/300',
    name: 'Randonnée 1',
    flyer:
      'https://www.ats-sport.com/admin/fichiers_epreuves/FLYER-RandoVTTdesVignes_2021_D_page-0001-2021-11-04-13-51-25.jpg',
    price: '5 €',
    description:
      'Lorem ipsum dolor sit amet. Et debitis nihil nam distinctio exercitationem et voluptatem ipsam. In ullam iste est consequatur sequi et earum dolorem ut repellendus pariatur qui corporis suscipit aut adipisci dolorum At sunt consequatur?',
  },
  {
    id: '2',
    date: new Date('2022-08-05T03:24:00'),
    // Sun Dec 17 1995 03:24:00 GMT...),
    position: { lat: 48.6049675528421, lng: -4.368736230974384 },
    // icon: '📍',
    icon: `
    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.9 1a8.6 8.6 0 00-8.6 8.6c0 4.35 7.2 12.05 8.42 13.33a.24.24 0 00.35 0c1.22-1.27 8.42-9 8.42-13.33A8.6 8.6 0 0011.9 1zm0 11.67A3.07 3.07 0 1115 9.6a3.07 3.07 0 01-3.1 3.07z"/>
    </svg>
    `,
    size: [24, 24],
    imgUrl: 'https://picsum.photos/id/11/200/300',
    name: 'Randonnée 2',
    flyer:
      'https://www.ats-sport.com/admin/fichiers_epreuves/FLYER-RandoVTTdesVignes_2021_D_page-0001-2021-11-04-13-51-25.jpg',
    price: '5 €',
    description:
      'Lorem ipsum dolor sit amet. Et debitis nihil nam distinctio exercitationem et voluptatem ipsam. In ullam iste est consequatur sequi et earum dolorem ut repellendus pariatur qui corporis suscipit aut adipisci dolorum At sunt consequatur?',
  },
  {
    id: '3',
    date: new Date('2022-12-17T03:24:00'),
    // Sun Dec 17 1995 03:24:00 GMT...),
    position: { lat: 48.6049675528421, lng: -4.368736230974384 },
    // icon: '📍',
    icon: `
    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.9 1a8.6 8.6 0 00-8.6 8.6c0 4.35 7.2 12.05 8.42 13.33a.24.24 0 00.35 0c1.22-1.27 8.42-9 8.42-13.33A8.6 8.6 0 0011.9 1zm0 11.67A3.07 3.07 0 1115 9.6a3.07 3.07 0 01-3.1 3.07z"/>
    </svg>
    `,
    size: [24, 24],
    imgUrl: 'https://picsum.photos/id/11/200/300',
    name: 'Randonnée 3',
    flyer:
      'https://www.ats-sport.com/admin/fichiers_epreuves/FLYER-RandoVTTdesVignes_2021_D_page-0001-2021-11-04-13-51-25.jpg',
    price: '5 €',
    description:
      'Lorem ipsum dolor sit amet. Et debitis nihil nam distinctio exercitationem et voluptatem ipsam. In ullam iste est consequatur sequi et earum dolorem ut repellendus pariatur qui corporis suscipit aut adipisci dolorum At sunt consequatur?',
  },
  {
    id: '4',
    date: new Date('2022-12-17T03:30:00'),
    // Sun Dec 17 1995 03:24:00 GMT...),
    position: { lat: 48.6049675528421, lng: -4.368736230974384 },
    // icon: '📍',
    icon: `
    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.9 1a8.6 8.6 0 00-8.6 8.6c0 4.35 7.2 12.05 8.42 13.33a.24.24 0 00.35 0c1.22-1.27 8.42-9 8.42-13.33A8.6 8.6 0 0011.9 1zm0 11.67A3.07 3.07 0 1115 9.6a3.07 3.07 0 01-3.1 3.07z"/>
    </svg>
    `,
    size: [24, 24],
    imgUrl: 'https://picsum.photos/id/11/200/300',
    name: 'Randonnée 4',
    flyer:
      'https://www.ats-sport.com/admin/fichiers_epreuves/FLYER-RandoVTTdesVignes_2021_D_page-0001-2021-11-04-13-51-25.jpg',
    price: '5 €',
    description:
      'Lorem ipsum dolor sit amet. Et debitis nihil nam distinctio exercitationem et voluptatem ipsam. In ullam iste est consequatur sequi et earum dolorem ut repellendus pariatur qui corporis suscipit aut adipisci dolorum At sunt consequatur?',
  },
  {
    id: '5',
    date: new Date('2022-12-17T03:30:00'),
    // Sun Dec 17 1995 03:24:00 GMT...),
    position: { lat: 48.6049675528421, lng: -4.368736230974384 },
    // icon: '📍',
    icon: `
    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.9 1a8.6 8.6 0 00-8.6 8.6c0 4.35 7.2 12.05 8.42 13.33a.24.24 0 00.35 0c1.22-1.27 8.42-9 8.42-13.33A8.6 8.6 0 0011.9 1zm0 11.67A3.07 3.07 0 1115 9.6a3.07 3.07 0 01-3.1 3.07z"/>
    </svg>
    `,
    size: [24, 24],
    imgUrl: 'https://picsum.photos/id/11/200/300',
    name: 'Randonnée 4',
    flyer:
      'https://www.ats-sport.com/admin/fichiers_epreuves/FLYER-RandoVTTdesVignes_2021_D_page-0001-2021-11-04-13-51-25.jpg',
    price: '5 €',
    description:
      'Lorem ipsum dolor sit amet. Et debitis nihil nam distinctio exercitationem et voluptatem ipsam. In ullam iste est consequatur sequi et earum dolorem ut repellendus pariatur qui corporis suscipit aut adipisci dolorum At sunt consequatur?',
  },
  {
    id: '6',
    date: new Date('2022-12-17T03:30:00'),
    // Sun Dec 17 1995 03:24:00 GMT...),
    position: { lat: 48.6049675528421, lng: -4.368736230974384 },
    // icon: '📍',
    icon: `
    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.9 1a8.6 8.6 0 00-8.6 8.6c0 4.35 7.2 12.05 8.42 13.33a.24.24 0 00.35 0c1.22-1.27 8.42-9 8.42-13.33A8.6 8.6 0 0011.9 1zm0 11.67A3.07 3.07 0 1115 9.6a3.07 3.07 0 01-3.1 3.07z"/>
    </svg>
    `,
    size: [24, 24],
    imgUrl: 'https://picsum.photos/id/11/200/300',
    name: 'Randonnée 4',
    flyer:
      'https://www.ats-sport.com/admin/fichiers_epreuves/FLYER-RandoVTTdesVignes_2021_D_page-0001-2021-11-04-13-51-25.jpg',
    price: '5 €',
    description:
      'Lorem ipsum dolor sit amet. Et debitis nihil nam distinctio exercitationem et voluptatem ipsam. In ullam iste est consequatur sequi et earum dolorem ut repellendus pariatur qui corporis suscipit aut adipisci dolorum At sunt consequatur?',
  },
  {
    id: '7',
    date: new Date('2022-12-17T03:30:00'),
    // Sun Dec 17 1995 03:24:00 GMT...),
    position: { lat: 48.6049675528421, lng: -4.368736230974384 },
    // icon: '📍',
    icon: `
    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.9 1a8.6 8.6 0 00-8.6 8.6c0 4.35 7.2 12.05 8.42 13.33a.24.24 0 00.35 0c1.22-1.27 8.42-9 8.42-13.33A8.6 8.6 0 0011.9 1zm0 11.67A3.07 3.07 0 1115 9.6a3.07 3.07 0 01-3.1 3.07z"/>
    </svg>
    `,
    size: [24, 24],
    imgUrl: 'https://picsum.photos/id/11/200/300',
    name: 'Randonnée 4',
    flyer:
      'https://www.ats-sport.com/admin/fichiers_epreuves/FLYER-RandoVTTdesVignes_2021_D_page-0001-2021-11-04-13-51-25.jpg',
    price: '5 €',
    description:
      'Lorem ipsum dolor sit amet. Et debitis nihil nam distinctio exercitationem et voluptatem ipsam. In ullam iste est consequatur sequi et earum dolorem ut repellendus pariatur qui corporis suscipit aut adipisci dolorum At sunt consequatur?',
  },
]

const CalendarScreen = ({ navigation }) => {
  const { colors } = useTheme()
  const { formatCompleteDate, getOneYear } = useUtils()

  const [regions, setRegions] = useState([])
  const [region, setRegion] = useState(false)
  const [regionCode, setRegionCode] = useState(false)
  const [departments, setDepartments] = useState([])
  const [department, setDepartment] = useState(false)
  const [departmentCode, setDepartmentCode] = useState('29')
  const [showModalDepartment, setShowModalDepartment] = useState(true)
  const [search, setSearch] = useState(false)
  const [showModalMonth, setShowModalMonth] = useState(false)

  const [monthYear, setMonthYear] = useState([])

  let enterDate = false

  const dateDay = new Date()

  // Département du user (ou position actuel ?)
  const [choiceDepartment, setChoiceDepartment] = useState('Finistère')

  // Demande a récupérer les régions
  useEffect(() => {
    // Ici on charge les randos de base depuis l'api

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
      // On ferme la modal
      setShowModalDepartment(false)

      console.log(
        'recherche sur API les randos de se département du mois en cours'
      )

      setChoiceDepartment(department)

      // Ici on recharge les nouvelles randos venant de l'api
    }
  }, [search])

  // Permet de rechercher les Regions sur l'api geo
  const loadRegions = async () => {
    const response = await axios.get(URL_API_GEO)

    console.log('regions', response.data)

    setRegions(response.data)
  }

  // Permet de rechercher les Départements sur l'api geo depuis le code region
  const loadDepartments = async () => {
    const response = await axios.get(
      `${URL_API_GEO}/${regionCode}/departements`
    )

    console.log('departments', response.data)

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

  const openModalMonth = () => {
    setMonthYear(getOneYear())

    setShowModalMonth(true)
  }

  return (
    <TabContainer>
      <FadingEdge bottom={500}>
        <SafeAreaView style={{ flex: 1 }}>
          {/* Header avec avatar */}
          <HeaderDrawer
            title="Calendrier"
            onPress={() => navigation.openDrawer()}
          />

          <View style={[{ flex: 1, backgroundColor: colors.backgroundNav }]}>
            <View style={[rowCenter, mt20]}>
              <Text
                style={[
                  defaultTextBold,
                  textAlignCenter,
                  mx10,
                  { color: colors.text },
                ]}
              >
                Randos du : {departmentCode} - {choiceDepartment}
              </Text>

              <View
                style={[rowCenter, { marginLeft: 'auto', marginRight: 10 }]}
              >
                <TouchableOpacity onPress={() => openModalMonth()} style={mr10}>
                  <MaterialCommunityIcons
                    name="tune"
                    size={28}
                    color={colors.text}
                  />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setShowModalDepartment(true)}>
                  <MaterialCommunityIcons
                    name="text-box-search-outline"
                    size={28}
                    color={colors.text}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ flex: 1 }}>
              <ScrollView>
                <View style={styles.containerList}>
                  {myHikes.length > 0 &&
                    myHikes.map((hike) => {
                      if (formatCompleteDate(hike.date) === enterDate) {
                        return (
                          <CalendarCard
                            key={hike.id}
                            hike={hike}
                            onPress={() => alert(hike.id)}
                          />
                        )
                      }
                      if (formatCompleteDate(hike.date) !== enterDate) {
                        enterDate = formatCompleteDate(hike.date)
                        return (
                          <View key={hike.id}>
                            <Text style={[littleTitle, styles.title]}>
                              {enterDate === formatCompleteDate(dateDay)
                                ? "Ajourd'hui - "
                                : ''}
                              {formatCompleteDate(hike.date)}
                            </Text>

                            <CalendarCard
                              hike={hike}
                              onPress={() => alert(hike.id)}
                            />
                          </View>
                        )
                      }

                      return null
                    })}
                </View>
              </ScrollView>
            </View>
          </View>

          {/* Modal qui permet de choisir le département  */}
          <CustomModal
            showModal={showModalDepartment}
            closeModal={() => closeModalDepartment()}
            style={{ backgroundColor: colors.backgroundNav }}
          >
            <ModalSearchDepartment
              regions={regions}
              region={region}
              departments={departments}
              setRegion={setRegion}
              setRegionCode={setRegionCode}
              department={department}
              setDepartment={setDepartment}
              setDepartmentCode={setDepartmentCode}
              setSearch={setSearch}
            />
          </CustomModal>

          {/* Modal pour sélectionner le mois et l'année pour affiner la recherche */}
          <CustomModal
            showModal={showModalMonth}
            closeModal={() => setShowModalMonth(false)}
          >
            <ModalChoiceMonth
              monthYear={monthYear}
              setShowModalMonth={setShowModalMonth}
            />
          </CustomModal>
        </SafeAreaView>
      </FadingEdge>
    </TabContainer>
  )
}

export default CalendarScreen

const styles = StyleSheet.create({
  containerList: {
    flex: 1,
    paddingBottom: 120,
  },
  title: {
    padding: 10,
    backgroundColor: primaryColor,
    color: darkColor,
    borderRadius: 5,
    marginTop: 30,
    marginHorizontal: 5,
    elevation: 5,
  },
})
