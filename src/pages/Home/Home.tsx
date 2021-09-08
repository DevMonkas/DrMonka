import * as React from 'react';
import PrimaryInput from '../../components/atoms/PrimaryInput/PrimaryInput';
import PrimaryButton from '../../components/atoms/PrimaryButton/PrimaryButton';
import {
  Linking,
  StyleSheet,
  ViewStyle,
  View,
  Text,
  ScrollView,
} from 'react-native';
import {call, LoginIcon} from '../../../assets/index.js';
import CustomCarousel from '../../components/Molecules/Carousel/CustomCarousel';
import {carouselDummy} from '../../shared/Data';
import TrendingCard from '../../components/Molecules/TrendingCard/TrendingCard';
import CategoryTab from '../../components/atoms/CategoryTab/CategoryTab';
import CategoryTabList from '../../components/Molecules/CategoryTabList/CategoryTabList';
import FeatureCard from '../../components/Molecules/FeatureCard/FeatureCard';
const callingImg = require('../../../assets/calling.png');
const chattingImg = require('../../../assets/chat.png');
const videoImg = require('../../../assets/video-calling.png');
const shoppingImg = require('../../../assets/shopping-cart.png');
export default function Home({navigation}: any) {
  return (
    <>
      {/* <Center
        safeArea
        flex={1}
        justifyContent="ce"
        p={2}
        w="100%"
        mx="auto"
      > */}
      <ScrollView>
        <CategoryTabList />
        <CustomCarousel data={carouselDummy} loop={true} autoplay={true} />

        {/* <CustomCarousel data={carouselDummy} loop={true} autoplay={true} /> */}
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <View style={styles.featureCardWrapper}>
            <FeatureCard
              content="CHAT WITH ASTROLOGERS"
              imgUrl={chattingImg}></FeatureCard>
            <FeatureCard
              content="CALL WITH ASTROLOGERS"
              imgUrl={callingImg}></FeatureCard>
            <FeatureCard content="VIDEO CALL" imgUrl={videoImg}></FeatureCard>
            <FeatureCard
              content="TOP ASTROMALL"
              imgUrl={shoppingImg}></FeatureCard>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.heading}>Trending Astrologers</Text>
        </View>
        <View>
          <View style={styles.trendingCardWrapper}>
            <TrendingCard
              name="Shankar Hedge"
              languages="English,Hindi"
              price="100"
              experience="2"
              imgUrl="https://shankarhegdeastrologer.com/wp-content/uploads/2019/07/Shankar-Hegde.png"></TrendingCard>
            <TrendingCard
              name="Shankar Hedge"
              languages="English,Hindi"
              price="101"
              experience="4"
              imgUrl="https://shankarhegdeastrologer.com/wp-content/uploads/2019/07/Shankar-Hegde.png"></TrendingCard>
            <TrendingCard
              name="Shankar Hedge"
              languages="English,Hindi"
              price="101"
              experience="4"
              imgUrl="https://shankarhegdeastrologer.com/wp-content/uploads/2019/07/Shankar-Hegde.png"></TrendingCard>
            <TrendingCard
              name="Shankar Hedge"
              languages="English,Hindi"
              price="101"
              experience="4"
              imgUrl="https://shankarhegdeastrologer.com/wp-content/uploads/2019/07/Shankar-Hegde.png"></TrendingCard>
          </View>
        </View>

        {/* </Center> */}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  trendingCardWrapper: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
    paddingLeft: 5,
    paddingVertical: 8,
    marginTop: 12,
    width: '100%',
  },
  featureCardWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 8,
    marginTop: 12,
  },
  heading: {
    marginTop: '3%',
    marginLeft: '3%',
    color: 'black',
    fontSize: 20,
  },
});
