import axios, {AxiosResponse} from 'axios';
import firebase from 'firebase';
import {Doctor} from '../types/ExternalModel.model';
import {Environment} from '../utils/Environment';

export const getAllDoctors = () => {
  return axios.get<Doctor[]>(Environment.BASE_URL + '/doctors/getAllDoctors');
};
