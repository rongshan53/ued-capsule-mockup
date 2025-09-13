import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import StylingDetailMy1Page from "./StylingDetailMy1Page";


const REF_IMG = require("../assets/styling result reference.png");

const StylingDetailMy2Page = ({ navigation }) => {
  const { width: refW, height: refH } = Image.resolveAssetSource(REF_IMG);
  const ASPECT = refW / refH; // width / height

  return (
    <View style={styles.screen}>
      <View style={styles.reference}>
              <Image source={REF_IMG}
                style={[{
                    maxHeight: "100%", 
                    aspectRatio: ASPECT, 
                  },]}
                resizeMode="contain"        
                opacity={0.5}
              />
      </View>

      <Text>2222</Text>

      
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { 
    flex: 1
  },

  reference: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center", // anchor image to the bottom
    alignItems: "flex-start",       // center horizontally
  },

  
});

export default StylingDetailMy2Page;