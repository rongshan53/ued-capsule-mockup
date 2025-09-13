import { Pressable } from "react-native";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button } from 'react-native-paper';

const REF_IMG = require("../assets/home reference.png");

const HomeScreen = ({ navigation }) => {
  const { width: refW, height: refH } = Image.resolveAssetSource(REF_IMG);
  const ASPECT = refW / refH; // width / height

  return (
    <View style={styles.screen}>
      {/* <View style={styles.reference}>
        <Image source={REF_IMG}
          style={[{
            maxHeight: "100%", 
            aspectRatio: ASPECT, 
            },]}
          resizeMode="contain"        
          opacity={0.5}
        />
      </View> */}

      <View style={styles.CONTENT}>
        <View style={styles.top}>

        <View style={styles.topUp}>
          <View style={styles.topUpLeft}>
            <Text style={styles.lvlText}>Lvl1</Text>
            <View style={styles.IMG}>
              <Image source={require("../assets/home token asset.png")} style={{width: "46%", resizeMode:"contain", marginTop: -55}}/>
            </View>
            <Text style={[styles.bigText, {marginBottom: 11, marginLeft: 38}]}>57</Text>
          </View>
          <View style={styles.topUpMid}>
            <Text style={styles.smallText}>Welcome back！</Text>
            <Text style={styles.bigText}>RongShan</Text>
          </View>
          <View>
            <View style={styles.circle}>
              <Image source={require("../assets/deco icon.png")} style={{width: "54%", resizeMode:"contain"}}/>
            </View>
          </View>
        </View>
        
        <View style={styles.line}></View>

      </View>

      <View style={styles.middle}>
        <View style={styles.midUp}>
          <View style={styles.IMG}>
            <Image source={require("../assets/home setting asset.png")} style={{width: "82%", resizeMode:"contain"}}/>
          </View>
          <View style={styles.IMG}>
            <Image source={require("../assets/home calendar asset.png")} style={{width: "130%", resizeMode:"contain", marginLeft: -11, marginBottom: -14}}/>
          </View>
          <View style={styles.IMG}>
            <Image source={require("../assets/home analysis book asset.png")} style={{width: "100%", resizeMode:"contain", marginLeft: 14, marginBottom: -14}} />
          </View>
          <View style={styles.IMG}>
            <Image source={require("../assets/home letter asset.png")} style={{width: "75%", resizeMode:"contain", marginLeft: 14, marginBottom: -34}} />
          </View>
        </View>
        
        <View style={styles.IMG}>
          <Image source={require("../assets/home search bar asset.png")} style={{width: "99%", resizeMode:"contain", marginTop: -70,}} />
        </View> 
        
        <View style={styles.absoluteGroup2}>
          <Image source={require("../assets/search icon.png")} style={{width: 24, height: 24}} />
          <Text style={styles.mediumText}>What Style Today?</Text>
        </View>

        <Image source={require("../assets/profile icon 2.png")} style={{width: 46, height: 46, position:"absolute", marginLeft: 25, marginTop: 21}} />
      </View>
      
      <View style={styles.absoluteGroup3}>
        <Image source={require("../assets/rain icon big.png")} style={{width: 44, height: 44, marginTop: 12 }} />
        <View style={styles.weatherText}>
          <Text style={styles.bigWeather}>27</Text>
          <Text style={styles.smallWeather}>°C</Text>
        </View>
      </View>

      <View style={styles.bottom}>
        <View style={styles.LeftColumn}>
          <View style={styles.BOX}>
            <Image source={require("../assets/home window asset.png")} style={{width: "105%", height: "105%"}} resizeMode="contain"/>
          </View>

          <View style={styles.phoneNalbum}>
            <View style={[styles.smallBOX, { flex: 2 }]}>
              <Image source={require("../assets/home phone asset.png")} style={{width: "160%", height: "160%",marginLeft: -25}} resizeMode="contain"/>
            </View>
            <View style={[styles.smallBOX, { flex: 3 }]}>
              <Image source={require("../assets/home album asset.png")} style={{width: "105%", height: "105%",}} resizeMode="contain"/>
            </View>
          </View>

          <View style={styles.touchlaundry}>
            <Button mode="contained" compact 
            onPress={() => navigation.navigate("LaundryPage")}
            style={{ backgroundColor: "transparent"}}
            theme={{ roundness: 0 }}>
              <Image source={require("../assets/home laundry machine asset.png")} 
              style={{width: "100%", height: "100%", transform: [{ scale: 1.15 }]}} 
              resizeMode="contain"/>
            </Button>
          </View>
        </View>

        <View style={styles.RightColumn}>
          <View style={styles.BOX}>
            <Pressable style={styles.touchWardrobe} onPress={() => navigation.navigate("WardrobePage")}>
              <Image source={require("../assets/home wardrobe asset.png")} style={{width: "99%", height: "99%", marginLeft:5, elevation: 100,}} resizeMode="contain"/>
            </Pressable>
          </View>

          <View style={styles.BOX}>
            <Image source={require("../assets/home analysis basket asset.png")} style={{width: "95%", height: "95%",marginTop:72, marginLeft:8}} resizeMode="contain"/>
          </View>
        </View>
      </View>

      <Image source={require("../assets/home floor asset.png")} style={{width: "100%", height: "100%", position:"absolute", marginTop: 323, zIndex:-1}} resizeMode="contain"/>
    
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

  CONTENT: { 
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },

  top: {
    flex:1.25,
    width:"100%",
    paddingTop:54,
    justifyContent:"center"
  },

  topUp: {
    flex:1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal:16,
  },

  topUpLeft: {
    flex:1,
    flexDirection: "column",
    justifyContent: "flex-start",
    marginTop: -8,
  },

  topUpMid: {
    flex:1,
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: -26,
  },

  circle:{
    height: 53,
    width:53,
    borderRadius: 27,
    backgroundColor: "#E6E2D4",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFFBF5",
    marginBottom:4,
  },

  line:{
    //flex:1,
    width:"90%",
    backgroundColor: "#7D7700",
    height: 1,
    },

  middle: {
    flex: 3,
    paddingHorizontal:16,
    // gap: -86,
  },

  midUp: {
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width:"100%",
    gap:8,
  },

  bottom: {
    flex:12,
    height:"100%",
    flexDirection: "row",
    paddingHorizontal:16,
    gap: 4,                  // space between Left & Right columns
    alignItems: "flex-start",
  },

  LeftColumn: {
    flex:2,
    //width: 120,
    alignItems: "flex-start",
    gap: 19,
  },

  RightColumn: {
    flex:3,
    // width: 120,
    alignItems: "space-between",
    justifyContent: "center",
    gap: 8,
  },

  phoneNalbum: { 
    //flex:1,
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
    width: "100%",
  // aspectRatio: 1,
  paddingLeft: 6,
  },

  IMG: {
  flex:1,
  },

  BOX: {
  width: "100%",
  aspectRatio: 1,
  },

  touchlaundry: {
  marginLeft: -8,
  width: "113%",
  height: 156, 
  },

  touchWardrobe: {
  // marginLeft: -8,
  width: "100%",
  height: 325,
  borderRadius: 0, 
  },
  
  smallBOX: {
  aspectRatio: 1,
  },

  lvlText:{
    fontSize: 16,
    color: "#7E3E00",
  },

  smallText:{
    fontSize: 14,
    color: "#7E3E00",
    fontFamily: "PlayfairDisplay_400Regular", 
  },

  bigText:{
    fontSize: 22,
    color: "#7E3E00",
    fontFamily: "PlayfairDisplay_400Regular", 
    lineHeight: 28,
    marginLeft: -4,
  },

  mediumText:{
    fontSize: 18,
    color: "#7D7700",
    fontFamily: "PlayfairDisplay_400Regular", 
    lineHeight: 28,
  },

  tempText:{
    fontSize: 36,
    color: "#7E3E00",
  },

  absoluteGroup2: {
    position:"absolute",
    flexDirection:"row",
    gap:8,
    marginLeft: 27,
    alignItems:"center",
    marginTop: 92
  },

  absoluteGroup3: {
    position:"absolute",
    flexDirection:"row",
    gap:4,
    marginLeft: -190,
    alignItems:"center",
    marginTop: 302,
    zIndex: 1,
  },

bigWeather:{
  fontSize: 44,
  color: "#7E3E00",
},

smallWeather:{
  fontSize: 14,
  color: "#7E3E00",
  paddingTop: 12,
},

weatherText:{
  flexDirection:"row",
},

});

export default HomeScreen;