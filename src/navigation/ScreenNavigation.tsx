import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import DrawerNavigation from './DrawerNavigation';
import Onboarding from '../components/Molecules/Onboarding/Onboarding';
import WalletBadge from '../components/atoms/WalletBadge/WalletBadge';
import ProfileSettings from '../pages/ProfileSetting/ProfileSetting';
import Wallet from '../pages/Wallet/Wallet';
import OTPScreen from '../pages/Authentication/OTPScreen';
import Login from '../pages/Authentication/Login';
import AstroProfile from '../pages/AstroProfile/AstroProfile';
import CallingScreen from '../pages/CallingScreen/CallingScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../constants/theme';
import SignUp from '../pages/Authentication/SignUp';
import {
  requestInterceptor,
  responseInterceptor,
} from '../services/HttpInterceptor';
import {LoadingContext} from '../shared/LoadingProvider';
import Notifications from '../pages/Notifications/Notifications';
const Stack = createStackNavigator();

export default function ScreenNavigation({viewedOnboarding}: any) {
  const navigate = (navigation: any, location: string) => {
    navigation.navigate(location);
  };
  const [loading, setLoading] = useContext(LoadingContext);
  requestInterceptor(setLoading);
  responseInterceptor(setLoading);
  const headerRight = (navigation: any) => (
    <View style={styles.rightHeader}>
      <WalletBadge onTouch={() => navigate(navigation, 'Wallet')} />
      <View>
        {/* <MaterialCommunityIcons name="bell" size={25} color="#FF7007" /> */}
      </View>
    </View>
  );
  const backButton = (navigation: any, color: string) => (
    <Ionicons
      style={styles.leftHeader}
      name="arrow-back"
      size={26}
      onPress={() => navigation.goBack()}
      color={color}
    />
  );
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DrawerScreen"
        component={DrawerNavigation}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OTPScreen"
        component={OTPScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        options={{
          headerShown: false,
          headerStyle: styles.headerStyle,
          headerBackImage: () => <></>,
          title: '',
        }}
        component={SignUp}
      />
      <Stack.Screen
        name="Settings"
        options={{
          headerShown: false,
          title: '',
        }}
        component={ProfileSettings}
      />
      <Stack.Screen
        name="CallingScreen"
        options={{
          headerShown: false,
          title: '',
        }}
        component={CallingScreen}
      />
      <Stack.Screen
        name="Wallet"
        options={({navigation}) => ({
          headerShown: true,
          headerStyle: styles.secondaryHeader,
          headerTitleStyle: styles.secondaryHeaderTitle,
          headerLeft: () => backButton(navigation, 'white'),
          title: 'Add Money',
        })}
        component={Wallet}
      />
      <Stack.Screen
        name="Notifications"
        options={({navigation}) => ({
          headerShown: true,
          headerStyle: styles.secondaryHeader,
          headerTitleStyle: styles.secondaryHeaderTitle,
          headerLeft: () => backButton(navigation, 'white'),
          title: 'Notifications',
        })}
        component={Notifications}
      />
      <Stack.Screen
        name="AstrologerProfile"
        options={({navigation}) => ({
          headerShown: true,
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.secondaryHeaderTitle,
          headerBackImage: () => backButton(navigation, COLORS.primary[300]),
          headerRight: () => headerRight(navigation),
          headerLeft: () => backButton(navigation, COLORS.primary[400]),
          title: '',
        })}
        component={AstroProfile}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerStyle: {
    backgroundColor: COLORS.primary[100],
  },
  secondaryHeader: {
    backgroundColor: '#FF740F',
  },
  secondaryHeaderTitle: {
    color: 'white',
  },
  leftHeader: {
    paddingLeft: '8%',
  },
  rightHeader: {
    paddingRight: '8%',
  },
  headerRightStyle: {
    flex: 1,
    flexDirection: 'row',
  },
});
