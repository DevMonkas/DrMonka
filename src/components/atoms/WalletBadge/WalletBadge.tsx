import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Badge, Chip} from 'react-native-elements';
import {COLORS} from '../../../constants/theme';
import {fetchWallet} from '../../../services/Wallet.service';
import {AuthContext} from '../../../shared/AuthProvider';
export interface WalletBadgeProps {
  onTouch: () => void;
}

export default function WalletBadge({onTouch = () => {}}: WalletBadgeProps) {
  const [user, setUser] = useContext(AuthContext);
  useEffect(() => {
    fetchWallet()
      .then(walletMoney => {
        console.log('WALLET MONEY ', walletMoney);
        setUser({...user, balance: walletMoney.data.money});
      })
      .catch(err => {
        console.log('ERROR BLOCK');
        console.log(err);
      });
  }, []);
  return (
    <Chip
      type="outline"
      containerStyle={{
        borderStyle: 'solid',
        borderColor: COLORS.primary[500],
      }}
      onPress={onTouch}
      title={`₹${user.balance}`}
      titleStyle={styles.titleChip}
      buttonStyle={styles.walletChip}
      icon={{
        name: 'wallet-outline',
        type: 'ionicon',
        size: 20,
        color: COLORS.primary[500],
      }}
    />
  );
}
const styles = StyleSheet.create({
  walletChip: {
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderColor: COLORS.primary[500],
    borderWidth: 1,
    borderRadius: 10,
  },
  titleChip: {
    color: COLORS.primary[500],
    fontWeight: 'bold',
  },
});
