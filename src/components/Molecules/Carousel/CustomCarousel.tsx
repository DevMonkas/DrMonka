import React, {useRef, useState, useEffect} from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {carouselDummy} from '../../../shared/Data';
import {View, Dimensions, StyleSheet, Platform, Text} from 'react-native';

export interface CustomCarouselProps {
  data: any;
  autoplay?: boolean;
  loop?: boolean;
}

const {width: screenWidth} = Dimensions.get('window');

const CustomCarousel = ({
  data,
  autoplay = false,
  loop = false,
}: CustomCarouselProps) => {
  const [entries, setEntries] = useState(carouselDummy);
  const carouselRef: any = useRef(null);
  useEffect(() => {
    setEntries(data);
  }, []);

  const renderItem = ({item}: any, parallaxProps: any) => {
    return (
      <View style={[styles.item]}>
        <ParallaxImage
          source={{uri: item.illustration}}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.8}
          {...parallaxProps}
        />
      </View>
    );
  };

  return (
    <View style={{height: 180, marginVertical: 2}}>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        itemWidth={screenWidth - 60}
        data={entries}
        loop={true}
        renderItem={renderItem}
        hasParallaxImages={true}
      />
    </View>
  );
};
//Style
const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
    height: 80,
  },
  circularContainer: {
    flex: 1,
    width: screenWidth,
  },
  cicularItem: {
    width: 70,
    height: 90,
  },
  item: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  circularImageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: '#FF7007',
    borderRadius: 100,
  },

  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
    width: '120%',
    height: '200',
  },
  carouselText: {
    fontSize: 12,
    marginTop: 2,
  },
});

export default CustomCarousel;
