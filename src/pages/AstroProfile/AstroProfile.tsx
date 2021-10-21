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
import {COLORS} from '../../constants/theme';
import {Doctor} from '../../types/ExternalModel.model';
const {width: screenWidth} = Dimensions.get('window');

export default function AstroProfile({navigation, route}: any) {
  const doctorInfo: Doctor = route.params.doctorInfo;
  console.log(doctorInfo.languages_known);

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.profileImageWrapper}>
        <Image
          source={{
            uri: doctorInfo.image,
          }}
          style={{
            width: screenWidth / 2 - 15,
            height: screenWidth / 2 - 15,
            borderRadius: 300,
          }}
        />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.ratingsWrapper}>
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
        </View>
        <View style={styles.astroNameWrapper}>
          <Text style={styles.astroName}>{doctorInfo.name}</Text>
        </View>

        <View style={styles.languagesWrapper}>
          <Text style={styles.languages}>
            {doctorInfo.languages_known?.join(',')}
          </Text>
        </View>
        <View style={styles.specializationWrapper}>
          <Text style={styles.specialization}>
            {doctorInfo.expertise?.join(',')}
          </Text>
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

    justifyContent: 'space-between',
  },
  bottom: {
    backgroundColor: 'yellow',
  },
  header: {
    backgroundColor: COLORS.primary[100],
    paddingVertical: 50,
    flex: 0.3,
    width: screenWidth + 100,
  },
  profileImageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E2EBFF',
    borderRadius: 300,
    position: 'relative',
    top: -screenWidth / 4,
    elevation: 10,
    borderWidth: 10,
    borderColor: '#E2EBFF',
  },
  infoContainer: {
    alignItems: 'center',
    position: 'relative',
    top: -screenWidth / 4 + 6,

    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  ratingsWrapper: {},
  astroNameWrapper: {
    marginBottom: 10,
  },
  astroName: {color: '#000', fontSize: 25, fontWeight: 'bold'},
  languagesWrapper: {
    marginBottom: 8,
  },
  consultCount: {
    color: '#7A7A7A',
    fontSize: 14,
  },
  consultCountWrapper: {
    marginBottom: 12,
    flexDirection: 'row',
  },
  languages: {
    color: '#8C8C8C',
    fontSize: 12,
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

    flexDirection: 'row',
    padding: 5,
  },
  textContent: {
    color: '#000',
  },
  tabViewContainer: {
    position: 'relative',
    top: -screenWidth / 4 + 6,
    flex: 1,
  },
});
