import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {SocketContext} from '../../shared/SocketProvider';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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

import io from 'socket.io-client';
import {COLORS} from '../../constants/theme';

const dimensions = Dimensions.get('window');

class VideoCall extends React.Component {
  static contextType = SocketContext;

  constructor(props) {
    super(props);

    this.state = {
      localStream: null,
      remoteStream: null,
      mic: true,
      video: true,
    };

    this.sdp;
    this.socket = null;
    this.candidates = [];
  }

  componentDidMount = () => {
    // this.socket = io.connect(
    //   'https://22a0-2405-201-19-30c5-b092-e4de-a678-fe11.ngrok.io',
    // );
    this.socket = this.context;
    console.log('XOXOXOOXOX', this.socket);
    this.socket.on('connection-success', success => {
      console.log(success);
    });

    this.socket.on('offerOrAnswer', sdp => {
      this.sdp = JSON.stringify(sdp);

      // set sdp as remote description
      this.pc.setRemoteDescription(new RTCSessionDescription(sdp));
    });

    this.socket.on('candidate', candidate => {
      // console.log('From Peer... ', JSON.stringify(candidate))
      // this.candidates = [...this.candidates, candidate]
      this.pc.addIceCandidate(new RTCIceCandidate(candidate));
    });

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
      ],
    };

    this.pc = new RTCPeerConnection(pc_config);

    this.pc.onicecandidate = e => {
      // send the candidates to the remote peer
      // see addCandidate below to be triggered on the remote peer
      if (e.candidate) {
        // console.log(JSON.stringify(e.candidate))
        this.sendToPeer('candidate', e.candidate);
      }
    };

    // triggered when there is a change in connection state
    this.pc.oniceconnectionstatechange = e => {
      console.log(e);
    };

    this.pc.onaddstream = e => {
      debugger;
      // this.remoteVideoref.current.srcObject = e.streams[0]
      this.setState({
        remoteStream: e.stream,
      });
    };

    const success = stream => {
      console.log(stream.toURL());
      this.setState({
        localStream: stream,
      });
      this.pc.addStream(stream);
    };

    const failure = e => {
      console.log('getUserMedia Error: ', e);
    };

    let isFront = true;
    mediaDevices.enumerateDevices().then(sourceInfos => {
      console.log(sourceInfos);
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
            minWidth: 500, // Provide your own width, height and frame rate here
            minHeight: 300,
            minFrameRate: 30,
          },
          facingMode: isFront ? 'user' : 'environment',
          optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
        },
      };

      mediaDevices.getUserMedia(constraints).then(success).catch(failure);
    });
  };
  sendToPeer = (messageType, payload) => {
    this.socket.emit(messageType, {
      socketID: this.socket.id,
      payload,
    });
  };

  createOffer = () => {
    console.log('Offer');
    this.pc
      .createOffer({offerToReceiveVideo: 1, offerToReceiveAudio: 1})
      .then(sdp => {
        this.pc.setLocalDescription(sdp);

        this.sendToPeer('offerOrAnswer', sdp);
      });
  };

  createAnswer = () => {
    console.log('Answer');
    this.pc
      .createAnswer({offerToReceiveVideo: 1, offerToReceiveAudio: 1})
      .then(sdp => {
        this.pc.setLocalDescription(sdp);

        this.sendToPeer('offerOrAnswer', sdp);
      });
  };

  setRemoteDescription = () => {
    const desc = JSON.parse(this.sdp);
    this.pc.setRemoteDescription(new RTCSessionDescription(desc));
  };

  addCandidate = () => {
    this.candidates.forEach(candidate => {
      console.log(JSON.stringify(candidate));
      this.pc.addIceCandidate(new RTCIceCandidate(candidate));
    });
  };

  render() {
    const {localStream, remoteStream} = this.state;
    const toggleMic = () => {
      this.setState({mic: !this.state.mic});
    };
    const toggleVideo = () => {
      this.setState({video: !this.state.video});
    };
    const toggleCamera = () => {
      localStream._tracks[1]._switchCamera();
    };
    const endCall = () => {
      console.log('CODE FOR END CALL');
      //AFTER ENDING CALL NAVIGATE BACK TO CHAT
    };
    const remoteVideo = remoteStream ? (
      <RTCView
        key={2}
        mirror={true}
        style={{...styles.rtcViewRemote}}
        objectFit="contain"
        streamURL={remoteStream && remoteStream.toURL()}
      />
    ) : (
      <View
        style={{
          height: dimensions.height,
          width: dimensions.width,
          backgroundColor: 'black',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 22,
            textAlign: 'center',
            color: 'white',
            justifyContent: 'center',
            backgroundColor: 'black',
          }}>
          Connecting...
        </Text>
      </View>
    );

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.primary[100]}}>
        <StatusBar backgroundColor="green" barStyle={'dark-content'} />
        {/* <View style={{...styles.buttonsContainer}}>
          <View style={{flex: 1}}>
            <TouchableOpacity onPress={this.createOffer}>
              <View style={styles.button}>
                <Text style={{...styles.textContent}}>Call</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}}>
            <TouchableOpacity onPress={this.createAnswer}>
              <View style={styles.button}>
                <Text style={{...styles.textContent}}>Answer</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View> */}
        <View style={{...styles.videosContainer}}>
          <View
            style={{
              position: 'absolute',
              zIndex: 1,
              top: 20,
              right: 3,
              backgroundColor: 'orange', //width: '100%', height: '100%'
            }}>
            <View style={{flex: 1}}>
              <TouchableOpacity
                onPress={() => localStream._tracks[1]._switchCamera()}>
                <View>
                  <RTCView
                    key={1}
                    zOrder={0}
                    objectFit="cover"
                    style={{...styles.rtcView}}
                    streamURL={localStream && localStream.toURL()}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView style={{...styles.scrollView}}>
            <View
              style={{
                flex: 1,
                width: '100%',
                backgroundColor: 'black',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {remoteVideo}
            </View>
          </ScrollView>
        </View>
        <View style={styles.bottomButtonsContainer}>
          <TouchableOpacity onPress={toggleMic}>
            <View style={styles.circularButtonWrapper}>
              {this.state.mic ? (
                <Feather name="mic" size={26} color="white" />
              ) : (
                <Feather name="mic-off" size={26} color="white" />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleVideo}>
            <View style={styles.circularButtonWrapper}>
              {this.state.video ? (
                <Feather name="video" size={26} color="white" />
              ) : (
                <Feather name="video-off" size={26} color="white" />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleCamera}>
            <View style={styles.circularButtonWrapper}>
              <MaterialCommunityIcons
                name="camera-switch-outline"
                size={26}
                color="white"
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={[styles.circularButtonWrapper, styles.endCallWrapper]}>
              <Feather name="phone-call" size={26} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  endCallWrapper: {
    backgroundColor: 'red',
  },
  bottomButtonsContainer: {
    position: 'absolute',
    bottom: '8%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  circularButtonWrapper: {
    borderRadius: 50,
    backgroundColor: COLORS.primary[400],
    padding: 17,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  button: {
    margin: 5,
    paddingVertical: 10,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
  },
  textContent: {
    fontFamily: 'Avenir',
    fontSize: 20,
    textAlign: 'center',
  },
  videosContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rtcView: {
    width: 120, //dimensions.width,
    height: 180, //dimensions.height / 2,
    backgroundColor: 'purple',
    zIndex: 100,
    position: 'absolute',
    right: 5,
  },
  scrollView: {
    flex: 1,
    // flexDirection: 'row',
    // backgroundColor: 'teal',
    padding: 15,
  },
  rtcViewRemote: {
    width: dimensions.width,
    height: dimensions.height, //dimensions.height / 2,
    backgroundColor: 'black',
  },
});

export default VideoCall;
