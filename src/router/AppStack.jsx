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
import ImagesProfileScreen from '../screens/profile/images/ImagesProfileScreen'
import HikeScreen from '../screens/hikes/HikeScreen'
import AddHikeStep1Screen from '../screens/hikes/AddHikeScreen/AddHikeStep1Screen'
import AddHikeStep2Screen from '../screens/hikes/AddHikeScreen/AddHikeStep2Screen'
import AddHikeStep3Screen from '../screens/hikes/AddHikeScreen/AddHikeStep3Screen'
import HikesClubScreen from '../screens/hikes/HikesClub/HikesClubScreen'
import AddOrEditPostScreen from '../screens/posts/AddOrEditPostScreen'
import PostScreen from '../screens/posts/PostScreen'
import CommentsScreen from '../screens/comments/CommentsScreen'
import EditCommentScreen from '../screens/comments/EditCommentScreen'
import SubPaymentScreen from '../screens/subs/SubPaymentScreen'
import SubSuccessScreen from '../screens/subs/SubSuccessScreen'
import UserProfileScreen from '../screens/profile/user/UserProfileScreen'
import AddOrEditClubScreen from '../screens/clubs/AddOrEditClubScreen'
import BillingScreen from '../screens/billing/BillingScreen'

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
    <Stack.Screen name="SubPayment" component={SubPaymentScreen} />
    <Stack.Screen name="SubSuccess" component={SubSuccessScreen} />

    {/* Billing */}
    <Stack.Screen name="Billing" component={BillingScreen} />

    {/* Legals */}
    <Stack.Screen name="LegalNotice" component={LegalNoticeScreen} />
    <Stack.Screen name="LegalFoundation" component={LegalFoundationsScreen} />
    <Stack.Screen name="Privacy" component={PrivacyScreen} />
    <Stack.Screen name="CookiePolicy" component={CookiePolicyScreen} />

    {/* Clubs */}
    <Stack.Screen name="AddOrEditClub" component={AddOrEditClubScreen} />

    {/* Profil User & Club */}
    <Stack.Screen name="ImagesProfile" component={ImagesProfileScreen} />

    {/* Profil User */}
    <Stack.Screen name="UserProfile" component={UserProfileScreen} />
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

    {/* Randonnée */}
    <Stack.Screen name="Hike" component={HikeScreen} />
    <Stack.Screen name="AddHikeStep1" component={AddHikeStep1Screen} />
    <Stack.Screen name="AddHikeStep2" component={AddHikeStep2Screen} />
    <Stack.Screen name="AddHikeStep3" component={AddHikeStep3Screen} />
    <Stack.Screen name="HikesClub" component={HikesClubScreen} />

    {/* Articles */}
    <Stack.Screen name="AddOrEditPost" component={AddOrEditPostScreen} />
    <Stack.Screen name="Post" component={PostScreen} />
    {/* Commentaires */}
    <Stack.Screen name="Comments" component={CommentsScreen} />
    <Stack.Screen name="EditComment" component={EditCommentScreen} />
  </Stack.Navigator>
)

export default AppStack
