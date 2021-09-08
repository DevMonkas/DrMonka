import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import ProfileTop from '../../components/atoms/ProfileTop/ProfileTop';
import WalletCard from '../../components/atoms/WalletCard/WalletCard';
import GenericOptionList from '../../components/Molecules/GenericOptionList/GenericOptionList';

export default function ProfileSettings({navigation}: any) {
  const DATA1 = [
    {id: 0, title: 'My Past Consultants'},
    {id: 1, title: 'Rate Top Astro'},
    {id: 2, title: 'Help/Support'},
  ];
  const DATA2 = [
    {id: 0, title: 'Share Top Astro'},
    {id: 1, title: 'Logout'},
  ];
  return (
    <View style={styles.container}>
      <ProfileTop navigation={navigation} />
      <WalletCard></WalletCard>
      <ScrollView style={{flex: 1}}>
        <GenericOptionList DATA={DATA1}></GenericOptionList>
        <GenericOptionList DATA={DATA2}></GenericOptionList>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
});
