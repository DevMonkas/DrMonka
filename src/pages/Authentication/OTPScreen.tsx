import * as React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PrimaryInput from '../../components/atoms/PrimaryInput/PrimaryInput';
import PrimaryButton from '../../components/atoms/PrimaryButton/PrimaryButton';
import {Image, Linking, StyleSheet, Text, View} from 'react-native';
import {OTPIcon} from '../../../assets/index.js';
import {useEffect} from 'react';
import OtpInputs from 'react-native-otp-inputs';
import {useState} from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {COLORS, FONTS, SIZES} from '../../constants/theme';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import {checkAuth} from '../../services/User.service';
import {useContext} from 'react';
import {LoadingContext} from '../../shared/LoadingProvider';
import {AuthContext} from '../../shared/AuthProvider';
export default function OTPScreen({navigation, route}: any) {
  const [err, setError] = useState('');
  const [otp, setOTP] = useState('');
  const [loading, setLoading] = useContext(LoadingContext);
  const [user, setUser] = useContext(AuthContext);
  useEffect(() => {
    console.log(route.params?.phone);
  }, [route.params?.phone]);
  const verifyOTP = async () => {
    setLoading(true);
    try {
      const confirmation: FirebaseAuthTypes.ConfirmationResult =
        route.params?.verificationId;
      const credential = await confirmation.confirm(otp);
      let token = await credential?.user.getIdToken();

      const res = await checkAuth(token!);
      console.log('xoxox', res.data);
      console.log('---->', res.data.userExists);
      if (res.data.userExists == false) {
        setLoading(false);
        navigation.navigate('SignUp');
      } else {
        //User Data in res.data
        setUser({...res?.data});
        setLoading(false);
        navigation.navigate('DrawerScreen');
      }
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={OTPIcon}
        style={[styles.logo, {width: SIZES.width, resizeMode: 'contain'}]}
      />

      <View style={styles.center}>
        <Text style={[styles.heading, FONTS.secondaryFam]}>
          Enter the 4 digit OTP sent to
        </Text>
        <Text style={styles.subHeading}>{route.params?.phone}</Text>
        <View>
          <View style={{height: 100}}>
            <OtpInputs
              textAlign="center"
              inputStyles={styles.otp}
              inputContainerStyles={styles.otpContainer}
              autofillFromClipboard={false}
              handleChange={code => setOTP(code)}
              numberOfInputs={6}
            />
          </View>
        </View>
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
          An error Occurred
        </Text>
      </View>

      <View style={styles.center}>
        <PrimaryButton
          disable={otp.length != 6}
          text="VERIFY"
          onPress={async () => {
            verifyOTP()
              .then(data => {
                console.log(data);
              })
              .catch(err => {
                console.error(err);
              });
          }}
          customCls={{width: '50%'}}
        />
      </View>
      {/* <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification={attemptInvisibleVerification}
      /> */}
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
    color: COLORS.primary[400],
    fontSize: 15,
  },
  clickableText: {
    textDecorationLine: 'underline',
  },
  otp: {
    borderWidth: 1,
    borderStyle: 'solid',
    color: 'black',
    // padding: '0%',
    height: 50,
    width: 50,
    // justifyContent: 'center',
    // marginRight: 10,
    // alignItems: 'center',
    borderRadius: 10,
    borderColor: '#D2D5DC',
  },
  otpContainer: {
    color: 'black',
    padding: '1%',
    flex: 0,
    marginBottom: '10%',
    // justifyContent: 'center',
    // marginRight: 10,
    // alignItems: 'center',
  },
});
