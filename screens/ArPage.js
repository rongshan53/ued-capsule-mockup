import { StyleSheet, Text, View, Image } from "react-native";
import { Video, ResizeMode } from "expo-av";
import React, { useRef, useState } from "react";

const REF_IMG = require("../assets/ar reference.png");
const AR_BG  = require("../assets/ar bg.png");
const AR_VIDEO = require("../assets/ar video.mp4");

const ArScreen = ({ navigation }) => {
  const { width: refW, height: refH } = Image.resolveAssetSource(REF_IMG);
  const ASPECT = refW / refH; // width / height

  const { width: vidW, height: vidH } = Image.resolveAssetSource(AR_BG);
  const ASPECTT = vidW / vidH; // width / height

  const videoRef = useRef(null);
  const [videoAR] = useState(7.9 / 16);

  return (
    <View style={styles.screen}>
      {/* <View style={styles.reference}>
        <Image source={REF_IMG}
          style={[{
            maxHeight: "100%", 
            aspectRatio: ASPECT, 
            zIndex: 2,
          },]}
          resizeMode="contain"        
          opacity={0.3}
        />
      </View> */}

      <View>

        <View style={[styles.videobox, { aspectRatio: videoAR }]}>
          <Video
          ref={videoRef}
          style={styles.video}
          source={AR_VIDEO}
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay
          isLooping={false}
          isMuted 
          playsInSilentModeIOS
          />
        </View>

        <Image source={AR_BG}
        style={[{
          maxHeight: "100%", 
          aspectRatio: ASPECTT, 
          elevation: 15,
          zIndex: 1,
          },]}
        resizeMode="contain"
        />

        <View style={styles.circle}>
          <Image source={require("../assets/gallery icon.png")} style={{width: 22, height: 22}} />
        </View>

      </View>

  </View>
  );
};

const styles = StyleSheet.create({
  screen: { 
    flex: 1,
    position: "relative",
    justifyContent: "center", 
    alignItems: "center",
  },

  reference: {
    ...StyleSheet.absoluteFillObject,
  },

  videobox: {
    position: "absolute",
    alignSelf: "center",
    width: "100%",       // control width here
    zIndex: 0,
  },
  
  video: {
    width: "100%",
    height: "100%",
  },

  circle: {
    height: 56,
    width:56,
    borderRadius: 360,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    zIndex: 4,
    position: "absolute",
    backgroundColor:"#D3CFC0",
    marginTop: 610,
    marginLeft:280,
  },

});

export default ArScreen;