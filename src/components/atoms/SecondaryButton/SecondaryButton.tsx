import React from 'react';
import {ReactChild} from 'react';
import {StyleSheet, ViewStyle, Pressable, Text} from 'react-native';
import {FONTS} from '../../../constants/theme';
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
    <Pressable
      style={[styles.secondaryButton, customCls]}
      onPress={onPress}
      android_ripple={{color: 'green', borderless: true}}
      disabled={disable}>
      {text && <Text style={[styles.text, FONTS.primaryFam]}>{text}</Text>}
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  secondaryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 25,
    elevation: 0,
    borderRadius: 12,
    borderColor: 'green',
    borderWidth: 1.5,
    backgroundColor: 'white',
  },

  text: {
    color: 'green',
    fontWeight: 'bold',
  },
});
