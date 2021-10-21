import React from 'react';
import {ReactChild} from 'react';
import {
  StyleSheet,
  ViewStyle,
  Pressable,
  Text,
  TouchableOpacity,
} from 'react-native';
import {COLORS, FONTS} from '../../../constants/theme';
export interface PrimaryButtonProps {
  text?: string;
  width?: string;
  customCls?: ViewStyle;
  fullButton?: boolean;
  onPress?: () => void;
  children?: ReactChild;
  disable?: boolean;
}

export default function SecondaryButton({
  text,
  customCls,
  disable = false,
  width = '100%',
  fullButton = true,
  children,
  onPress = () => {},
}: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      style={[customCls, styles.secondaryButton]}
      onPress={onPress}
      disabled={disable}>
      {text && <Text style={[styles.text, FONTS.secondaryFam]}>{text}</Text>}
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  secondaryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 15,
    elevation: 0,
    borderRadius: 12,
    borderColor: COLORS.primary[500],
    borderWidth: 1.5,
    backgroundColor: 'white',
  },

  text: {
    color: COLORS.primary[500],
    fontWeight: 'bold',
    fontSize: 13,
  },
});
