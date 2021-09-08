import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Badge, Chip} from 'react-native-elements';
export interface WalletBadgeProps {
  onTouch: () => void;
}

export default function WalletBadge({onTouch = () => {}}: WalletBadgeProps) {
  return (
    <Chip
      type="outline"
      containerStyle={{
        borderStyle: 'solid',
        borderColor: '#FF7007',
      }}
      onPress={onTouch}
      title="₹ 0.00"
      titleStyle={styles.titleChip}
      buttonStyle={styles.walletChip}
      icon={{
        name: 'wallet-outline',
        type: 'ionicon',
        size: 20,
        color: '#FF7007',
      }}
    />
  );
}
const styles = StyleSheet.create({
  walletChip: {
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderColor: '#FF7007',
    borderWidth: 1,
    borderRadius: 10,
  },
  titleChip: {
    color: '#FF7007',
    fontWeight: 'bold',
  },
});
