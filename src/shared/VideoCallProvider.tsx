import React, {createContext, useContext, useEffect} from 'react';
import {useState} from 'react';
import {Alert} from 'react-native';
import {
  mediaDevices,
  MediaStream,
  RTCIceCandidate,
  RTCIceCandidateType,
  RTCPeerConnection,
  RTCSessionDescription,
  RTCSessionDescriptionType,
} from 'react-native-webrtc';
import {boolean} from 'yargs';
import {fetchWallet} from '../services/Wallet.service';
import {User} from '../types/ExternalModel.model';
import {SocketContext} from './SocketProvider';

const pc_config = {
  iceServers: [
    {
      urls: [
        'turn:13.250.13.83:3478?transport=udp',
        'stun:stun1.l.google.com:19302',
        'stun:stun2.l.google.com:19302',
      ],
      username: 'YzYNCouZM1mhqhmseWk6',
      credential: 'YzYNCouZM1mhqhmseWk6',
    },
    {
      url: 'turn:numb.viagenie.ca',
      credential: 'muazkh',
      username: 'webrtc@live.com',
    },
    {
      url: 'turn:192.158.29.39:3478?transport=udp',
      credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
      username: '28224511:1379330808',
    },
    {
      url: 'turn:192.158.29.39:3478?transport=tcp',
      credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
      username: '28224511:1379330808',
    },
    {
      url: 'turn:turn.bistri.com:80',
      credential: 'homeo',
      username: 'homeo',
    },
    {
      url: 'turn:turn.anyfirewall.com:443?transport=tcp',
      credential: 'webrtc',
      username: 'webrtc',
    },
    // {
    //   urls : 'stun:stun.l.google.com:19302'
    // }
  ],
};
export const VideoCallContext = createContext<any>({
  peerConnection: null,
  localStream: null,
  remoteStream: null,
  initialize: () => {},
  toggleMic: () => {},
  toggleVideo: () => {},
  toggleCamera: () => {},
  endCall: () => {},
  createOffer: () => {},
  createAnswer: () => {},
  onCall: false,
  callEnded: false,
  setOnCall: () => {},
  setCallEnded: () => {},
  roomId: '',
  callStatus: '',
  mic: true,
  video: true,
});

export const VideoCallProvider = (props: any) => {
  const soc = useContext(SocketContext);
  const [onCall, setOnCall] = useState<boolean>(false);
  const [callEnded, setCallEnded] = useState<boolean>(false);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  let roomId = '';
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  const [peerConnection, setPeerConnection] = useState<any>(
    //@ts-ignore
    new RTCPeerConnection(pc_config),
  );
  const [callStatus, setCallStatus] = useState<string>('');
  const [mic, setMic] = useState(true);
  const [video, setVideo] = useState(true);
  const sendToPeer = (messageType: string, payload: any) => {
    soc.emit(messageType, {
      roomId: roomId,
      payload,
    });
  };
  const startMedia = () => {
    return new Promise<any>((resolve, reject) => {
      let isFront = true;
      mediaDevices.enumerateDevices().then(async sourceInfos => {
        let videoSourceId;
        for (let i = 0; i < sourceInfos.length; i++) {
          const sourceInfo = sourceInfos[i];
          if (
            sourceInfo.kind == 'videoinput' &&
            sourceInfo.facing == (isFront ? 'front' : 'environment')
          ) {
            videoSourceId = sourceInfo.deviceId;
          }
        }

        const constraints = {
          audio: true,
          video: {
            mandatory: {
              minWidth: 1280,
              minHeight: 720,
              minFrameRate: 30,
            },
            facingMode: isFront ? 'user' : 'environment',
            optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
          },
        };

        try {
          // @ts-ignore
          let success = await mediaDevices.getUserMedia(constraints);
          resolve(success);
        } catch (err) {
          reject(err);
        }
      });
    });
  };
  const initialize = () => {
    soc.on('connection-success', (success: any) => {});

    soc.on('offerOrAnswer', (data: any) => {
      setOnCall(true);
      setCallEnded(false);
      let sdp = data.payload;
      console.log('offerOrAnswer', data.roomId);
      roomId = data.roomId;
      peerConnection.setRemoteDescription(new RTCSessionDescription(sdp));
      if (sdp.type == 'answer') return;
      Alert.alert(
        'New Call',
        'You have a new call from your doctor',
        [
          {
            text: 'Reject',
            onPress: () => {
              // io.emit('reject-call', user?.username);
              // setRemoteUser(null);
              // setActiveCall(null);
              setOnCall(false);
              console.log('Rejected');
            },
            style: 'cancel',
          },
          {
            text: 'Accept',
            onPress: async () => {
              // io.emit('accept-call', user?.username);
              // call.answer(newStream);
              // setActiveCall(call);
              createAnswer();
              console.log('Accepted');
              // sdp = JSON.stringify(sdp);

              // // set sdp as remote description
              // peerConnection.setRemoteDescription(
              //   new RTCSessionDescription(sdp),
              // );
              // navigate('Call');
            },
          },
        ],
        {cancelable: false},
      );

      // set sdp as remote description
    });
    soc.on('answered', (sdp: RTCSessionDescriptionType) => {
      try {
        peerConnection.setRemoteDescription(new RTCSessionDescription(sdp));
      } catch (err) {
        console.log(err);
      }
    });
    soc.on('videoToggle', (data: any) => {
      //Remote Video Off
    });
    soc.on('audioToggle', (data: any) => {
      //Audio Toggled
    });
    soc.on('callEnded', (data: any) => {
      setCallEnded(true);
      setOnCall(false);
      endCall();
    });
    soc.on('candidate', (candidate: RTCIceCandidateType) => {
      peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    });
    peerConnection!.onicecandidate = (e: any) => {
      if (e.candidate) {
        sendToPeer('candidate', e.candidate);
      }
    };

    // triggered when there is a change in connection state
    peerConnection.onaddstream = (e: any) => {
      // this.remoteVideoref.current.srcObject = e.streams[0]
      setRemoteStream(e.stream);
    };
  };

  const toggleMic = () => {
    if (localStream)
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
        setMic(!mic);
      });
  };
  const toggleVideo = () => {
    if (localStream) {
      // @ts-ignore
      localStream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
        setVideo(!video);
      });
    }
  };
  const toggleCamera = () => {
    if (localStream) {
      // @ts-ignore
      localStream.getVideoTracks().forEach(track => track._switchCamera());
    }
  };
  const endCall = () => {
    console.log('CODE FOR END CALL');
    try {
      peerConnection.getLocalStreams().forEach((stream: any) => {
        stream.getTracks().forEach((track: any) => {
          track.stop();
        });
      });
      peerConnection.getRemoteStreams().forEach((stream: any) => {
        stream.getTracks().forEach((track: any) => {
          track.stop();
        });
      });
    } catch (err) {
      console.log(err);
    }
    sendToPeer('callEnded', 'End');
    // peerConnection.close();
    try {
      setCallEnded(true);
      setOnCall(false);
    } catch (err) {}
    //AFTER ENDING CALL NAVIGATE BACK TO CHAT
  };
  const createOffer = (room: string) => {
    // startLocalStream();
    setCallStatus('Calling');
    roomId = room;
    console.log(roomId);
    startMedia()
      .then(stream => {
        setLocalStream(stream);
        peerConnection.addStream(stream);
        peerConnection
          .createOffer({
            offerToReceiveAudio: true,
            offerToReceiveVideo: true,
          })
          .then((sdp: any) => {
            console.log('Calling =>>><<===');
            peerConnection.setLocalDescription(sdp);
            sendToPeer('offerOrAnswer', sdp);
          })
          .catch((err: any) => {
            console.log(err);
          });
      })
      .catch(err => {});
  };
  const createAnswer = () => {
    // startLocalStream();
    console.log('Answer');
    console.log('roomId', roomId);
    setCallStatus('Answered');
    startMedia()
      .then(stream => {
        setLocalStream(stream);
        peerConnection.addStream(stream);
        peerConnection
          .createAnswer({
            offerToReceiveAudio: true,
            offerToReceiveVideo: true,
          })
          .then((sdp: any) => {
            peerConnection.setLocalDescription(sdp);
            setOnCall(true);
            sendToPeer('offerOrAnswer', sdp);
          })
          .catch((err: any) => {
            console.log(err);
          });
      })
      .catch(err => {});
  };

  return (
    <VideoCallContext.Provider
      value={{
        peerConnection,
        localStream,
        remoteStream,
        initialize,
        toggleMic,
        toggleVideo,
        toggleCamera,
        endCall,
        createOffer,
        createAnswer,
        onCall,
        setOnCall,
        callEnded,
        setCallEnded,
        roomId,
        mic,
        video,
        callStatus,
      }}>
      {props.children}
    </VideoCallContext.Provider>
  );
};
