import io from 'socket.io-client';

const socket = io.connect('https://chat-qivihealth.herokuapp.com/');
export {socket};
