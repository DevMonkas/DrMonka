import React, {Component, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {SIZES} from '../../constants/theme';
import {calls} from '../../shared/Data';

export default function TransactionHistory() {
  const [transaction, setTransactions] = useState(calls);
  const renderIcon = (addMoney: string, amount: string) => {
    if (addMoney === 'complete') {
      return (
        <>
          <AntDesign
            name="plus"
            size={15}
            color="green"
            style={{marginRight: 5}}
          />
          <FontAwesome name="rupee" size={20} color="green" />
          <Text style={{color: 'green'}}>{amount}</Text>
        </>
      );
    } else if (addMoney === 'failed') {
      return (
        <>
          <AntDesign
            name="minus"
            size={15}
            color="#ff0000"
            style={{marginRight: 5}}
          />
          <FontAwesome name="rupee" size={20} color="#ff0000" />
          <Text style={{color: '#ff0000'}}>{amount}</Text>
        </>
      );
    } else {
      return (
        <>
          <AntDesign name="exclamation" size={20} color="#FF7707" />
          <FontAwesome name="rupee" size={20} color="#ff7707" />
          <Text style={{color: '#ff7707'}}>{amount}</Text>
        </>
      );
    }
  };

  const renderStatusIcon = (transactionStatus: string) => {
    if (transactionStatus === 'complete') {
      return <AntDesign name="checkcircle" size={30} color="green" />;
    } else if (transactionStatus === 'failed') {
      return <Entypo name="circle-with-cross" size={30} color="red" />;
    } else {
      return <Entypo name="dots-three-horizontal" size={30} color="#ff7707" />;
    }
  };

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity>
        <View
          style={[
            styles.row,
            {marginBottom: 10, paddingVertical: 20, borderRadius: 10},
          ]}>
          {renderStatusIcon(item.status)}
          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>{item.status}</Text>
            </View>
            <View style={styles.end}>
              <Text style={[styles.time, {marginLeft: 15}]}>
                {item.date} {item.time}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              position: 'relative',
              left: -SIZES.width / 20,
            }}>
            {renderIcon(item.status, item.amount)}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, width: '98%'}}>
      <FlatList
        extraData={setTransactions}
        data={transaction}
        keyExtractor={item => {
          return item.id;
        }}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#dcdcdc',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  pic: {
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 270,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  end: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontWeight: '400',
    color: '#666',
    fontSize: 12,
  },
  icon: {
    height: 28,
    width: 28,
  },
});
