import React from 'react';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import GenericOptionCard from '../../atoms/GenericOptionCard/GenericOptionCard';

export default function GenericOptionList({DATA}: any) {
  const renderItem = ({item}: any) => (
    <GenericOptionCard content={item.title} />
  );
  return (
    <View style={styles.container}>
      {DATA.map((item: any) => {
        return <GenericOptionCard content={item.title} id={item.id} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    backgroundColor: '#fff',
    width: '95%',
    marginLeft: '2.5%',
    paddingHorizontal: 12,
    paddingVertical: 5.5,
    borderRadius: 15,
    justifyContent: 'space-between',
  },
});
