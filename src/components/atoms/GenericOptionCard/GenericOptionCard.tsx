import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {StyleSheet, Text, View} from 'react-native';
import appTheme from '../../../constants/theme';
export default function GenericOptionCard({
  customCls,
  content = 'My Past Consultants',
  showIcon = true,
}: any) {
  return (
    <View style={[styles.container, customCls]}>
      <View style={styles.LeftWrapper}>
        {
          <View style={styles.iconWrapper}>
            <AntDesign name="wallet" size={24} color="#FF740F" />
          </View>
        }
        <View style={styles.contentWrapper}>
          <Text style={[styles.content, appTheme.FONTS.secondaryFam]}>
            {content}
          </Text>
        </View>
      </View>
      <View style={styles.RightArrowWrapper}>
        <AntDesign name="right" size={18} color="black" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 85,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  LeftWrapper: {
    flexDirection: 'row',
  },
  iconWrapper: {
    backgroundColor: 'rgba(255, 112, 7, 0.1)',
    borderRadius: 6,
    padding: 4,
    marginRight: 22,
  },
  contentWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    color: '#303030',
    fontSize: 14,
    fontWeight: '500',
  },
  RightArrowWrapper: {},
});
