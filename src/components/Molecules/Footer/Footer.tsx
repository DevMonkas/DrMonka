import React, {useState} from 'react';
import {Text, StyleSheet, View, Pressable} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Divider} from 'react-native-elements';

export default function Footer() {
  return (
    <View
      style={[
        styles.container,
        {flexDirection: 'row'},
        {borderTopColor: 'grey', borderTopWidth: 1},
      ]}>
      <Pressable
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-evenly',
          flexDirection: 'row',
        }}>
        <FontAwesome name="sort-amount-desc" size={17}></FontAwesome>
        <Text>SORT</Text>
      </Pressable>
      <Divider
        style={{
          backgroundColor: '#EFEFEF',
          width: 2.5,
          alignSelf: 'center',
          height: 40,
        }}
      />
      <Pressable
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-evenly',
          flexDirection: 'row',
        }}>
        <SimpleLineIcons name="equalizer" size={17}></SimpleLineIcons>
        <Text>FILTER</Text>
      </Pressable>
      <Divider
        style={{
          backgroundColor: '#EFEFEF',
          width: 2.5,
          alignSelf: 'center',
          height: 40,
        }}
      />
      <Pressable
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-evenly',
          flexDirection: 'row',
        }}>
        <AntDesign name="search1" size={17}></AntDesign>
        <Text>SEARCH</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 65,
    backgroundColor: 'white',
  },
});
