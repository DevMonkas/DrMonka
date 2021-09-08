import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Badge({content, icon}: any) {
  return (
    <View style={styles.itemWrapper}>
      <View style={styles.itemHeaderWrapper}>
        <Text style={styles.itemHeader}>Wallet Ballance is Low? </Text>
      </View>
      <View style={styles.itemContentWrapper}>
        <Text style={styles.itemContent}>
          Recharge Now And Get Amazing Discounts
        </Text>
      </View>
      <View style={styles.itemDateWrapper}>
        <Text style={styles.itemDate}>13 Aug 2021 03:29 PM</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemWrapper: {
    flex: 0.1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E2',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  itemHeaderWrapper: {
    marginBottom: 8,
  },
  itemHeader: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 18,
  },
  itemContentWrapper: {
    marginBottom: 6,
  },
  itemContent: {
    color: '#000',
  },
  itemDateWrapper: {},
  itemDate: {
    color: '#7E7E80',
    fontSize: 12,
  },
});
