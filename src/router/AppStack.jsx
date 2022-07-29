import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/auth/LoginScreen'
import SplashScreen from '../screens/SplashScreen'
import RegisterScreen from '../screens/auth/RegisterScreen'
import AppDrawer from './AppDrawer'
import OnboardingScreen from '../screens/OnboardingScreen'
import SettingsScreen from '../screens/SettingsScreen'
import LegalNoticeScreen from '../screens/legals/LegalNoticeScreen'
import LegalFoundationsScreen from '../screens/legals/LegalFoundationsScreen'
import PrivacyScreen from '../screens/legals/PrivacyScreen'
import CookiePolicyScreen from '../screens/legals/CookiePolicyScreen'
import TermsAndConditionsScreen from '../screens/legals/TermsAndConditions/TermsAndConditionsScreen'
import CancellationScreen from '../screens/legals/TermsAndConditions/TermsOfService/CancellationScreen'
import ConductScreen from '../screens/legals/TermsAndConditions/TermsOfService/ConductScreen'
import SupportAndQuestionsScreen from '../screens/legals/TermsAndConditions/TermsOfService/SupportAndQuestionsScreen'
import TerminationScreen from '../screens/legals/TermsAndConditions/TermsOfService/TerminationScreen'
import AddClubScreen from '../screens/clubs/AddClubScreen'
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen'
import SubsScreen from '../screens/subs/SubsScreen'
import SubsChoiceScreen from '../screens/subs/SubsChoiceScreen'
import ClubProfileScreen from '../screens/profile/club/ClubProfileScreen'
import ClubsUserFollowScreen from '../screens/profile/user/scenes/informations/screens/ClubsUserFollowScreen'
import UsersUserFollowScreen from '../screens/profile/user/scenes/informations/screens/UsersUserFollowScreen'
import BikesUserScreen from '../screens/profile/user/scenes/informations/screens/bikes/BikesUserScreen'
import AddBikeScreen from '../screens/profile/user/scenes/informations/screens/bikes/AddBikeScreen'
import EditBikeScreen from '../screens/profile/user/scenes/informations/screens/bikes/EditBikeScreen'
import ComingSoonScreen from '../screens/ComingSoonScreen'
import EditUserProfileScreen from '../screens/profile/user/EditUserProfileScreen'
import EditClubProfileScreen from '../screens/profile/club/EditClubProfileScreen'
import AdminClubProfileScreen from '../screens/profile/club/AdminClubProfileScreen'
import NewMembersRequestScreen from '../screens/profile/club/scenes/members/screens/NewMembersRequestScreen'

const Stack = createNativeStackNavigator()

const AppStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    {/* Start */}
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="Onboarding" component={OnboardingScreen} />

    {/* Auth */}
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />

    {/* Divers */}
    <Stack.Screen name="Settings" component={SettingsScreen} />
    <Stack.Screen name="ComingSoon" component={ComingSoonScreen} />

    {/* Abonnements */}
    <Stack.Screen name="Subs" component={SubsScreen} />
    <Stack.Screen name="SubsChoice" component={SubsChoiceScreen} />

    {/* Legals */}
    <Stack.Screen name="LegalNotice" component={LegalNoticeScreen} />
    <Stack.Screen name="LegalFoundation" component={LegalFoundationsScreen} />
    <Stack.Screen name="Privacy" component={PrivacyScreen} />
    <Stack.Screen name="CookiePolicy" component={CookiePolicyScreen} />

    {/* Clubs */}
    <Stack.Screen name="AddClub" component={AddClubScreen} />

    {/* Profil User */}
    <Stack.Screen name="EditUserProfile" component={EditUserProfileScreen} />
    {/* Screens TabView Informations */}
    <Stack.Screen name="ClubsUserFollow" component={ClubsUserFollowScreen} />
    <Stack.Screen name="UsersUserFollow" component={UsersUserFollowScreen} />
    <Stack.Screen name="BikesUser" component={BikesUserScreen} />
    <Stack.Screen name="AddBike" component={AddBikeScreen} />
    <Stack.Screen name="EditBike" component={EditBikeScreen} />

    {/* Profil Club */}
    <Stack.Screen name="ClubProfile" component={ClubProfileScreen} />
    <Stack.Screen name="EditClubProfile" component={EditClubProfileScreen} />
    <Stack.Screen name="AdminClubProfile" component={AdminClubProfileScreen} />
    {/* Membres */}
    <Stack.Screen
      name="NewMembersRequest"
      component={NewMembersRequestScreen}
    />

    {/* Conditions Générales */}
    <Stack.Screen
      name="TermsAndConditions"
      component={TermsAndConditionsScreen}
    />
    <Stack.Screen
      name="SupportAndQuestions"
      component={SupportAndQuestionsScreen}
    />
    <Stack.Screen name="Termination" component={TerminationScreen} />
    <Stack.Screen name="Cancellation" component={CancellationScreen} />
    <Stack.Screen name="Conduct" component={ConductScreen} />

    {/* Drawer */}
    <Stack.Screen name="Drawer" component={AppDrawer} />
  </Stack.Navigator>
)

export default AppStack
