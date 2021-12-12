import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import NotificationItem from '../../components/atoms/NotificationItem/NotificationItem';
export default function Notifications({content, icon}: any) {
  return (
    <View style={styles.Badgecontainer}>
      <View style={{flex: 1}}>
        <ScrollView>
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <TouchableOpacity key={index}>
              <NotificationItem />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Badgecontainer: {
    backgroundColor: 'white',
    flex: 1,
  },
});
