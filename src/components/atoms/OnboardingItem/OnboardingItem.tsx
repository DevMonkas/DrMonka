import React from 'react';
import {Dimensions, StyleSheet, Image, View, Text} from 'react-native';
export interface PrimaryButtonProps {
  item?: any;
}
const {width} = Dimensions.get('window');
export default function OnboardingItem({item}: PrimaryButtonProps) {
  return (
    <View style={[styles.container, {width}]}>
      <View>
        <Image
          source={item.image}
          style={[styles.image, {width, resizeMode: 'contain'}]}
        />
      </View>
      <View style={{flex: 0.3}}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 0.7,
    justifyContent: 'center',
  },
  title: {
    fontWeight: '700',
    fontSize: 28,
    marginBottom: 10,
    color: '#000',
    textAlign: 'center',
  },
  description: {
    fontWeight: '300',
    color: '#62656b',
    textAlign: 'center',
    paddingHorizontal: 64,
  },
});
