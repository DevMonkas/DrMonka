import axios, {AxiosResponse} from 'axios';
import firebase from 'firebase';
import {Conversations} from '../types/ExternalModel.model';
import {Environment} from '../utils/Environment';

export const getAllConversations = () => {
  return axios.get<Conversations[]>(
    Environment.BASE_URL + '/chat/getAllConsultations',
  );
};
