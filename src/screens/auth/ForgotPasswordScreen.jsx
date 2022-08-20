import { SafeAreaView, View } from 'react-native'
import React, { useState } from 'react'

import { useTheme } from 'react-native-paper'

import { defaultContainer } from '../../assets/styles/styles'

import CustomLabelNavigation from '../../components/CustomLabelNavigation'
import Screen1 from '../../components/Auth/ForgotPassword/Screen1'
import Screen2 from '../../components/Auth/ForgotPassword/Screen2'
import Screen3 from '../../components/Auth/ForgotPassword/Screen3'

const ForgotPasswordScreen = ({ navigation }) => {
  const { colors } = useTheme()

  const [email, setEmail] = useState(false)
  const [token, setToken] = useState(false)
  const [screen, setScreen] = useState(1)

  return (
    <SafeAreaView
      style={[defaultContainer, { backgroundColor: colors.background }]}
    >
      {/* Label Navigation */}
      <CustomLabelNavigation
        label="Mot de passe oublié ?"
        colors={colors}
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          })
        }}
      />
      <View style={{ flex: 1 }}>
        {screen === 1 && <Screen1 setEmail={setEmail} setScreen={setScreen} />}
        {screen === 2 && (
          <Screen2 setScreen={setScreen} email={email} setToken={setToken} />
        )}
        {screen === 3 && (
          <Screen3 setScreen={setScreen} token={token} email={email} />
        )}
      </View>
    </SafeAreaView>
  )
}

export default ForgotPasswordScreen
