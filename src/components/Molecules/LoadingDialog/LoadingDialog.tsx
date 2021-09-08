import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Dialog} from 'react-native-elements';
import {SIZES} from '../../../constants/theme';
import LottieView from 'lottie-react-native';
import {LoadingContext} from '../../../shared/LoadingProvider';
import {useContext} from 'react';
export function LoadingDialog() {
  const [loading, setLoading] = useContext(LoadingContext);
  const toggleLoading = () => {
    setLoading(!loading);
  };
  return (
    <View>
      <Dialog
        overlayStyle={{
          backgroundColor: 'white',
          flex: 1,
          alignItems: 'center',
          position: 'relative',
          justifyContent: 'center',
          elevation: 0,
        }}
        backdropStyle={{backgroundColor: 'white'}}
        onTouchEnd={() => {
          setLoading(false);
        }}
        isVisible={loading}
        onBackdropPress={() => {
          setLoading(true);
        }}>
        {/* <Dialog.Loading loadingStyle={{backgroundColor: 'transparent'}}> */}
        {/* <Image
          source={LoadingSpinner}
          style={{
            width: SIZES.width,
            height: SIZES.width,

            backgroundColor: 'transparent',
          }}
        /> */}
        <LottieView
          source={require('../../../../assets/icons/LoadingAnimation.json')}
          autoPlay
          loop
          style={{
            width: SIZES.width,
          }}
        />
        {/* </Dialog.Loading> */}
      </Dialog>
    </View>
  );
}
