import axios from 'axios';
import auth from '@react-native-firebase/auth';
import {getIdTokenRefreshed} from '../utils/Utility';
import {LoadingContext} from '../shared/LoadingProvider';
import {useContext} from 'react';
export const requestInterceptor = (setLoading: (value: boolean) => void) =>
  axios.interceptors.request.use(
    async req => {
      try {
        let token: string = await getIdTokenRefreshed();
        req.headers.authorization = token;
      } catch (err) {}
      setLoading(true);
      return req;
    },
    err => {
      setLoading(false);
      return Promise.reject(err);
    },
  );

export const responseInterceptor = (setLoading: (value: boolean) => void) =>
  axios.interceptors.response.use(
    res => {
      setLoading(false);
      return res;
    },
    err => {
      setLoading(false);
      return Promise.reject(err?.response?.error);
    },
  );
