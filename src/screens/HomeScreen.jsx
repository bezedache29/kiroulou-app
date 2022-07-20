import { Text, Button, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'

import { useTheme } from 'react-native-paper'

import TabContainer from '../components/Navigation/TabContainer'
import HeaderDrawer from '../components/Navigation/HeaderDrawer'

const HomeScreen = ({ navigation }) => {
  const { colors } = useTheme()

  return (
    <TabContainer>
      <SafeAreaView>
        {/* Header avec avatar */}
        <HeaderDrawer
          title="KiRoulOu"
          onPress={() => navigation.openDrawer()}
        />

        <ScrollView style={{ backgroundColor: 'red' }}>
          <Text>HomeScreen</Text>
          <Button
            title="Go to Onboarding"
            onPress={() => navigation.navigate('Onboarding')}
          />
        </ScrollView>
      </SafeAreaView>
    </TabContainer>
  )
}

export default HomeScreen
