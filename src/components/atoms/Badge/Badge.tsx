import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, FONTS} from '../../../constants/theme';
export default function Badge({content, icon}: any) {
  return (
    <View style={styles.Badgecontainer}>
      <View style={styles.iconWrapper}>
        {icon === 'H' && (
          <FontAwesome name="heartbeat" size={20} color="white" />
        )}
        {icon === 'R' && <FontAwesome name="rupee" size={20} color="white" />}
        {icon === 'M' && (
          <MaterialCommunityIcons name="ring" size={20} color="white" />
        )}
      </View>
      <View style={styles.textWrapper}>
        <Text style={[styles.textContent, FONTS.secondaryFam]}>{content}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Badgecontainer: {
    backgroundColor: COLORS.primary[400],
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
    color: 'white',
    fontSize: 12,
  },
});
