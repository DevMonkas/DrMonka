import React, {useState, useEffect, useContext} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import firebase from 'firebase';
import {
  requestInterceptor,
  responseInterceptor,
} from './src/services/HttpInterceptor';
import {StatusBar, StyleSheet, View} from 'react-native';
import Home from './src/pages/Home/Home';
import AstroProfile from './src/pages/AstroProfile/AstroProfile';
import {NavigationContainer} from '@react-navigation/native';
import ScreenNavigation from './src/navigation/ScreenNavigation';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import SignUp from './src/pages/Authentication/SignUp';
import {LoadingDialog} from './src/components/Molecules/LoadingDialog/LoadingDialog';
import {LoadingProvider} from './src/shared/LoadingProvider';
import {LoadingContext} from './src/shared/LoadingProvider';
import {AuthProvider} from './src/shared/AuthProvider';
import VideoCall from './src/pages/VideoCall/VideoCall';
import Chat from './src/pages/Chat/Chat';
import ChatList from './src/pages/Chat/ChatList';
const Drawer = createDrawerNavigator();

export default function App() {
  const [viewedOnboarding, setViewedOnboarding] = useState(false);
  const [loading, setLoading] = useState(false);
  const checkOnBoarding = async () => {
    try {
      // const value = await AsyncStorage.getItem('@viewedOnboarding');
      console.log('already onboarded');
      // if (!value) {
      //   setViewedOnboarding(false);
      //   //change here
      // }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    checkOnBoarding();
  }, []);

  const onPressLearnMore = () => {};
  return (
    <SafeAreaProvider>
      <LoadingProvider>
        <AuthProvider>
          <StatusBar hidden={false} animated />
          <NavigationContainer>
            <ScreenNavigation viewedOnboarding={viewedOnboarding} />
            <LoadingDialog />
          </NavigationContainer>
        </AuthProvider>
      </LoadingProvider>

      {/* <SignUp></SignUp> */}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
