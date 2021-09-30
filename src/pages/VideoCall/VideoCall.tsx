import React, {useEffect, useState} from 'react';
import {StatusBar, StyleSheet, View, Text} from 'react-native';
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals,
} from 'react-native-webrtc';
import PrimaryButton from '../../components/atoms/PrimaryButton/PrimaryButton';
import PrimaryInput from '../../components/atoms/PrimaryInput/PrimaryInput';
import appTheme from '../../constants/theme';
let peerConnection: RTCPeerConnection;
const io = require('socket.io-client');
const socket = io(
  'https://ea63-2405-201-19-30c5-b092-e4de-a678-fe11.ngrok.io',
  {jsonp: false},
);
export default function VideoCall() {
  const [socketID, setSocketID] = useState('');
  const [remoteId, setRemoteId] = useState('');
  // let localStream:any = null;
  const [localStream, setLocalStream] = useState({toURL: () => null});
  const [remoteStream, setRemoteStream] = useState({toURL: () => null});
  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected');
      socket.emit('login', {
        name: socket.id,
        id: socket.id,
      });
      socket.on('me', (data: any) => {
        console.log(data);
        setSocketID(data);
      });
      socket.on('video-offer', (data: any) => handleVideoOffer(data));
      socket.on('video-answer', (data: any) => handleVideoAnswer(data));
      socket.on('candidate', (data: any) => handleICECandidate(data));
    });
    initLocalVideo();
  }, []);
  const initLocalVideo = () => {
    mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then((stream: any) => {
        // Got stream!
        setLocalStream(stream);
        peerConnection.addStream(stream);
      })
      .catch(error => {
        // Log error
      });
    // });
  };
  const handleVideoAnswer = async (data: any) => {
    console.log(data);
    console.log(peerConnection);
    // var desc = new RTCSessionDescription(data.sdp);
    // await peerConnection
    //   .setRemoteDescription(new RTCSessionDescription(data.sdp))
    //   .catch((err) => console.warn(err));
    var desc = new RTCSessionDescription(data.sdp);
    await peerConnection.setRemoteDescription(desc);
  };

  const handleVideoOffer = async (data: any) => {
    console.log(data);
    setRemoteId(data.from);
    if (!peerConnection) {
      createPeerConnection();
    }
    var desc = new RTCSessionDescription(data.sdp);
    if (peerConnection.signalingState != 'stable') {
      console.log(
        "  - But the signaling state isn't stable, so triggering rollback",
      );
      await Promise.all([
        // peerConnection.setLocalDescription({ type: "rollback" }),
        peerConnection.setRemoteDescription(desc),
      ]);
      return;
    } else {
      console.log('  - Setting remote description');
      await peerConnection.setRemoteDescription(desc);
    }
    if (!localStream) {
      try {
        setLocalStream(
          await mediaDevices.getUserMedia({
            video: true,
            audio: true,
          }),
        );
      } catch (err) {
        return;
      }
      try {
        // localStream
        //   .getTracks()
        //   .forEach(
        //     (transceiver = (track) =>
        //       peerConnection.addTransceiver(track, { streams: [localStream] }))
        //   );
        peerConnection.addStream(localStream);
      } catch (err) {}
    }
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    socket.emit('video-answer', {
      to: data.from,
      from: data.to,
      sdp: answer,
    });
  };
  const handleICECandidate = async (data: any) => {
    console.log('ice=>', data);
    if (!peerConnection) {
      createPeerConnection();
    }
    peerConnection
      .addIceCandidate(new RTCIceCandidate(data.candidate))
      .then(() => {
        console.log('Candidate added');
      })
      .catch(e => {
        console.log(e);
      });
  };
  const createPeerConnection = () => {
    peerConnection = new RTCPeerConnection({
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
      ],
    });
    peerConnection.onicecandidate = event => {
      if (event.candidate) {
        socket.emit('candidate', {
          name: socketID,
          candidate: event.candidate,
        });
      }
    };
    setRemoteStream(new MediaStream({}));
    peerConnection.onaddstream = e => {
      console.log('Track:', e);
      setRemoteStream(e.stream);
    };
    // peerConnection.onnegotiationneeded = handleNegotiationNeededEvent;
  };
  const makeCall = async () => {
    var callToUsername = remoteId;
    console.log(remoteId);
    if (callToUsername.length > 0) {
      // if (peerConnection) {
      //   console.warn("Already in call");
      //   return;
      // }
      createPeerConnection();
      try {
        setLocalStream(
          await mediaDevices.getUserMedia({
            video: true,
            audio: true,
          }),
        );
      } catch (err) {
        return;
      }
      try {
        // localStream
        //   .getTracks()
        //   .forEach(
        //     (transceiver = (track) =>
        //       peerConnection.addTransceiver(track, { streams: [localStream] }))
        //   );
        peerConnection.addStream(localStream);
      } catch (err) {
        console.error(err);
      }
      peerConnection
        .createOffer({offerToReceiveAudio: true, offerToReceiveVideo: true})
        .then(offer => {
          peerConnection.setLocalDescription(offer).then(() => {
            socket.emit('video-offer', {
              to: remoteId,
              from: socketID,
              sdp: offer,
            });
          });
        });
    }
  };
  return (
    <View style={{...styles.container}}>
      <Text style={{}}>{socketID}</Text>
      <View>
        <RTCView
          key={2}
          mirror={true}
          style={{...styles.rtcViewLocal}}
          objectFit="contain"
          streamURL={localStream.toURL()}
        />
      </View>
      <View>
        <RTCView
          key={2}
          mirror={true}
          style={{...styles.rtcViewRemote}}
          objectFit="contain"
          streamURL={remoteStream && remoteStream.toURL()}
        />
      </View>
      <View style={{width: '100%'}}>
        <PrimaryInput
          handleText={setRemoteId}
          text={remoteId}
          marginTop="5"
          keyboardType="ascii-capable"
          width="100%"
          placeHoldText="Remote ID"></PrimaryInput>
      </View>
      <View>
        <PrimaryButton
          onPress={() => {
            makeCall();
          }}
          text={'Call'}></PrimaryButton>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  rtcViewLocal: {
    width: appTheme.SIZES.width - 30,
    height: 200, //dimensions.height / 2,
    backgroundColor: 'red',
  },
  rtcViewRemote: {
    width: appTheme.SIZES.width - 30,
    height: 200, //dimensions.height / 2,
    backgroundColor: 'green',
  },
  container: {
    flex: 1,
    height: appTheme.SIZES.height,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
