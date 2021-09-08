import React, {createContext} from 'react';
import {useState} from 'react';
import {boolean} from 'yargs';
import {User} from '../types/ExternalModel.model';

export const AuthContext = createContext<[User, any]>([
  {
    id: '',
    phone: '',
    name: '',
    dob: '',
    gender: '',
  },
  () => {},
]);

export const AuthProvider = (props: any) => {
  const [user, setUser] = useState<User>({
    id: '',
    phone: '',
    name: '',
    dob: '',
    gender: '',
  });
  return (
    <AuthContext.Provider value={[user, setUser]}>
      {props.children}
    </AuthContext.Provider>
  );
};
