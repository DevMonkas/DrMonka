import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  Animated,
  useWindowDimensions,
  TouchableOpacity,
  View,
} from 'react-native';

import Svg, {G, Circle} from 'react-native-svg';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../../constants/theme';
export default function OnboardingButton({percentage, scrollTo}: any) {
  const size = 128;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const {width} = useWindowDimensions();
  const circumference = 2 * Math.PI * radius;
  //   useEffect(() => {
  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef: any = useRef(null);

  const animation = (toValue: any) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animation(percentage);
  }, [percentage]);
  useEffect(() => {
    progressAnimation.addListener(value => {
      const strokeDashoffset =
        circumference - (circumference * value.value) / 100;

      if (progressRef?.current) {
        progressRef.current.setNativeProps({strokeDashoffset});
      }
    });
  }, [percentage]);

  //     return () => {
  //       progressAnimation.removeAllListeners();
  //     };
  //   }, []);

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <G rotation="90" origin={center} />
        <Circle
          stroke="#fff"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
        />

        <Circle
          ref={progressRef}
          fill="white"
          stroke={COLORS.primary[400]}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
        />
      </Svg>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.6}
        onPress={scrollTo}>
        <AntDesign name="arrowright" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    backgroundColor: COLORS.primary[400],
    borderRadius: 100,
    padding: 20,
  },
});
