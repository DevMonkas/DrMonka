import React, {createContext, useEffect, useState} from 'react';
import {IMessage} from 'react-native-gifted-chat';
import socketio, {io, Socket} from 'socket.io-client';
import {DefaultEventsMap} from 'socket.io-client/build/typed-events';
import {Environment} from '../utils/Environment';
import {getIdTokenRefreshed} from '../utils/Utility';

export const socket = async () => {
  let token = await getIdTokenRefreshed();
  return io(Environment.BASE_URL, {
    auth: {
      token: token,
    },
  });
};
let sock: Socket = io('');
export const SocketContext =
  createContext<Socket<DefaultEventsMap, DefaultEventsMap>>(sock);
export const SocketProvider = (props: any) => {
  const [soc, setSoc] = useState<Socket>(io(''));
  useEffect(() => {
    socket().then(data => {
      setSoc(data);
    });
  }, []);

  useEffect(() => {
    console.log('IN provider App tsx');
    soc.on('message', data => {
      console.log('HONEY SINGHH in provider!!');
      let message: IMessage = {
        _id: Math.round(Math.random() * 1000000),
        createdAt: data.created_at,
        system: data.system,
        text: data.message,
        user: {
          _id: 2,
          name: 'route?.params.userName',
          avatar: 'route?.params.img',
        },
      };
      // setMessages((previousMessages: any) =>
      //   GiftedChat.append(previousMessages, [message]),
      // );
    });
  }, []);

  return (
    <SocketContext.Provider value={soc}>
      {props.children}
    </SocketContext.Provider>
  );
};
