import axios, {AxiosResponse} from 'axios';
import {Environment} from '../utils/Environment';

export const createPaymentOrder = (amount: number) => {
  return axios.post(Environment.BASE_URL + '/wallet/createPaymentOrder', {
    amount: amount,
    phoneNumber: 8939336693,
  });
};

export const fetchWallet = () => {
  return axios.post(Environment.BASE_URL + '/wallet/getWalletMoney', {
    phoneNumber: 8939336693,
  });
};
