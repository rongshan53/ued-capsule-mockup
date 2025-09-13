import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";


const REF_IMG = require("../assets/styling detail my 2.png");

const ProfileScreen = ({ navigation }) => {
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
                
              />
      </View>



      
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { 
    flex: 1,
    backgroundColor: "#D3CFC0",
  },

  reference: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center", // anchor image to the bottom
    alignItems: "flex-start",       // center horizontally
  },

  
});

export default ProfileScreen;