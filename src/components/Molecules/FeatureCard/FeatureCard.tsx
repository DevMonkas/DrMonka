import React from 'react';
import {Dimensions, StyleSheet, Text, View, Image} from 'react-native';
import {COLORS} from '../../../constants/theme';

export interface PrimaryButtonProps {
  content: string;
}
const {width: screenWidth} = Dimensions.get('window');
export default function CategoryTab({content, imgUrl, clickHandler}: any) {
  return (
    <View style={styles.container} onTouchEnd={clickHandler}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <View
          style={[
            styles.imgContainer,
            {borderRadius: 100, backgroundColor: '#fff'},
          ]}>
          <Image style={styles.img} source={imgUrl} />
        </View>
        <View>
          <Text style={styles.footerText}>{content}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth / 2 - 10,
    height: 200,
    backgroundColor: COLORS.primary[100],
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    marginBottom: 5,
    position: 'relative',
  },
  imgContainer: {
    borderRadius: 100,
    marginBottom: 10,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: '70%',
    height: '70%',
  },

  footerText: {
    color: COLORS.primary[500],
    fontWeight: 'bold',
    fontSize: 12,
  },
});
