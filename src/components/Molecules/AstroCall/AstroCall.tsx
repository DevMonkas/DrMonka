import * as React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {
  StatusBar,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  GestureResponderEvent,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {ScreenStackHeaderBackButtonImage} from 'react-native-screens';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS, SIZES} from '../../../constants/theme';
import {startConsultation} from '../../../services/Chat.service';
import {getAllDoctors} from '../../../services/Doctor.service';
import {AuthContext} from '../../../shared/AuthProvider';
import {SocketContext} from '../../../shared/SocketProvider';
import {Doctor} from '../../../types/ExternalModel.model';

import SecondaryButton from '../../atoms/SecondaryButton/SecondaryButton';
import Footer from '../Footer/Footer';

const {width, height} = Dimensions.get('screen');

// const DATA = [...Array(10).keys()].map((_, i) => {
//   return {
//     key: i,
//     image: 'https://deadline.com/wp-content/uploads/2020/08/dr.-ian-smith.jpg',
//     name: 'Shankar Hegde',
//     languages: 'English,Hindi',
//     categories: 'Vedic,Numerology,Vastu',
//     experience: '10',
//     cpm: '38',
//     consultsCount: '1000',
//   };
// });

const SPACING = 20;
const AVATAR_SIZE = 100;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;
const searchFilterFunction = (text: string) => {};
export const AstroCall = ({navigation}: any) => {
  const [DATA, setDATA] = useState<Doctor[]>([]);
  const [user, setUser] = React.useContext(AuthContext);
  const soc = React.useContext(SocketContext);
  const fetchDoctorList = () => {
    getAllDoctors()
      .then(doctors => {
        console.log(doctors.data[0]);
        setDATA(doctors.data);
        // setDATA(astrologers.data);
      })
      .catch(err => {
        //Show Something
        console.error(err);
      });
  };
  useEffect(() => {
    fetchDoctorList();
  }, []);
  const callHandler = (event: GestureResponderEvent) => {
    event.stopPropagation();
    navigation.navigate('CallingScreen');
  };
  const checkandcreateConversation = (item: any) => {
    //if conversation exists in active conversations list then display prompt

    //else deduct balance and add a conversation on both doctor and user
    //navigate to chatList

    console.log(item);
    navigation.navigate('ChatList', {item});
    //send prompt to the respective doctor
  };
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const [refreshing, setRefreshing] = React.useState(false);
  const wait = (timeout: any) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    getAllDoctors()
      .then(doctors => {
        console.log(doctors.data[0]);
        setDATA(doctors.data);
        setRefreshing(false);
        // setDATA(astrologers.data);
      })
      .catch(err => {
        //Show Something
        console.error(err);
        setRefreshing(false);
      });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 0.09 * SIZES.height,
      }}>
      <Animated.FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={DATA}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        keyExtractor={(item: any) => item.phone}
        contentContainerStyle={{
          padding: SPACING / 2,
          paddingTop: StatusBar.currentHeight || 42,
        }}
        renderItem={({item, index}: any) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2),
          ];
          const OpacityinputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2),
          ];
          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 1],
          });
          const opacity = scrollY.interpolate({
            inputRange: OpacityinputRange,
            outputRange: [1, 1, 1, 1],
          });
          return (
            <TouchableOpacity
              key={index}
              onPress={(event: any) => {
                event.stopPropagation();
                navigation.navigate('AstrologerProfile', {doctorInfo: item});
              }}>
              <Animated.View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: SPACING / 3,
                  paddingVertical: SPACING,
                  marginBottom: SPACING,
                  borderRadius: 12,
                  borderWidth: 0.5,
                  borderColor: '#B6B6B6',
                  transform: [{scale}],
                  opacity,
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',

                    marginRight: SPACING / 2,
                  }}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 8,
                    }}>
                    <Image
                      source={{uri: item.image}}
                      style={{
                        width: AVATAR_SIZE,
                        height: AVATAR_SIZE,
                        borderRadius: AVATAR_SIZE,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    />
                  </View>
                  <View style={{marginBottom: 5}}>
                    <View style={{flexDirection: 'row', marginRight: 0.5}}>
                      {[1, 2, 3, 4, 5].map((item, index) => {
                        return (
                          <AntDesign name="star" size={15} color="#FF7007" />
                        );
                      })}
                    </View>
                  </View>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 10, color: 'gray'}}>
                      1000+ consults
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.astroDetailWrapper,
                    {marginLeft: SIZES.width / 16},
                  ]}>
                  <View style={styles.nameWrapper}>
                    <Text style={[styles.doctorName, FONTS.secondaryFam]}>
                      {item.name}
                    </Text>
                  </View>
                  <View style={styles.categoryWrapper}>
                    <Ionicons name="ribbon-outline" size={15} color="#B6B6B6" />
                    <Text style={{color: 'gray', fontSize: 12, marginLeft: 2}}>
                      {item.expertise.join(',')}
                    </Text>
                  </View>
                  <View style={styles.languageWrapper}>
                    <Ionicons name="ribbon-outline" size={15} color="#B6B6B6" />
                    <Text style={{color: 'gray', fontSize: 12, marginLeft: 2}}>
                      {item.languages_known.join(',')}
                    </Text>
                  </View>
                  <View style={styles.experienceWrapper}>
                    <Ionicons name="ribbon-outline" size={15} color="#B6B6B6" />
                    <Text style={{color: 'gray', fontSize: 12, marginLeft: 2}}>
                      DELHI
                    </Text>
                  </View>
                  {/* <View style={styles.cpmWrapper}>
                    <Ionicons name="ribbon-outline" size={15} color="#B6B6B6" />
                    <Text style={{color: 'gray', fontSize: 12, marginLeft: 2}}>
                      5/min
                    </Text>
                  </View> */}
                  <SecondaryButton
                    text="START CONSULTATION"
                    onPress={() => {
                      startConsultation(soc, '8939336693', item.phone, true);
                    }}
                  />
                  {/* </View> */}
                </View>
              </Animated.View>
            </TouchableOpacity>
          );
        }}
      />
      <Footer></Footer>
    </View>
  );
};

const styles = StyleSheet.create({
  astroDetailWrapper: {},
  nameWrapper: {
    marginBottom: 8,
  },
  categoryWrapper: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  cpmWrapper: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  experienceWrapper: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  languageWrapper: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  doctorName: {
    fontSize: 22,
    color: COLORS.primary[500],
    fontWeight: 'bold',
  },
});
