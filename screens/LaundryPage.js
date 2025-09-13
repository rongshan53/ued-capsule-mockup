import { StyleSheet, Text, View, Image } from "react-native";
import InsetShadow from 'react-native-inset-shadow';

const REF_IMG = require("../assets/laundry reference.png");

const RAIL = require("../assets/rail.png");
const { width: railW, height: railH } = Image.resolveAssetSource(RAIL);
const RAIL_AR = railW / railH;

export default function LaundryScreen() {
  // Get the intrinsic size of the asset to keep the correct aspect ratio
  const { width: refW, height: refH } = Image.resolveAssetSource(REF_IMG);
  const ASPECT = refW / refH; // width / height

  return (
    <View style={styles.screen}>
      {/* <View style={styles.reference}>
        <Image source={REF_IMG}
          style={[{
              maxHeight: "100%", 
              aspectRatio: ASPECT,    //    ...auto height from aspect
            },]}
          resizeMode="contain"        // no crop; use "cover" if you want crop
          opacity={0.5}
        />
      </View> */}

      {/* Foreground content (unaffected by the background) */}
      <View style={styles.container}>
        
        <View style={styles.weatherBar}>
          <View style={styles.leftCluster}>
            <Image source={require("../assets/rain icon.png")} style={{width: 30, height: 30}} />
            <View style={styles.weatherText}>
              <Text style={{ fontSize:16 }}>27°C</Text>
              <Text style={{ fontSize:11, lineHeight:18 }}>oops, it might not be the best day to do laundry{" ><"} </Text>
            </View>
          </View>
          <Image source={require("../assets/basket icon.png")} style={{width: 38, height: 38}} />
        </View>
        
        <View>
          <Image source={require("../assets/arrow.png")} style={{width: 16, height: 16, position: "absolute", marginTop:16}} />
        </View>

        <View style={styles.bottomContent}>
            {/* <InsetShadow
              shadowColor="#000"
              shadowOpacity={0.5}
              shadowOffset={8}          // thickness
              elevation={8}             // affects Android rendering inside
              containerStyle={{ width: 200,borderRadius: 360, backgroundColor: "#FFFBF5" }}
            > */}
            <View style={styles.switchBg}>
            
                <View style={styles.switchFront}>
                    <Text style={{ fontSize:28}}>00.00</Text>
                    <Text style={{ fontSize:18, marginTop: 7}}>Idle</Text>
                    <View style={styles.OnOff}>
                      <Image source={require("../assets/OnIcon.png")} style={{width: 36, height: 36}} />
                    </View>
                </View>
              
            </View>
            {/* </InsetShadow> */}

            <View style={styles.four}>

              <View style={styles.railControl}>
                
                <View style={styles.rail}>
                   <Image
                    style={{width:340,height:55, marginBottom: -18}}
                    source={RAIL}
                    resizeMode="contain"
                    />   
                </View>

                <View style={styles.railWords}>
                  <Text style={styles.railSmall}>Quick 30</Text>
                  <Text style={styles.railSmall}>Mix</Text>
                  <Text style={styles.railBig}>Cotton</Text>
                  <Text style={styles.railSmall}>Easy Care</Text>
                  <Text style={styles.railSmall}>Delicate</Text>
                </View>

              </View>

              <View style={styles.three}>
                <View style={styles.WholeDetergent}>
                  <View style={styles.DetergentCapacity}>

                    <View style={styles.DeterNum}>
                      <Text style={styles.smallest}>80</Text>
                      <Text style={styles.smallest}>70</Text>
                      <Text style={styles.smallest}>60</Text>
                      <Text style={styles.smallest}>50</Text>
                      <Text style={styles.smallest}>40</Text>
                      <Text style={styles.smallest}>30</Text>
                      <Text style={styles.smallest}>20</Text>
                      <Text style={styles.smallest}>10</Text>
                    </View>

                    <View style={styles.Detergent}>
                      <View style={styles.capacity}></View>
                    </View>

                </View>

                  <View style={styles.DeterWords}>
                    <Text style={styles.DeterText}>Detergent Capacity(ml) </Text>
                  </View>
                </View>
                
                <View style={styles.two}>
                  <View>
                  <Text style={styles.subtitle}>Mode</Text>

                  <View style={styles.modeSelect}>
                    <View style={styles.ModeBoxes}>
                      <Text style={styles.modeText}>Medic Rinse</Text>
                    </View>
                    <View style={styles.ModeBoxes}>
                      <Text style={styles.modeText}>Pre</Text>
                      <Text style={styles.modeText}>Wash</Text>
                    </View>
                    <View style={styles.ModeBoxes}>
                      <Text style={[styles.modeText, { marginBottom: 16 }]}>Intensive</Text>
                    </View>
                    <View style={styles.ModeBoxes}>
                      <Text style={styles.modeText}>Crease Care</Text>
                    </View>
                  </View>

                </View>

                <View>
                  <Text style={styles.subtitle}>Temperature (°C) </Text>
                  <View style={styles.SliderBg}>
                    <View style={styles.SliderBar}>
                      <View style={styles.knob}></View>
                    </View>
                  </View>
                  <View style={styles.Temperature}>
                    <Text style={styles.temperatureText}>0</Text>
                    <Text style={styles.temperatureText}>10</Text>
                    <Text style={styles.temperatureText}>20</Text>
                    <Text style={styles.temperatureText}>30</Text>
                    <Text style={styles.temperatureText}>40</Text>
                  </View>
                </View>
              </View>
            </View>

            </View> 
        </View>
      </View>
        <View style={styles.whiteBottom}></View>
    </View>

  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: "relative",
    backgroundColor: "#D3CFC0",
  },

  // Full-screen layer for background placement
  reference: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center", // anchor image to the bottom
    alignItems: "flex-start",       // center horizontally
  },

  container: {
    flex: 1,
    paddingBlock: 52,
    paddingInline: 14,
    backgroundColor: "transparent", // keep transparent so bg shows through
  },

  weatherBar: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },

  leftCluster: {
    flexDirection: "row",
  },

  weatherText: {
    marginLeft: 4,
    marginTop: -4,
  },

  whiteBottom: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 40,  
    borderTopRightRadius: 40,
    backgroundColor: "#FFFBF5",
  },

  bottomContent: {
    paddingTop: 32,
    alignItems: "center",
  },

  switchBg: {
    width: "100%",
    height: 245,
    width:250,
    borderRadius: 360,
    backgroundColor: "#FFFBF5",
    justifyContent: "center",
    alignItems: "center",
    // opacity:0.6,
  },

  switchFront: {
    width: "100%",
    height: 200,
    width:200,
    borderRadius: 360,
    backgroundColor: "#FFFBF5",
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    // opacity:0.6,
    paddingTop: 6,
  },

  OnOff: {
    height: 72,
    width:72,
    borderRadius: 360,
    backgroundColor: "#7D7700",
    justifyContent: "center",
    alignItems: "center",
    marginTop:16,
  },

  subtitle: { 
    fontFamily: "PlayfairDisplay_400Regular", 
    fontSize:18, 
    color:"rgba(43, 42, 41, 0.8)", 
    marginBottom: 4,
  },

  ModeBoxes: {
    width: 65,
    height: 82,
    borderRadius: 8,    
    backgroundColor: "#FFFBF5",
    justifyContent: "flex-end",
    paddingBlock: 12,
    paddingInline: 8, 
  },

  modeSelect: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop:-2,
  },

  modeText: {
    fontSize:12,
  },

  SliderBg: {
    width: 270,
    height: 30,
    borderRadius: 16,    
    backgroundColor: "#FFFBF5",
    justifyContent: "center",
    alignItems: "center",
  },

  SliderBar: {
    width: 245,
    height: 8,
    borderRadius: 16,    
    backgroundColor: "#ecebe2ff",
    justifyContent: "center",
  },

  knob: {
    width: 15,
    height: 35,
    borderRadius: 16,    
    backgroundColor: "#D3CFC0",
    marginLeft: 4,
  },

  TemperatureText: {
    fontSize:16,
  },

  Temperature: {
    width: 250,
    fontSize:16,
    flexDirection: "row",
    justifyContent:"space-around",
  },

  Detergent: {
    width:15,
    height: 153,
    borderRadius: 16,    
    backgroundColor: "#FFFBF5",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  capacity: {
    width:15,
    height: 115,
    backgroundColor: "#7E3E00",
    borderBottomLeftRadius: 16,  
    borderBottomRightRadius: 16,
  },

  DeterText: {
    fontSize:12,
    lineHeight: 13,
    // width:
  },

  two: {
    width: 270,
    gap:14,
  },
  
  three: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop:20,
  },

  DeterWords: {
    width:54,
    height: 50,
  },

  smallest: {
    fontSize:10,
  },

  DeterNum: {
    height: 148,
    justifyContent:"space-around",
    marginTop:-5,
  },

  DetergentCapacity: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  WholeDetergent: {
    height: 207,
    justifyContent: "space-between",
  },


  railWords: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  railBig: {
    fontSize:16,
  },

  railSmall: {
    fontSize:12,
  },

  rail: {
    marginLeft:50,
   //width:300,
  },

  four:{
    // flex:1,
    justifyContent:"center",
    alignItems:"center",
  },

  railControl:{
    // flex:1,
    height: 50,
    width: "80%",
    justifyContent: "space-between",
  }
});
