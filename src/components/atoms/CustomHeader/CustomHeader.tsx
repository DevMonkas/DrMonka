import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {StyleSheet, View, Text} from 'react-native';

export default function CustomHeader({heading}: any) {
  return (
    <View style={styles.container}>
      <View style={styles.backButtonWrapper}>
        <AntDesign name="arrowrleft" size={35} color="#fff" />
      </View>
      <View style={styles.contentWrapper}>
        <Text style={styles.textContent}>{heading}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 0.12,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FF7007',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backButtonWrapper: {
    marginRight: 20,
  },
  contentWrapper: {},
  textContent: {fontSize: 25},
});
