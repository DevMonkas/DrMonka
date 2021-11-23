import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../pages/Home/Home';
import WalletBadge from '../components/atoms/WalletBadge/WalletBadge';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import CallPage from '../pages/CallPage/CallPage';
import {DrawerContent} from './DrawerContent';
import {AstroCall} from '../components/Molecules/AstroCall/AstroCall';
import {useContext} from 'react';
import {AuthContext} from '../shared/AuthProvider';
import {COLORS, SIZES} from '../constants/theme';
import Chat from '../pages/Chat/Chat';
import ChatList from '../pages/Chat/ChatList';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {fetchWallet} from '../services/Wallet.service';
import {VideoCallContext} from '../shared/VideoCallProvider';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation({navigation}: any) {
  const navigate = (navigation: any, location: string) => {
    navigation.navigate(location);
  };
  const [user, setUser] = useContext(AuthContext);
  const {onCall} = useContext(VideoCallContext);
  useEffect(() => {
    if (onCall) navigation.navigate('VideoCallingScreen');
  }, [onCall]);
  return (
    <Drawer.Navigator
      initialRouteName="DrawerScreen"
      screenOptions={({navigation}) => ({
        headerStyle: styles.header,
        headerTitle: () => <></>,
        drawerIcon: ({color}) => (
          <EvilIcons name="navicon" size={24} color={color} />
        ),
        headerTransparent: true,
        headerTitleStyle: styles.headerTitle,
        header: () => (
          <View style={{backgroundColor: 'transparent'}}>
            <View style={styles.header}>
              <View style={styles.headerLeftArea}>
                <EvilIcons
                  name="navicon"
                  size={34}
                  color={COLORS.primary[500]}
                  style={{
                    marginLeft: 20,
                  }}
                  onPress={() => navigation.toggleDrawer()}
                />
              </View>
              <View style={styles.headerRightArea}>
                {/* <View style={{}}>
                  <FontAwesome
                    name="search"
                    size={26}
                    color={COLORS.primary[500]}
                    style={{marginHorizontal: 15}}
                  />
                </View> */}
                <WalletBadge onTouch={() => navigate(navigation, 'Wallet')} />
                <View>
                  <MaterialCommunityIcons
                    name="bell"
                    size={26}
                    style={{marginHorizontal: 15}}
                    color={COLORS.primary[500]}
                    onPress={() => navigate(navigation, 'Notifications')}
                  />
                </View>
                <View>
                  <MaterialCommunityIcons
                    name="chat"
                    size={28}
                    style={{marginHorizontal: 15}}
                    color={COLORS.primary[500]}
                    onPress={() => navigate(navigation, 'ChatList')}
                  />
                </View>
              </View>
            </View>
          </View>
        ),
        headerRight: () => (
          <>
            <View style={styles.headerRightArea}>
              <WalletBadge onTouch={() => navigate(navigation, 'Wallet')} />
              <View>
                <MaterialCommunityIcons
                  name="bell"
                  size={26}
                  style={{marginHorizontal: 15}}
                  color={COLORS.primary[500]}
                  onPress={() => navigate(navigation, 'Notifications')}
                />
              </View>
              <View style={{}}>
                <MaterialCommunityIcons
                  name="chat"
                  size={28}
                  style={{marginHorizontal: 15}}
                  color={COLORS.primary[400]}
                  onPress={() => navigate(navigation, 'ChatList')}
                />
              </View>
            </View>
          </>
        ),
        headerLeft: () => (
          <View style={styles.headerLeftArea}>
            <EvilIcons
              name="navicon"
              size={34}
              color={COLORS.primary[500]}
              style={{
                marginLeft: 20,
              }}
              onPress={() => navigation.toggleDrawer()}
            />
          </View>
        ),
      })}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Consult with Doctor" component={AstroCall} />
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
    paddingBottom: 0.13 * SIZES.height,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  headerTitle: {
    color: COLORS.primary[500],
    height: '100%',
  },
  headerRightArea: {
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: '14%',
    justifyContent: 'flex-end',
  },
  headerLeftArea: {
    top: '10%',
    position: 'absolute',
    // height: 100,
    marginTop: '11%',
    zIndex: 1,
    justifyContent: 'center',
  },
});
