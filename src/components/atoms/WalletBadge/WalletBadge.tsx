import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Badge, Chip} from 'react-native-elements';
import {COLORS} from '../../../constants/theme';
export interface WalletBadgeProps {
  onTouch: () => void;
}

export default function WalletBadge({onTouch = () => {}}: WalletBadgeProps) {
  return (
    <Chip
      type="outline"
      containerStyle={{
        borderStyle: 'solid',
        borderColor: COLORS.primary[500],
      }}
      onPress={onTouch}
      title="₹ 0.00"
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
