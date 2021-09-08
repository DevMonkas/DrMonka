import * as React from 'react';
import PrimaryInput from '../../components/atoms/PrimaryInput/PrimaryInput';
import PrimaryButton from '../../components/atoms/PrimaryButton/PrimaryButton';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import {useState} from 'react';
import {FONTS, SIZES} from '../../constants/theme';
import {updateUser} from '../../services/User.service';
import {SignUpImage} from '../../../assets';
import {ScreenWidth} from 'react-native-elements/dist/helpers';
import {useContext} from 'react';
import {AuthContext} from '../../shared/AuthProvider';
export default function SignUp({navigation, route}: any) {
  const [err, setError] = useState('');
  const [gender, setGender] = useState('male');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [user, setUser] = useContext(AuthContext);
  const [submitTouched, setsubmitTouched] = useState(false);
  const parentInputHandler = (e: any, identifier: any) => {
    setsubmitTouched(false);
    if (identifier === 'd') {
      setDate(e);
    } else if (identifier === 'm') {
      setMonth(e);
    } else if (identifier === 'y') {
      setYear(e);
    } else {
      setName(e);
    }
    console.log(date, month, year);
  };
  const submitForm = () => {
    if (!date || !month || !year || !name) {
      console.log('empty field');
      return;
    }

    const userObj = {
      name: name,
      dob: date + '/' + month + '/' + year,
      gender: gender,
    };
    updateUser(userObj)
      .then(data => {
        setUser({...userObj});
        navigation.navigate('DrawerScreen');
      })
      .catch(err => {
        setError(err.message);
      });
  };
  return (
    <View style={styles.signupContainer}>
      <KeyboardAvoidingView
        {...(Platform.OS === 'ios' ? {behavior: 'padding'} : {})}>
        <Image
          source={SignUpImage}
          style={{
            width: SIZES.width,
            height: SIZES.height / 4,
            resizeMode: 'contain',
          }}
        />
        <View style={styles.headingWrapper}>
          <Text
            style={[
              FONTS.secondaryFam,
              {
                color: '#000',
                fontSize: 25,
                marginBottom: 20,
                paddingHorizontal: 10,
              },
            ]}>
            Share Details
          </Text>

          <Text style={styles.subTitle}>
            to avail a free minute in every consultation with your favourite
            astrologer, everytime
          </Text>
        </View>
        <View style={styles.nameWrapper}>
          <Text style={{paddingLeft: 8, fontSize: 16, marginBottom: 10}}>
            Name
          </Text>
          <PrimaryInput
            handleText={e => parentInputHandler(e, 'n')}
            placeHoldText="Enter your name here"
            width="100%"
            errorMessage={submitTouched && !name ? 'Field cannot be empty' : ''}
            keyboardType="default"
          />
        </View>
        <View style={styles.dateWrapper}>
          <Text style={{paddingLeft: 8, fontSize: 16, marginBottom: 10}}>
            Date of Birth
          </Text>
          <View style={styles.dateInputWrapper}>
            <PrimaryInput
              handleText={e => parentInputHandler(e, 'd')}
              width="30%"
              placeHoldText="DD"
              maxLength={2}
            />
            <Text
              style={{
                fontSize: 35,
                alignItems: 'center',
                color: '#B6B6B6',
              }}>
              /
            </Text>
            <PrimaryInput
              handleText={e => parentInputHandler(e, 'm')}
              width="30%"
              placeHoldText="MM"
              maxLength={2}
            />
            <Text
              style={{
                fontSize: 35,
                alignItems: 'center',
                color: '#B6B6B6',
              }}>
              /
            </Text>
            <PrimaryInput
              handleText={e => parentInputHandler(e, 'y')}
              width="30%"
              placeHoldText="YYYY"
              maxLength={4}
            />
          </View>
          <View
            style={[
              styles.errorWrapper,
              {
                display:
                  submitTouched && (date === '' || month === '' || year === '')
                    ? 'flex'
                    : 'none',
              },
            ]}>
            <Text
              style={{
                color: 'red',
                fontSize: 12,
                paddingLeft: 15,
                position: 'relative',
                top: -20,
              }}>
              Field cannot be empty
            </Text>
          </View>
        </View>
        <View style={styles.GenderWrapper}>
          <View style={styles.GenderLabel}>
            <Text style={{paddingLeft: 8, fontSize: 16}}>Gender</Text>
          </View>
          <View
            style={[
              styles.maleIcon,
              styles.genderIcon,
              gender === 'male' ? styles.orangeBorder : null,
            ]}
            onTouchEnd={() => setGender('male')}>
            <FontAwesome5 name="male" size={24} color="#B6B6B6" />
            <Text
              style={{
                fontSize: 15,
                paddingVertical: 12,
                paddingHorizontal: 8,
                marginRight: 20,
              }}>
              Male
            </Text>
          </View>
          <View
            style={[
              styles.femaleIcon,
              styles.genderIcon,
              gender === 'female' ? styles.orangeBorder : null,
            ]}
            onTouchEnd={() => setGender('female')}>
            <FontAwesome5 name="female" size={24} color="#B6B6B6" />
            <Text
              style={{
                paddingHorizontal: 8,
                paddingVertical: 12,
                fontSize: 15,
              }}>
              Female
            </Text>
          </View>
        </View>
        <View style={styles.buttonWrapper}>
          <PrimaryButton
            text="PROCEED"
            onPress={() => {
              setsubmitTouched(true);
              submitForm();
              console.log(submitTouched, date, month, year);
            }}></PrimaryButton>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
const styles = StyleSheet.create({
  signupContainer: {
    paddingTop: '10%',
    backgroundColor: 'white',
    paddingHorizontal: '4%',
    flex: 1,
  },
  dateInputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  headingWrapper: {
    width: '100%',
    marginBottom: 30,
  },
  genderIcon: {
    borderWidth: 1,
    borderColor: '#B6B6B6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  orangeBorder: {
    borderColor: '#FF7707',
  },
  nameWrapper: {
    marginBottom: 10,
  },
  dateWrapper: {},
  subTitle: {color: '#000', paddingHorizontal: 10},
  genderGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  GenderWrapper: {
    alignItems: 'center',

    flexDirection: 'row',
    marginBottom: 30,
    justifyContent: 'space-between',
    paddingRight: '8%',
  },
  GenderLabel: {
    marginRight: 20,
  },
  errorWrapper: {},
  femaleIcon: {
    borderRadius: 8,
  },
  maleIcon: {
    borderRadius: 8,
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
