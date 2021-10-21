import React, {createContext, useEffect, useState} from 'react';
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

  return (
    <SocketContext.Provider value={soc}>
      {props.children}
    </SocketContext.Provider>
  );
};
