import React from 'react';
import {ReactChild} from 'react';
import {
  StyleSheet,
  ViewStyle,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import CategoryTab from '../../atoms/CategoryTab/CategoryTab';
export interface PrimaryButtonProps {
  text?: string;
  width?: string;
  customCls?: ViewStyle;
  fullButton?: boolean;
  onPress?: () => void;
  children?: ReactChild;
}
const {width: screenWidth} = Dimensions.get('window');
export default function CategoryTabList() {
  const data = ['KUNDLI', 'HOROSCOPE', 'BLOG', 'MATCHMAKING'];
  return (
    <View
      style={{
        height: 80,
        alignItems: 'center',
        marginVertical: 5,
        width: screenWidth,
      }}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        alwaysBounceHorizontal={true}
        persistentScrollbar={false}
        style={styles.scrollview}>
        <View style={{flexDirection: 'row'}}>
          {data.map((item: any, index: any) => (
            <CategoryTab key={index} text={item}></CategoryTab>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollview: {
    flex: 1,
    padding: 0,
    margin: 0,
    height: 0,
  },
});
