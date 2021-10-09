import React from 'react';
import {Dimensions, StyleSheet, Text, Image, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../constants/theme';
import PrimaryButton from '../../atoms/PrimaryButton/PrimaryButton';
const {width: screenWidth} = Dimensions.get('window');
export interface TrendingCardpProps {
  name: string;
  languages: string;
  price: string;
  experience: string;
  imgUrl: string;
}
const TrendingCard = ({
  name = 'SAMARTH BABA',
  languages = 'English,Hindi',
  price = '40',
  experience = '8+',
  imgUrl,
}: TrendingCardpProps) => {
  return (
    <View style={styles.trendingCardWrapper}>
      <View style={styles.imgContainer}>
        <View style={styles.onlineWrapper}>
          <Entypo name="dot-single" size={15} color="lightgreen" />
          <Text style={{fontSize: 10}}>Online</Text>
        </View>
        <Image
          style={{
            height: '100%',
            width: '100%',
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
          }}
          source={{
            uri: imgUrl,
          }}
        />
      </View>
      <View style={styles.astroDetailWrapper}>
        <View style={styles.starWrapper}>
          <AntDesign name="star" size={12} color="#FF7007" />
          <Text style={{fontSize: 10}}> 4.5 </Text>
        </View>
        <View style={styles.experienceWrapper}>
          <Text style={{fontSize: 10}}>Experience {experience} years</Text>
        </View>
        <View style={styles.nameWrapper}>
          <Text style={styles.nameText}>{name}</Text>
        </View>
        <View style={styles.languageWrapper}>
          <Text style={styles.languageText}>{languages}</Text>
        </View>
        <View style={styles.categoryWrapper}>
          <Text style={styles.categoryText}>Marriage Health</Text>
        </View>
        <View style={styles.priceWrapper}>
          <Text style={styles.priceText}>
            {'\u20B9'}
            {price}
          </Text>
        </View>
        <View style={styles.bottomButtonsWrapper}>
          <PrimaryButton
            fullButton={false}
            width="100%"
            customCls={styles.chatButton}>
            <Ionicons name="chatbox-ellipses-outline" size={18} color="white" />
          </PrimaryButton>
          <PrimaryButton
            fullButton={false}
            width="100%"
            customCls={styles.callButton}>
            <Ionicons name="call" size={18} color="white" />
          </PrimaryButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  trendingCardWrapper: {
    backgroundColor: COLORS.primary[100],
    borderRadius: 15,
    width: screenWidth / 2 - 8,
    height: 350,
    marginRight: 4,
    marginTop: 8,
  },
  imgContainer: {
    width: screenWidth / 2 - 8,
    height: '45%',
    backgroundColor: 'green',
    position: 'relative',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  astroDetailWrapper: {
    paddingTop: 18,
    paddingHorizontal: 8,
  },
  onlineWrapper: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    borderRadius: 2,
    paddingHorizontal: 2,
    paddingVertical: 1,
  },
  starWrapper: {
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '#fff',
    paddingHorizontal: 8,

    paddingVertical: 2,
    top: -12,
    left: 5,
  },
  experienceWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    borderRadius: 4,
    paddingVertical: 4,
    top: -12,
    right: 5,
    fontSize: 10,
  },
  nameWrapper: {
    marginBottom: 12,
  },
  nameText: {
    color: '#000',
    fontSize: 20,
  },
  languageWrapper: {
    marginBottom: 8,
  },
  languageText: {color: '#767680'},
  categoryText: {color: '#000'},
  categoryWrapper: {
    marginBottom: 8,
  },
  priceWrapper: {
    marginBottom: 12,
  },
  priceText: {
    fontSize: 15,
  },
  chatButton: {
    borderRadius: 0,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: '#FF8D3A',
  },
  callButton: {
    borderRadius: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  bottomButtonsWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TrendingCard;
