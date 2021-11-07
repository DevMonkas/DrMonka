import React from 'react';
import {ReactChild} from 'react';
import {
  StyleSheet,
  ViewStyle,
  View,
  ScrollView,
  Dimensions,
  Text,
  Image,
} from 'react-native';
import {
  Bone,
  Diabetes,
  Ear,
  Eye,
  Fever,
  Lungs,
  Pimples,
  Pregnancy,
} from '../../../../assets';
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
        height: 100,
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
          <CategoryTab key={0} text={'Fever'}>
            <Image style={styles.img} source={Fever} />
          </CategoryTab>
          <CategoryTab key={1} text={'Pimples & Acne'}>
            <Image style={styles.img} source={Pimples} />
          </CategoryTab>
          <CategoryTab key={2} text={'Bone & Joint Issue'}>
            <Image style={styles.img} source={Bone} />
          </CategoryTab>
          <CategoryTab key={3} text={'Breathing Issues'}>
            <Image style={styles.img} source={Lungs} />
          </CategoryTab>
          <CategoryTab key={3} text={'Pregnancy'}>
            <Image style={styles.img} source={Pregnancy} />
          </CategoryTab>
          <CategoryTab key={3} text={'Ear Pain'}>
            <Image style={styles.img} source={Ear} />
          </CategoryTab>
          <CategoryTab key={3} text={'Diabetes'}>
            <Image style={styles.img} source={Diabetes} />
          </CategoryTab>
          <CategoryTab key={3} text={'Dry Eyes'}>
            <Image style={styles.img} source={Eye} />
          </CategoryTab>
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
  img: {
    width: '70%',
    height: '70%',
  },
});
