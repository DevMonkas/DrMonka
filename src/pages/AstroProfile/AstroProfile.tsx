import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Badge from '../../components/atoms/Badge/Badge';
import TabView from '../../components/Molecules/TabView/TabView';
import {COLORS, FONTS} from '../../constants/theme';
import {Doctor} from '../../types/ExternalModel.model';
const {width: screenWidth} = Dimensions.get('window');

export default function doctorProfile({navigation, route}: any) {
  const doctorInfo: Doctor = route.params.doctorInfo;
  console.log(doctorInfo.languages_known);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileImageWrapper}>
          <Image
            source={{
              uri: doctorInfo.image,
            }}
            style={{
              width: screenWidth / 3 - 15,
              height: screenWidth / 3 - 15,
              borderRadius: 300,
            }}
          />
        </View>
        <View style={styles.infoContainer}>
          {/* <View style={styles.ratingsWrapper}>
            <View style={{flexDirection: 'row', marginRight: 0.5}}>
              {[1, 2, 3, 4, 5].map((item, index) => {
                return <AntDesign name="star" size={15} color="#FF7007" />;
              })}
            </View>
          </View>
          <View style={styles.consultCountWrapper}>
            <Text style={[styles.consultCount, {fontWeight: 'bold'}]}>
              1000+{' '}
            </Text>
            <Text style={styles.consultCount}>consults</Text>
          </View> */}
          <View style={styles.doctorNameWrapper}>
            <Text style={[styles.doctorName, FONTS.secondaryFam]}>
              {doctorInfo.name}
            </Text>
          </View>

          <View style={styles.languagesWrapper}>
            <Text style={[styles.languages, FONTS.secondaryFam]}>
              Male ' 26 years
              {/* {doctorInfo.languages_known?.join(',')} */}
            </Text>
          </View>
          {/* <View style={styles.specializationWrapper}>
            <Text style={styles.specialization}>
              {doctorInfo.expertise?.join(',')}
            </Text>
          </View> */}
        </View>
      </View>
      <View style={styles.badgeWrapper}>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
          showsHorizontalScrollIndicator={false}>
          <Badge icon="M" content="Love/Marriage" />
          <Badge icon="H" content="Health" />
          <Badge icon="R" content="Money" />
        </ScrollView>
      </View>
      <View
        style={[
          {
            backgroundColor: 'purple',
            flex: 1,
            width: '100%',
            flexDirection: 'row',
          },
          styles.tabViewContainer,
        ]}>
        <TabView></TabView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  bottom: {
    backgroundColor: 'yellow',
  },
  header: {
    backgroundColor: COLORS.primary[100],
    paddingTop: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  profileImageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth / 3 - 15 + 20,
    backgroundColor: '#E2EBFF',
    borderRadius: 300,
    elevation: 10,
    borderWidth: 10,
    borderColor: '#E2EBFF',
  },
  infoContainer: {
    alignItems: 'center',
    position: 'relative',
    top: 10,
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  ratingsWrapper: {
    marginBottom: 8,
  },
  doctorNameWrapper: {
    marginBottom: 10,
  },
  doctorName: {color: COLORS.primary[500], fontSize: 25, fontWeight: 'bold'},
  languagesWrapper: {
    marginBottom: 8,
  },
  consultCount: {
    color: COLORS.primary[500],
    fontSize: 14,
  },
  consultCountWrapper: {
    marginBottom: 12,
    flexDirection: 'row',
  },
  languages: {
    color: '#8C8C8C',
    fontSize: 15,
  },
  specialization: {
    color: '#8C8C8C',
    fontSize: 12,
  },
  specializationWrapper: {
    marginBottom: 24,
  },
  tabWrapper: {
    flex: 1,
  },
  badgeWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 5,
    paddingTop: '5%',
  },
  textContent: {
    color: '#000',
  },
  tabViewContainer: {
    position: 'relative',
    flex: 1,
  },
});
