import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import React, { useEffect, useState } from 'react'

import { useTheme } from 'react-native-paper'

import axios from 'axios'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import FadingEdge from 'react-native-fading-edge'

import { GOELOCATION_KEY } from 'react-native-dotenv'

import Geolocation from 'react-native-geolocation-service'

import { useStoreState } from 'easy-peasy'

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
  TitleH3,
  secondaryColor,
  defaultText,
  mb10,
  mt40,
  mb30,
} from '../assets/styles/styles'

import TabContainer from '../components/Navigation/TabContainer'
import HeaderDrawer from '../components/Navigation/HeaderDrawer'
import CustomModal from '../components/CustomModal'
import ModalSearchDepartment from '../components/Calendar/ModalSearchDepartment'
import useUtils from '../hooks/useUtils'
import CalendarCard from '../components/Calendar/CalendarCard'
import ModalChoiceMonth from '../components/Calendar/ModalChoiceMonth'
import useGeolocation from '../hooks/useGeolocation'
import useCustomToast from '../hooks/useCustomToast'
import useAxios from '../hooks/useAxios'
import CustomLoader from '../components/CustomLoader'
import CustomBigButton from '../components/CustomBigButton'

const URL_API_GEO = 'https://geo.api.gouv.fr/regions'

const CalendarScreen = ({ navigation }) => {
  const { colors } = useTheme()
  const { formatCompleteDate, getOneYear, formatMonthText } = useUtils()
  const { requestLocationPermission } = useGeolocation()
  const { toastShow } = useCustomToast()
  const { axiosPostWithToken } = useAxios()

  const userStore = useStoreState((state) => state.user)
  const { user } = userStore

  const [regions, setRegions] = useState([])
  const [region, setRegion] = useState(false)
  const [regionCode, setRegionCode] = useState(false)
  const [departments, setDepartments] = useState([])
  const [department, setDepartment] = useState(false)
  const [departmentCode, setDepartmentCode] = useState('29')
  const [showModalDepartment, setShowModalDepartment] = useState(true)
  const [search, setSearch] = useState(false)
  const [showModalMonth, setShowModalMonth] = useState(false)
  const [choiceMonth, setChoiceMonth] = useState(false)
  const [hasLocationPermission, setHasLocationPermission] = useState(false)
  const [isLocationLoad, setIsLocationLoad] = useState(false)
  const [loadHikes, setLoadHikes] = useState(false)
  const [hikes, setHikes] = useState([])
  const [loading, setLoading] = useState(false)
  const [access, setAccess] = useState(false)

  const [monthYear, setMonthYear] = useState([])

  let enterDate = false

  const dateDay = new Date()

  const [choiceDepartment, setChoiceDepartment] = useState('Finistère')

  useEffect(() => {
    if (user.premium !== 'active') {
      setAccess(false)
    } else {
      setAccess(true)
    }
  }, [])

  // Demande a récupérer les régions
  useEffect(() => {
    if (access) {
      // On demande autorisation geoloc
      loadLocation()
      loadRegions()
      setAccess(false)
    }
  }, [access])

  useEffect(() => {
    if (isLocationLoad) {
      setIsLocationLoad(false)
    }
  }, [isLocationLoad])

  // Demande a récupérer les départements
  useEffect(() => {
    if (region) {
      loadDepartments()
    }
  }, [region])

  useEffect(() => {
    if (loadHikes) {
      searchHikes()
      setLoadHikes(false)
    }
  }, [loadHikes])

  // Lorsque le user a choisi sa region et son département
  useEffect(() => {
    if (search) {
      // On ferme la modal
      setShowModalDepartment(false)

      setChoiceDepartment(department)

      // Ici on recharge les nouvelles randos venant de l'api
      searchHikes()
    }
  }, [search])

  useEffect(() => {
    if (choiceMonth) {
      const str = choiceMonth.split(' ')
      const month = formatMonthText(str[0]) + 1
      const year = str[1]

      const data = {
        year,
        month,
        department_code: departmentCode,
      }

      // Request API avec le mois "month", l'année "year" et le departmentCode
      searchHikes(data)

      setChoiceMonth(false)
      setShowModalMonth(false)
    }
  }, [choiceMonth])

  useEffect(() => {
    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
        (position) => {
          // console.log('position', position)
          const options = {
            method: 'GET',
            url: `https://us1.locationiq.com/v1/reverse.php?key=${GOELOCATION_KEY}&lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`,
          }
          axios
            .request(options)
            .then((response) => {
              // console.log('axios', response.data)
              // setCoordonate({ lat: response.data.lat, lng: response.data.lon })

              setChoiceDepartment(response.data.address.county)
              setDepartment(response.data.address.country)
              setDepartmentCode(response.data.address.postcode.substr(0, 2))
              setLoadHikes(true)
            })
            .catch((error) => {
              // console.error('error', error.message)
              if (error.response.status === 401) {
                toastShow({
                  title: 'Oops !',
                  message: `Cette écran est temporairement indisponible (${error.response.status})`,
                  type: 'toast_danger',
                })

                navigation.goBack()
              }
            })
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message)
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      )
    }
  }, [hasLocationPermission])

  const loadLocation = () => {
    if (user.address !== null) {
      setChoiceDepartment(user.address.department)
      setDepartment(user.address.department)
      setRegion(user.address.region)
      setDepartmentCode(user.address.department_code)
      setLoadHikes(true)
    } else {
      requestLocationPermission().then((res) => {
        if (res) {
          setHasLocationPermission(true)
        } else {
          setChoiceDepartment('Finistère')
          setDepartment('Finistère')
          setDepartmentCode('29')
          setRegion('Bretagne')
          setLoadHikes(true)
        }
      })
    }

    setIsLocationLoad(true)
  }

  // Permet de rechercher les Regions sur l'api geo
  const loadRegions = async () => {
    const response = await axios.get(URL_API_GEO)

    setRegions(response.data)
  }

  // Permet de rechercher les Départements sur l'api geo depuis le code region
  const loadDepartments = async () => {
    const response = await axios.get(
      `${URL_API_GEO}/${regionCode}/departements`
    )

    setDepartments(response.data)
  }

  const searchHikes = async (month = false) => {
    setLoading(true)
    let data
    if (month) {
      data = month
    } else {
      data = {
        department_code: Number(departmentCode),
      }
    }
    const response = await axiosPostWithToken(
      `hikes/vtt/${month ? 'searchInMonth' : 'searchInDepartment'}`,
      data
    )

    if (response.status === 200) {
      setHikes(response.data)
    }

    setLoading(false)
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

  if (!access) {
    return (
      <View style={{ flex: 1 }}>
        {/* Header avec avatar */}
        <View>
          <HeaderDrawer
            title="Non autorisé"
            onPress={() => navigation.openDrawer()}
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            marginTop: 50,
            paddingHorizontal: 10,
          }}
        >
          <Text style={[TitleH3, { color: colors.text }]}>
            Accès premiums uniquement
          </Text>
          <Text style={[defaultText, mb10, mt40, { color: colors.text }]}>
            Cette page est reservée aux utilisateurs ayant un compte premium de
            niveau 1 minimum
          </Text>
          <Text style={[defaultText, mb30, { color: colors.text }]}>
            Vous pouvez mettre à niveau votre compte en cliquant sur le bouton
            ci-dessous
          </Text>
          <CustomBigButton
            label="Voir les premiums"
            onPress={() => navigation.navigate('Subs')}
          />
        </View>
      </View>
    )
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
              <View style={styles.containerList}>
                {loading ? (
                  <CustomLoader
                    backgroundColor={{ backgroundColor: secondaryColor }}
                  />
                ) : (
                  <FlatList
                    data={hikes}
                    ListEmptyComponent={() => (
                      <View style={{ flex: 1 }}>
                        <Text
                          style={[
                            TitleH3,
                            textAlignCenter,
                            mt20,
                            { color: colors.text },
                          ]}
                        >
                          Pas de randonnées dans le départements pour le moment.
                        </Text>
                      </View>
                    )}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                      if (
                        formatCompleteDate(new Date(item.date)) === enterDate
                      ) {
                        return (
                          <CalendarCard
                            key={item.id}
                            hike={item}
                            onPress={() =>
                              navigation.navigate('Hike', { hikeId: item.id })
                            }
                          />
                        )
                      }
                      if (
                        formatCompleteDate(new Date(item.date)) !== enterDate
                      ) {
                        enterDate = formatCompleteDate(new Date(item.date))
                        return (
                          <View key={item.id}>
                            <Text style={[littleTitle, styles.title]}>
                              {enterDate === formatCompleteDate(dateDay)
                                ? "Aujourd'hui - "
                                : ''}
                              {formatCompleteDate(new Date(item.date))}
                            </Text>

                            <CalendarCard
                              hike={item}
                              onPress={() =>
                                navigation.navigate('Hike', { hikeId: item.id })
                              }
                            />
                          </View>
                        )
                      }
                      return <View />
                    }}
                  />
                )}
              </View>
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
              setChoiceMonth={setChoiceMonth}
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
