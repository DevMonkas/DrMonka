import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PulseLoader from './PulseLoader';

export default function CallingScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Shankar G. Hegde</Text>
        <Text style={styles.subtitle}>
          Please wait while we connect your call...
        </Text>
      </View>
      <PulseLoader
        backgroundColor="#FF740F"
        avatar="https://shankarhegdeastrologer.com/wp-content/uploads/2019/07/Shankar-Hegde.png"
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
