import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
export default function Badge({content, icon}: any) {
  return (
    <View style={styles.Badgecontainer}>
      <View style={styles.iconWrapper}>
        {icon === 'H' && (
          <FontAwesome name="heartbeat" size={20} color="#F08A8C" />
        )}
        {icon === 'R' && <FontAwesome name="rupee" size={20} color="#7FAC31" />}
        {icon === 'M' && (
          <MaterialCommunityIcons name="ring" size={20} color="#FFB949" />
        )}
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.textContent}>{content}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Badgecontainer: {
    backgroundColor: '#FFF8F2',
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 25,
    marginRight: 8,
  },
  iconWrapper: {
    marginRight: 8,
  },
  textWrapper: {},
  textContent: {
    color: '#000',
    fontSize: 12,
  },
});
