import React, {useState} from 'react';
import {
  Button,
  KeyboardType,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputBase,
  View,
  ViewStyle,
} from 'react-native';
import {Input} from 'react-native-elements';

import {KeyboardTypeOptions} from 'react-native';

export interface PrimaryInputProps {
  handleText: (str: string) => any;
  handleChange?: (str: string) => any;
  handleKeyPress?: (event: any) => void;
  text?: string;
  width?: string;
  keyboardType?: KeyboardTypeOptions;
  leftElement?: any;
  rightElement?: any;
  marginTop?: string;
  placeHoldText?: string;
  customCls?: ViewStyle;
  maxLength?: number;

  onPress?: () => void;
  errorMessage?: string;
}

export default function PrimaryInput({
  handleText,
  handleChange,
  text,
  placeHoldText,
  customCls,
  leftElement,
  rightElement,
  width = '80%',
  marginTop = '2',
  keyboardType = 'phone-pad',
  handleKeyPress = () => {},
  onPress = () => {},
  maxLength,
  errorMessage,
}: PrimaryInputProps) {
  const [focus, setFocus] = useState(false);
  return (
    <View style={{width: width}}>
      <Input
        placeholder={placeHoldText}
        dataDetectorTypes="phoneNumber"
        keyboardType={keyboardType}
        autoFocus={false}
        value={text}
        onChangeText={handleText}
        onKeyPress={handleKeyPress}
        inputContainerStyle={[customCls, styles.input]}
        maxLength={maxLength}
        errorMessage={errorMessage}
        rightIcon={rightElement}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    borderRadius: 12,
    borderColor: '#E3E3E3',
    borderStyle: 'solid',
    color: 'gray',
    borderWidth: 1,
    padding: 4,
    paddingStart: 10,
  },
});
