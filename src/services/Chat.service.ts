import axios, {AxiosResponse} from 'axios';
import firebase from 'firebase';
import {useContext} from 'react';
import {Socket} from 'socket.io-client';
import {AuthContext} from '../shared/AuthProvider';
import {GlobaluserObj} from '../shared/Globals';

import {Conversations, Message} from '../types/ExternalModel.model';
import {Environment} from '../utils/Environment';

export const getAllConversations = () => {
  return axios.get<Conversations[]>(
    Environment.BASE_URL + '/chat/getAllConsultations',
  );
};

export const fetchAllMessages = () => {
  let data = {
    userPhone: GlobaluserObj.phone,
    doctorPhone: GlobaluserObj.selectedPhone,
  };

  return axios.get<any[]>(Environment.BASE_URL + '/chat/getChatsWithDoctor', {
    params: data,
  });
};
export const startConsultation = async (
  soc: Socket,
  userPhone: string,
  doctorPhone: string,
  newConsulation = false,
) => {
  soc.emit('joinServer', {
    roomId: `${userPhone}_${doctorPhone}`,
    phone: userPhone,
  });
  if (newConsulation) {
    sendMessage(
      soc,
      userPhone,
      doctorPhone,
      `Consulatation started at ${new Date()}`,
      true,
    );
    console.log(`joined room ${userPhone}_${doctorPhone}`);
  }
};
export const sendMessage = async (
  soc: Socket,
  userPhone: string,
  doctorPhone: string,
  message: string,
  system: boolean = false,
) => {
  console.log('message gaya=>', userPhone, doctorPhone);
  soc.emit('message', {
    roomId: `${userPhone}_${doctorPhone}`,
    payload: {
      userPhone: userPhone,
      doctorPhone: doctorPhone,
      to: doctorPhone,
      from: userPhone,
      message: message,
      system: system,
    },
  });
};

export const listenMessage = async (soc: Socket) => {
  let message: Message;
  console.log('YOUTSIDE');
  soc.on('message', data => {
    console.log('YAYAYA');
    (message._id = '1'), (message.createdAt = data.created_at);
    message.system = data.system;
    message.text = data.message;
  });
  /**
   * {"created_at": "Sun, 17 Oct 2021 11:46:32 GMT",
   * "doctorPhone": "8939336694",
   * "from": "8939336693",
   * "message": "hi",
   * "system": false,
   * "to": "8939336694",
   * "userPhone": "8939336693"}
   */
};
