import React, {useState, useCallback, useEffect} from 'react';
import {View, Text} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import {SafeAreaView} from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ChatHead = () => {
  return (
    <SafeAreaView>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#2e64e5',
          flexDirection: 'row',
          paddingLeft: 10,
          justifyContent: 'space-between',
        }}>
        <FontAwesome5 name="chevron-left" size={25} color="#fff" />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <Text
            style={{
              fontSize: 22,
              textAlign: 'center',
              padding: 15,
              color: '#fff',
            }}>
            Shankar Hegde
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}>
          <View>
            <Ionicons name="call-outline" size={28} color="#fff" />
          </View>
          <View style={{marginLeft: 25, marginRight: 10}}>
            <AntDesign name="videocamera" size={28} color="#fff" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatHead;
