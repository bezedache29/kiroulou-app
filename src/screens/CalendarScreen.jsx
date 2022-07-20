import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import TabContainer from '../components/Navigation/TabContainer'
import HeaderDrawer from '../components/Navigation/HeaderDrawer'

const CalendarScreen = ({ navigation }) => (
  <TabContainer>
    <SafeAreaView>
      {/* Header avec avatar */}
      <HeaderDrawer title="KiRoulOu" onPress={() => navigation.openDrawer()} />

      <View>
        <Text>CalendarScreen</Text>
      </View>
    </SafeAreaView>
  </TabContainer>
)

export default CalendarScreen
