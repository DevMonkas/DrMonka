import React, {useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Alert,
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
import {COLORS, SIZES} from '../../constants/theme';
import {VideoCallContext} from '../../shared/VideoCallProvider';
import {AuthContext} from '../../shared/AuthProvider';
import {startConsultation} from '../../services/Chat.service';

export default function VideoCall(props: any) {
  // const [localStream, setLocalStream] = React.useState<MediaStream | null>(
  //   null,
  // );
  const {
    onCall,
    localStream,
    remoteStream,
    createOffer,
    peerConnection,
    endCall,
    setOnCall,
    setCallEnded,
  } = useContext(VideoCallContext);
  const [user, setUser] = useContext(AuthContext);
  // const peerConnection = new RTCPeerConnection(pc_config);
  const [mic, setMic] = React.useState(true);
  const [video, setVideo] = React.useState(true);
  const soc = React.useContext(SocketContext);

  React.useEffect(() => {
    setOnCall(true);
    setCallEnded(false);
    call();
  }, []);
  React.useEffect(() => {
    // initilizePeerConnection();

    if (!onCall) {
      props.navigation.goBack();
    }
  }, [onCall]);

  const toggleMic = () => {
    if (localStream)
      // @ts-ignore
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

  const call = () => {
    startConsultation(soc, user.phone!, user.selectedPhone?.toString()!);
    createOffer(user.phone + '_' + user.selectedPhone);
  };

  const remoteVideo = true ? (
    <RTCView
      key={2}
      mirror={true}
      style={{...styles.rtcViewRemote}}
      objectFit="contain"
      // @ts-ignore
      streamURL={remoteStream && remoteStream.toURL()}
    />
  ) : (
    <View
      style={{
        height: SIZES.height,
        width: SIZES.width,
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
          <TouchableOpacity onPress={call}>
            <View style={styles.button}>
              <Text style={{...styles.textContent}}>Call</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={createAnswer}>
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
              onPress={() =>
                //@ts-ignore
                localStream!._tracks[1]._switchCamera()
              }>
              <View>
                <RTCView
                  key={1}
                  zOrder={0}
                  objectFit="cover"
                  mirror={true}
                  style={{...styles.rtcView}}
                  // @ts-ignore
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
            {mic ? (
              <Feather name="mic" size={26} color="white" />
            ) : (
              <Feather name="mic-off" size={26} color="white" />
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleVideo}>
          <View style={styles.circularButtonWrapper}>
            {video ? (
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
        <TouchableOpacity onPress={endCall}>
          <View style={[styles.circularButtonWrapper, styles.endCallWrapper]}>
            <Feather name="phone-call" size={26} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
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
    backgroundColor: 'gray',
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
    width: SIZES.width,
    height: SIZES.height, //dimensions.height / 2,
    backgroundColor: 'black',
  },
});
