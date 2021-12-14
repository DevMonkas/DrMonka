import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../constants/theme';
import PulseLoader from './PulseLoader';
import {getDoctorInfo} from '../../services/Doctor.service';
export default function CallingScreen({route, navigation}: any) {
  const {userName} = route.params;
  const [doctorName, setDoctorName] = React.useState('');
  useEffect(() => {
    getDoctorInfo(userName).then(res => {
      setDoctorName(res.data.name);
    });
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{doctorName}</Text>
        <Text style={styles.subtitle}>
          Please wait while we connect your call...
        </Text>
      </View>
      <PulseLoader
        backgroundColor={COLORS.primary[400]}
        avatar={`https://ui-avatars.com/api/?name=${doctorName.replace(
          / /g,
          '+',
        )}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEADB',
  },
  textContainer: {
    position: 'absolute',
    top: '20%',
    width: '100%',
  },
  title: {
    color: '#000',
    fontSize: 35,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    color: 'green',
    fontSize: 12,
    textAlign: 'center',
  },
});
