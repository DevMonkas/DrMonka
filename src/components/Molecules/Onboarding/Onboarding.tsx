import React, {useState, useRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  ViewStyle,
  FlatList,
  Animated,
  View,
} from 'react-native';
import {OnboardingData} from '../../../shared/Data';
import OnboardingButton from '../../atoms/OnboardingButton/OnboardingButton';
import OnboardingItem from '../../atoms/OnboardingItem/OnboardingItem';
import Paginator from '../../atoms/Paginator/Paginator';

const {width: screenWidth} = Dimensions.get('window');

export default function Onboarding({navigation}: any) {
  const scrollTo = async () => {
    if (currentIndex < OnboardingData.length - 1) {
      slidesRef.current.scrollToIndex({index: currentIndex + 1});
    } else {
      try {
        // await AsyncStorage.setItem("@viewedOnboarding", "true");
      } catch (err) {
        console.error(err);
      } finally {
        //navigate to home screen

        navigation.navigate('DrawerScreen');
      }
    }
  };
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef: any = useRef(null);
  const ViewableItemsChanged = useRef(({viewableItems}: any) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;
  return (
    <View style={styles.container}>
      <View style={{flex: 3}}>
        <FlatList
          data={OnboardingData}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={item => item.id}
          scrollEventThrottle={32}
          ref={slidesRef}
          viewabilityConfig={viewConfig}
          onViewableItemsChanged={ViewableItemsChanged}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX,
                  },
                },
              },
            ],
            {useNativeDriver: false},
          )}
          renderItem={({item}) => <OnboardingItem item={item} />}
        />
      </View>
      <Paginator data={OnboardingData} scrollX={scrollX} />
      <OnboardingButton
        scrollTo={scrollTo}
        percentage={(currentIndex + 1) * (100 / OnboardingData.length)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
