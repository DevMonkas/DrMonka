import React, {createContext} from 'react';
import {useState} from 'react';
import {boolean} from 'yargs';

export const LoadingContext = createContext<[boolean, any]>([false, () => {}]);

export const LoadingProvider = (props: any) => {
  const [loading, setLoading] = useState(false);
  return (
    <LoadingContext.Provider value={[loading, setLoading]}>
      {props.children}
    </LoadingContext.Provider>
  );
};
