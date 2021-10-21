import axios, {AxiosResponse} from 'axios';
import {Environment} from '../utils/Environment';

export const createPaymentOrder = (amount: number) => {
  return axios.post(Environment.BASE_URL + '/wallet/createPaymentOrder', {
    amount: amount,
    phoneNumber: 8428370008,
  });
};

export const fetchWallet = () => {
  return axios.get(Environment.BASE_URL + '/wallet/getWalletMoney');
};
