import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../pages/Home/Home';
import WalletBadge from '../components/atoms/WalletBadge/WalletBadge';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CallPage from '../pages/CallPage/CallPage';
import {DrawerContent} from './DrawerContent';
import {AstroCall} from '../components/Molecules/AstroCall/AstroCall';
import {useContext} from 'react';
import {AuthContext} from '../shared/AuthProvider';
import {COLORS} from '../constants/theme';
import Chat from '../pages/Chat/Chat';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  const navigate = (navigation: any, location: string) => {
    navigation.navigate(location);
  };
  const [user, setUser] = useContext(AuthContext);
  console.log(user);
  return (
    <Drawer.Navigator
      initialRouteName="DrawerScreen"
      screenOptions={({navigation}) => ({
        headerStyle: styles.header,
        headerTitle: () => <></>,
        drawerIcon: ({color}) => (
          <EvilIcons name="navicon" size={24} color={color} />
        ),
        headerTitleStyle: styles.headerTitle,
        headerRight: () => (
          <>
            <View style={styles.headerRightArea}>
              <WalletBadge onTouch={() => navigate(navigation, 'Wallet')} />
              <View>
                <MaterialCommunityIcons
                  name="bell"
                  size={26}
                  style={{marginHorizontal: 15}}
                  color={COLORS.primary[400]}
                  onPress={() => navigate(navigation, 'Notifications')}
                />
              </View>
              <View style={{}}>
                <MaterialCommunityIcons
                  name="chat"
                  size={28}
                  style={{marginHorizontal: 15}}
                  color={COLORS.primary[400]}
                  onPress={() => navigate(navigation, 'Chat')}
                />
              </View>
            </View>
          </>
        ),
        headerLeft: () => (
          <EvilIcons
            name="navicon"
            size={30}
            color={COLORS.primary[400]}
            style={{
              marginLeft: 20,
            }}
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      })}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Call An Astrologer" component={AstroCall} />
      <Drawer.Screen name="Chat" component={Chat} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: COLORS.primary[100],
  },
  headerTitle: {
    color: COLORS.primary[400],
  },
  headerRightArea: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-end',
  },
});
