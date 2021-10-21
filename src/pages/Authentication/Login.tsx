import * as React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PrimaryInput from '../../components/atoms/PrimaryInput/PrimaryInput';
import PrimaryButton from '../../components/atoms/PrimaryButton/PrimaryButton';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {LoginIcon} from '../../../assets/index.js';
import {useState} from 'react';
import {FONTS, SIZES} from '../../constants/theme';
import {openBrowserUrl} from '../../utils/Utility';
import auth from '@react-native-firebase/auth';
// import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
export default function Login({navigation}: any) {
  const [phone, setPhone] = React.useState('');
  // const phoneProvider = new firebase.auth.PhoneAuthProvider();
  const attemptInvisibleVerification = false;
  const recaptchaVerifier = React.useRef<any>();
  const [err, setError] = useState('');
  const getOtp = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber('+91' + phone);

      // console.log(verificationId);
      navigation.navigate('OTPScreen', {
        verificationId: confirmation,
        phone: '+91' + phone,
      });
    } catch (err: any) {
      console.error(err);
      setError(err);
    }
  };
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <Image
          source={LoginIcon}
          style={[styles.logo, {width: SIZES.width, resizeMode: 'contain'}]}
        />

        <View style={styles.center}>
          <Text style={[styles.heading, FONTS.secondaryFam]}>
            Enter your mobile number
          </Text>
          <Text style={styles.subHeading}>
            You will get an OTP on this number
          </Text>
          <PrimaryInput
            handleText={setPhone}
            leftElement={<></>}
            marginTop="5"
            keyboardType="phone-pad"
            width="100%"
            placeHoldText="Without Country Code eg. +91"></PrimaryInput>
          <Text
            style={
              err
                ? {
                    display: 'flex',
                    color: 'red',
                    fontSize: 12,
                    marginBottom: 10,
                    textAlign: 'left',
                  }
                : {display: 'none'}
            }>
            An Error Occurred Please try Again
          </Text>
          <View>
            <View>
              <View style={[styles.center]}>
                <Text style={[styles.aggreementText, FONTS.secondaryFam]}>
                  By proceeding,I agree to
                  <Text
                    style={styles.clickableText}
                    onPress={() => openBrowserUrl('https://google.com')}>
                    {' '}
                    Terms and Conditions
                  </Text>{' '}
                  &
                  <Text
                    style={styles.clickableText}
                    onPress={() => openBrowserUrl('https://google.com')}>
                    {' '}
                    Privacy Policy
                  </Text>
                </Text>
              </View>
            </View>

            <View
              style={{justifyContent: 'center', alignItems: 'center'}}></View>
          </View>
        </View>
        <View style={styles.center}>
          <PrimaryButton
            disable={phone.length != 10}
            onPress={getOtp}
            text="GET OTP"
            customCls={{width: '50%'}}
          />
        </View>
        {/* <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification={attemptInvisibleVerification}
      /> */}
      </KeyboardAvoidingView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 2,
    width: '100%',
    backgroundColor: 'white',
    marginHorizontal: 'auto',
  },
  logo: {
    flex: 0.5,
    justifyContent: 'flex-start',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    marginTop: '10%',
    marginBottom: '2%',
    fontSize: 25,
    color: '#1c1917',
  },
  subHeading: {
    marginBottom: '10%',
    color: 'gray',
    fontSize: 15,
  },
  aggreementText: {
    color: '#727181',
    fontSize: 12,
    width: '50%',
    marginBottom: '10%',
  },
  clickableText: {
    textDecorationLine: 'underline',
  },
});
