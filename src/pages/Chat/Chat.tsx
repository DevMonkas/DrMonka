import React, {useState, useCallback, useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import ChatHead from './ChatHead';
import {socket} from '../../shared/SocketConnection';
import PrimaryButton from '../../components/atoms/PrimaryButton/PrimaryButton';
import {COLORS} from '../../constants/theme';
import Feather from 'react-native-vector-icons/Feather';
const Chat = ({navigation, route}: any) => {
  const [messages, setMessages] = useState<any>([]);
  useEffect(() => {
    socket.on('connection-success', (success: any) => {
      console.log('success', socket.id);
    });
    const otherUser = {
      _id: 2,
      name: route?.params.userName,
      avatar: route?.params.img,
    };
    const currentUser = {
      _id: 1,
      name: 'React Native',
      avatar: 'https://placeimg.com/140/140/any',
    };

    setMessages([
      // {
      //   _id: 1,
      //   text: 'Hello developer',
      //   createdAt: new Date(),
      //   user: currentUser,
      // },
      // {
      //   _id: 2,
      //   text: 'Hello World',
      //   createdAt: new Date(),
      //   user: otherUser,
      // },
      // {
      //   _id: 3,
      //   text: 'Hello World',
      //   createdAt: new Date(),
      //   user: otherUser,
      // },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    console.log('chal ja bhai');
    setMessages((previousMessages: any) =>
      GiftedChat.append(previousMessages, messages),
    );
    console.log('MASSAGES', messages);
  }, []);

  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: COLORS.primary[400],
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const renderSend = (sendProps: any) => {
    const {text, messageIdGenerator, user, onSend} = sendProps;
    return (
      <TouchableOpacity
        onPress={() => {
          if (text && onSend) {
            onSend(
              {text: text.trim(), user: user, _id: messageIdGenerator()},
              true,
            );
          }
        }}
        style={{
          height: '100%',
          width: '10%',
          justifyContent: 'center',
        }}>
        <Feather name="send" size={28} color={COLORS.primary[500]} />
      </TouchableOpacity>
    );
  };

  return (
    <>
      {/* <ChatHead userName={route.params?.userName} img={route.params?.img} /> */}
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderBubble={renderBubble}
        alwaysShowSend
        scrollToBottom
        messagesContainerStyle={{backgroundColor: 'white'}}
        renderSend={renderSend}
      />
    </>
  );
};

export default Chat;
