import axios, {AxiosResponse} from 'axios';
import firebase from 'firebase';
import {Environment} from '../utils/Environment';

export const checkAuth = (refreshedToken: string) => {
  return axios.post(Environment.BASE_URL + '/users/checkAuth', {
    authorization: refreshedToken,
  });
};

export const updateUser = (userDetails: any) => {
  return axios.post(Environment.BASE_URL + '/users/updateUser', {
    ...userDetails,
  });
};
