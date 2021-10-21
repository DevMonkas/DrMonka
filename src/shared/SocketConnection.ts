import io from 'socket.io-client';
import {Environment} from '../utils/Environment';
import {getIdTokenRefreshed} from '../utils/Utility';

const socket = async () => {
  let token = await getIdTokenRefreshed();
  return io(Environment.BASE_URL, {
    auth: {
      token: token,
    },
  });
};
export {socket};
