import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
export default function WalletCard({}: any) {
  return (
    <View style={styles.container}>
      <View style={styles.walletDetailWrapper}>
        <View style={styles.walletMoneyWrapper}>
          <Text style={styles.walletMoney}> {'\u20B9'}0</Text>
        </View>
        <View style={styles.descriptionWrapper}>
          <Text style={styles.description}>Top Astro Wallet Balance</Text>
        </View>
      </View>
      <View style={styles.addMoneyButtonWrapper}>
        <PrimaryButton
          text="+ Add Money"
          customCls={styles.addmoneyButton}></PrimaryButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.18,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '94%',
    marginLeft: '3%',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 6,
    marginTop: '-10%',
    position: 'relative',
    borderColor: '#E7E7E9',
    borderWidth: 2,
  },
  walletDetailWrapper: {},
  walletMoneyWrapper: {},
  description: {
    color: '#747182',
    fontSize: 12,
    textAlign: 'left',
  },
  descriptionWrapper: {},
  addMoneyButtonWrapper: {
    position: 'absolute',
    top: '36%',
    right: 20,
  },
  addmoneyButton: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  walletMoney: {
    color: '#3A3B59',
    fontSize: 30,
    textAlign: 'left',
  },
});
