import { View, Text, Button } from 'react-native'
import React from 'react'

const HomeScreen = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>HomeScreen</Text>
    <Button
      title="Go to Onboarding"
      onPress={() => navigation.navigate('Onboarding')}
    />
  </View>
)

export default HomeScreen
