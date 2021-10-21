import React, {createContext, useEffect} from 'react';
import {useState} from 'react';
import {boolean} from 'yargs';
import {fetchWallet} from '../services/Wallet.service';
import {User} from '../types/ExternalModel.model';

export const AuthContext = createContext<[User, any]>([
  {
    _id: '',
    phone: '',
    name: '',
    dob: '',
    gender: '',
    balance: -1,
  },
  () => {},
]);

export const AuthProvider = (props: any) => {
  const [user, setUser] = useState<User>({
    _id: '',
    phone: '',
    name: '',
    dob: '',
    gender: '',
    balance: -1,
  });
  return (
    <AuthContext.Provider value={[user, setUser]}>
      {props.children}
    </AuthContext.Provider>
  );
};
