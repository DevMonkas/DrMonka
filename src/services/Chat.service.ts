import axios, {AxiosResponse} from 'axios';
import firebase from 'firebase';
import {socket} from '../shared/SocketConnection';
import {Conversations} from '../types/ExternalModel.model';
import {Environment} from '../utils/Environment';

export const getAllConversations = () => {
  return axios.get<Conversations[]>(
    Environment.BASE_URL + '/chat/getAllConsultations',
  );
};
export const startConsultation = async (
  userPhone: string,
  doctorPhone: string,
) => {
  let soc = await socket();
  soc.emit('joinServer', {
    roomId: `${userPhone}_${doctorPhone}`,
    phone: '8939336693',
  });
};
export const sendMessage = async (
  userPhone: string,
  doctorPhone: string,
  message: string,
) => {
  let soc = await socket();
  soc.emit('message', {
    roomId: `${userPhone}_${doctorPhone}`,
    payload: {
      userPhone: userPhone,
      doctorPhone: doctorPhone,
      to: doctorPhone,
      from: userPhone,
      message: message,
    },
  });
};
