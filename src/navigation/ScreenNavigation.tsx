import React, {useContext, useEffect} from 'react';
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
import Chat from '../pages/Chat/Chat';
import ChatList from '../pages/Chat/ChatList';
import {SocketContext} from '../shared/SocketProvider';
import {IMessage} from 'react-native-gifted-chat';
import {getAllConversations, startConsultation} from '../services/Chat.service';
import {MessageContext} from '../shared/MessageProvider';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import VideoCall from '../pages/VideoCall/VideoCall';
import {AuthContext} from '../shared/AuthProvider';
import {VideoCallContext} from '../shared/VideoCallProvider';
import {GlobaluserObj, assignValue} from '../shared/Globals';
const Stack = createStackNavigator();

export default function ScreenNavigation({viewedOnboarding}: any) {
  const soc = useContext(SocketContext);
  const [user, setUser] = useContext(AuthContext);
  assignValue(user);

  const [messageObj, setMessageObj] = useContext(MessageContext);
  const {initialize} = useContext(VideoCallContext);
  useEffect(() => {
    setTimeout(() => {
      initialize();
    }, 1000);
    getAllConversations()
      .then(data => {
        const myData = data.data;

        myData.forEach(element => {
          // console.log('--->', element);
          console.log('YOYOYOYO', element.userPhone!, element.doctorPhone);
          startConsultation(
            soc,
            element.userPhone!,
            element.doctorPhone!,
            true,
          );
        });
      })
      .catch(err => {
        console.log(err);
      });

    soc.on('message', data => {
      console.log('message=>>>', data);
      let message: IMessage = {
        _id: data.doctorPhone + '_' + Math.round(Math.random() * 1000000),
        createdAt: data.created_at,
        system: data.system,
        text: data.message,
        user: {
          _id: 2,
          name: 'route?.params.userName',
          avatar: 'route?.params.img',
        },
      };

      setMessageObj((prevArray: any) => [message]);
      // setMessages((previousMessages: any) =>
      //   GiftedChat.append(previousMessages, [message]),
      // );
    });
  }, []);

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
      color={COLORS.primary[500]}
    />
  );

  const callingButtons = (navigation: any, color: string) => (
    <View style={{paddingRight: '15%', flexDirection: 'row'}}>
      <Feather
        name="phone-call"
        style={{marginRight: '20%'}}
        size={26}
        onPress={() => navigate(navigation, 'CallingScreen')}
        color={COLORS.primary[500]}
      />

      <AntDesign
        name="videocamera"
        size={26}
        onPress={() => navigate(navigation, 'VideoCallingScreen')}
        color={COLORS.primary[500]}
      />
    </View>
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
        name="VideoCallingScreen"
        options={{
          headerShown: false,
          title: '',
        }}
        component={VideoCall}
      />
      <Stack.Screen
        name="Wallet"
        options={({navigation}) => ({
          headerShown: true,
          headerStyle: styles.secondaryHeader,
          headerBackgroundContainerStyle: {backgroundColor: 'white'},
          headerTitleStyle: styles.secondaryHeaderTitle,
          headerLeft: () => backButton(navigation, 'white'),
          title: 'My Wallet',
        })}
        component={Wallet}
      />
      <Stack.Screen
        name="Notifications"
        options={({navigation}) => ({
          headerShown: true,
          headerStyle: styles.secondaryHeader,
          headerTitleStyle: styles.secondaryHeaderTitle,
          headerBackgroundContainerStyle: {backgroundColor: 'white'},
          headerLeft: () => backButton(navigation, 'white'),
          title: 'Notifications',
        })}
        component={Notifications}
      />

      <Stack.Screen
        name="Chat"
        options={({navigation}) => ({
          headerShown: true,
          headerStyle: styles.secondaryHeader,
          headerTitleStyle: styles.secondaryHeaderTitle,
          headerBackgroundContainerStyle: {backgroundColor: 'white'},
          headerLeft: () => backButton(navigation, 'white'),
          headerRight: () => callingButtons(navigation, 'white'),
          headerTitle: '' + user.selectedPhone,
          title: 'Chat',
        })}
        component={Chat}
      />
      <Stack.Screen
        name="ChatList"
        options={({navigation}) => ({
          headerShown: true,
          headerStyle: styles.secondaryHeader,
          headerTitleStyle: styles.secondaryHeaderTitle,
          headerBackgroundContainerStyle: {backgroundColor: 'white'},
          headerLeft: () => backButton(navigation, 'white'),
          title: 'Recent Chats',
        })}
        component={ChatList}
      />
      <Stack.Screen
        name="AstrologerProfile"
        options={({navigation}) => ({
          headerShown: true,
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.secondaryHeaderTitle,
          headerBackgroundContainerStyle: {backgroundColor: 'white'},
          headerBackImage: () => backButton(navigation, COLORS.primary[400]),
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
    backgroundColor: COLORS.primary[100],
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  secondaryHeaderTitle: {
    color: COLORS.primary[500],
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
