// import AsyncStorage from "@react-native-async-storage/async-storage";

import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, View, Text} from 'react-native';
import {useContext} from 'react';
import {AuthContext} from '../../../shared/AuthProvider';
import {COLORS} from '../../../constants/theme';

export default function ProfileTop({navigation}: any) {
  const [user, setUser] = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <View style={styles.userIcon}>
        <FontAwesome name="user" size={62} color={COLORS.primary[500]} />
      </View>

      <View
        style={styles.editButtonWrapper}
        onTouchEnd={() => navigation.navigate('SignUp')}>
        <Text style={{color: COLORS.primary[500]}}>Edit</Text>
      </View>
      <View style={styles.userDetailsWrapper}>
        <View style={styles.userName}>
          <Text style={styles.userNamestring}>{user.name}</Text>
        </View>
        <View style={styles.userPhone}>
          <Text style={styles.phoneNumberstring}>{user.phone}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.4,
    flexDirection: 'row',
    backgroundColor: COLORS.primary[100],
    alignItems: 'center',
    paddingLeft: 25,
    position: 'relative',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  editButtonWrapper: {
    paddingHorizontal: 18,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: COLORS.primary[500],
    borderRadius: 20,
    position: 'absolute',
    top: 30,
    right: 0,
    marginRight: 15,
    marginTop: 20,
  },

  userDetailsWrapper: {
    marginTop: -14,
  },
  userNamestring: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary[500],
  },

  userName: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  userPhone: {},
  phoneNumberstring: {
    fontWeight: '800',
    color: COLORS.primary[500],
  },
  userIcon: {
    backgroundColor: '#fff',
    borderRadius: 100,
    width: 90,
    height: 90,
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
});
