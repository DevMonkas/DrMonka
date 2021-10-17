import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getAllConversations} from '../../services/Chat.service';
import {Conversations} from '../../types/ExternalModel.model';
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from './ChatStyles';

const Messages = [
  {
    id: '1',
    userName: 'Arnab Ray',
    userImg: {
      uri: 'https://avatars.githubusercontent.com/u/26869021?v=4',
    },
    messageTime: '4 mins ago',
    messageText: 'Hey there!!',
  },
  {
    id: '2',
    userName: 'Martin Garrix',
    userImg: {
      uri: 'https://dt7v1i9vyp3mf.cloudfront.net/styles/header/s3/imagelibrary/M/Martin_Garrix_01-CghHta.FGCgKJEBQDppftF8jZXaEBeQu.jpg',
    },
    messageTime: '2 hours ago',
    messageText: "Don't Look Down.",
  },
  {
    id: '3',
    userName: 'Anany Chitranshi',
    userImg: {
      uri: 'https://media-exp1.licdn.com/dms/image/C4D03AQF2h4W224bJvA/profile-displayphoto-shrink_800_800/0/1623572699841?e=1639008000&v=beta&t=0pM57LgS4--PW_uarDNqjf6OeYLmQr_udy2VT-0ql_U',
    },
    messageTime: '1 hour ago',
    messageText: 'Wassup?',
  },
  {
    id: '4',
    userName: 'Doctor Strange',
    userImg: {
      uri: 'https://www.nme.com/wp-content/uploads/2020/04/Doctor-Strange-2-696x441.jpg',
    },
    messageTime: '1 day ago',
    messageText: 'Dormamu! I have come to bargain ',
  },
];

const MessagesScreen = ({navigation, route}: any) => {
  const [conversations, setConversations] = useState<Conversations[]>([]);
  useEffect(() => {
    const docInfo = route?.params?.item;
    if (docInfo) {
      Messages.unshift({
        id: '101',
        userImg: {uri: docInfo.image},
        userName: docInfo.name,
        messageTime: '1 day ago',
        messageText: 'Dormamu! I have come to bargain ',
      });
    }
    getAllConversations()
      .then(data => {
        setConversations(data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return (
    <Container>
      <FlatList
        data={conversations}
        keyExtractor={item => item._id!}
        renderItem={({item}) => (
          <Card
            onPress={() =>
              navigation.navigate('Chat', {
                userName: item.name,
                img: item.image,
              })
            }>
            <UserInfo>
              <UserImgWrapper>
                <UserImg source={{uri: item.image}} />
              </UserImgWrapper>
              <TextSection>
                <UserInfoText>
                  <UserName>{item.name}</UserName>
                  <PostTime>{'12:00 PM'}</PostTime>
                </UserInfoText>
                <MessageText>{'On Going'}</MessageText>
              </TextSection>
            </UserInfo>
          </Card>
        )}
      />
    </Container>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 200,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
