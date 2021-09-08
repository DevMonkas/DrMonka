import React from 'react';
import axios from 'axios';
import {GestureResponderEvent, StyleSheet, Text, View} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SecondaryButton from '../../atoms/SecondaryButton/SecondaryButton';
import {Avatar} from 'react-native-elements';

const Call_chat_card = (props: {
  name: any;
  fields: string[];
  experience: any;
  rate: any;
  languages_known: string[];
  phone: string;
  navigation?: any;
}) => {
  const clickHandler = async () => {
    const body = {phone: props.phone};
    // const response = await axios.post(
    //   "http://e713cb013049.ngrok.io/calling/callAstrologer",

    //   body // body data type must match "Content-Type" header
    // );
  };
  const callHandler = (event: GestureResponderEvent) => {
    event.stopPropagation();
    props.navigation.navigate('CallingScreen');
  };
  return (
    // <View>
    // <Box style={styles.container}>
    <View style={[styles.container, {flexDirection: 'row'}]}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Avatar
          source={{
            uri: 'https://avatars.githubusercontent.com/u/40920084?v=4',
          }}
        />
        <View style={{padding: 2}}>
          {[1, 2, 3, 4, 5].map((item, index) => {
            return <FontAwesome name="blog" size={24} color="white" />;
          })}
        </View>
      </View>
      <View style={{justifyContent: 'space-between'}}>
        <View style={styles.title}>
          <Text>{props.name}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          <Ionicons
            name="ribbon"
            size={3}
            color="#616161"
            style={{marginTop: 1}}
          />
          <Text style={styles.subtitle}>{props.fields.join(',')}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Ionicons
            name="chatbubbles"
            size={3}
            color="#616161"
            style={{marginTop: 1}}
          />
          <Text style={styles.subtitle}>{props.languages_known.join(',')}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <FontAwesome
            name="graduation-cap"
            size={3}
            color="#616161"
            style={{marginTop: 1}}
          />
          <Text style={styles.subtitle}>
            {props.experience} years experience
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Ionicons
            name="cash"
            size={3}
            color="#616161"
            style={{marginTop: 1}}
          />
          <Text style={styles.subtitle}>{props.rate}/min</Text>
        </View>
      </View>
      <View style={{justifyContent: 'flex-end'}} onTouchEnd={callHandler}>
        <SecondaryButton text="Call" onPress={clickHandler} />
      </View>
    </View>
    // </Box>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
    padding: 12,
    paddingLeft: 0,
    backgroundColor: '#FFFFFF',
    shadowColor: '#CCCCCC',
    borderRadius: 6,
    width: '100%',
  },
  title: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
    marginBottom: 5,
  },
  subtitle: {
    color: '#616161',
    fontSize: 13,
    marginLeft: 5,
    marginBottom: 5,
    marginRight: 2,
  },
});

export default Call_chat_card;
