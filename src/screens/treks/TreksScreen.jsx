import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import TabContainer from '../../components/Navigation/TabContainer'
import HeaderDrawer from '../../components/Navigation/HeaderDrawer'

// A voir sur ce composant si c'est pas une modale plutot qu'un screen

const TreksScreen = ({ navigation }) => (
  <TabContainer>
    <SafeAreaView>
      {/* Header avec avatar */}
      <HeaderDrawer title="KiRoulOu" onPress={() => navigation.openDrawer()} />

      <View>
        <Text>TreksScreen</Text>
      </View>
    </SafeAreaView>
  </TabContainer>
)

export default TreksScreen
