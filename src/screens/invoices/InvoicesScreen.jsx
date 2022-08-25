import { Button, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from 'react-native-paper'
import CustomContainer from '../../components/CustomContainer'
import useAxios from '../../hooks/useAxios'
import CustomLoader from '../../components/CustomLoader'

const InvoicesScreen = ({ navigation }) => {
  const { colors } = useTheme()
  const { axiosGetWithToken, axiosPostWithToken } = useAxios()

  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadInvoices()
  }, [])

  const loadInvoices = async () => {
    const response = await axiosGetWithToken('invoices')
    console.log('all invoices', response.data.data)

    if (response.status === 200) {
      setInvoices(response.data.data)
    }

    // if (response.status === 200) {
    //   setOrders(response.data)
    // }

    // if (response.status === 404) {
    //   setOrders([])
    // }
  }

  const cancelSub = async (item) => {
    const response = axiosPostWithToken('subscriptions/cancel', {
      subscription_id: item.id,
      schedule_id: item.schedule,
    })

    console.log(response.data)
  }

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.id}</Text>
      <Button title="Cancel" onPress={() => cancelSub(item)} />
    </View>
  )

  if (loading) {
    return <CustomLoader />
  }

  return (
    <CustomContainer label="Mes factures" pressBack={() => navigation.goBack()}>
      <Text>InvoicesScreen</Text>
      {
        // TODO Affiche en premier si un abonnement est en cours
        // TODO Liste de tous les achats effectué sur stripe via le customer_id
      }

      <FlatList
        data={invoices}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <View>
            <Text>Pas de factures</Text>
          </View>
        )}
      />
    </CustomContainer>
  )
}

export default InvoicesScreen

const styles = StyleSheet.create({})
