import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import NotificationItem from '../../components/atoms/NotificationItem/NotificationItem';
export default function Notifications({content, icon}: any) {
  return (
    <View style={styles.Badgecontainer}>
      <View style={{flex: 1}}>
        <ScrollView>
          {[1, 2, 3, 4, 5, 6].map(() => (
            <NotificationItem />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Badgecontainer: {
    backgroundColor: '#FFEADB',
    flex: 1,
  },
});
