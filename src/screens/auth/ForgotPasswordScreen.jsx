import { Text, SafeAreaView, ScrollView, View } from 'react-native'
import React from 'react'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import * as Animatable from 'react-native-animatable'

import { useTheme } from 'react-native-paper'

import {
  defaultContainer,
  defaultText,
  marginVertical50,
  mt50,
  ph25,
} from '../../assets/styles/styles'

import ForgotPwdSVG from '../../assets/images/svg/auth/pwd-forgot.svg'
import InputField from '../../components/InputField'
import AuthButton from '../../components/AuthButton'
import CustomLabelNavigation from '../../components/CustomLabelNavigation'

const ForgotPasswordScreen = ({ navigation }) => {
  const { colors } = useTheme()

  return (
    <SafeAreaView
      style={[defaultContainer, { backgroundColor: colors.background }]}
    >
      {/* Label Navigation */}
      <CustomLabelNavigation
        label="Mot de passe oublié ?"
        textColor={colors.text}
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          })
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false} style={ph25}>
        <View style={{ flex: 1 }}>
          <View style={{ alignItems: 'center' }}>
            <View
              style={{
                borderRadius: 8,
                overflow: 'hidden',
                width: 350,
                height: 250,
                marginVertical: 20,
              }}
            >
              <ForgotPwdSVG width={350} height={290} />
            </View>
          </View>
        </View>

        <Animatable.View
          animation="fadeInUpBig"
          style={{ flex: 3, backgroundColor: colors.background }}
        >
          <Text style={[defaultText, marginVertical50, { color: colors.text }]}>
            Envoyez-moi un e-mail avec un lien pour redéfinir mon mot de passe.
          </Text>

          <InputField
            label="Adresse e-mail"
            icon={
              <MaterialIcons
                name="alternate-email"
                size={20}
                color={colors.icon}
              />
            }
            keyboardType="email-address"
            color={colors.text}
          />
          <View style={mt50}>
            <AuthButton label="Recevoir l'e-mail" onPress={() => {}} />
          </View>
        </Animatable.View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ForgotPasswordScreen
