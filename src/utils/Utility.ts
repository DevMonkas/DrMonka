import {Alert, Linking} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Socket} from 'socket.io-client';
import {DefaultEventsMap} from 'socket.io-client/build/typed-events';
export const openBrowserUrl = async (url: string) => {
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    // Opening the link with some app, if the URL scheme is "http" the web link should be opened
    // by some browser in the mobile
    await Linking.openURL(url);
  } else {
    Alert.alert(`Don't know how to open this URL: ${url}`);
  }
};

export const getIdTokenRefreshed = async (): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    const unsubscribe = auth().onAuthStateChanged(async user => {
      unsubscribe();
      const refreshedToken = await user!.getIdToken();
      resolve(refreshedToken);
    });
  });
};
export const userLoggedIn = async (): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    const unsubscribe = auth().onAuthStateChanged(async user => {
      unsubscribe();

      const token = await getIdTokenRefreshed();
      if (token) resolve(true);
      reject(false);
    });
  });
};
