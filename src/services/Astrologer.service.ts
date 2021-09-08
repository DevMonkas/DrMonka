import axios, {AxiosResponse} from 'axios';
import firebase from 'firebase';
import {Astrologer} from '../types/ExternalModel.model';
import {Environment} from '../utils/Environment';

export const getAllAstrologers = () => {
  return axios.get<Astrologer[]>(
    Environment.BASE_URL + '/astrologers/getAllAstrologers',
  );
};
