import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming, runOnJS } from "react-native-reanimated";

const CARDS = [
  { id: 1, title: "style1", image: require("../assets/my style 1.png"), route: "StylingDetailMy1Page" },
  { id: 2, title: "style2", image: require("../assets/my style 2.png"), route: "StylingDetailMy2Page" },
  { id: 3, title: "style3", image: require("../assets/my style 3.png"), route: "StylingDetailMy3Page" },
];

const MAX_VISIBLE = 3;                 // keep 3 on screen
const CARD_WIDTH = 560;
const STACK_LIFT = 30;
const NEXT_SCALE = 0.97;
const TAIL_SCALE = 0.95;
const SWIPE_DISTANCE_THRESHOLD = 150;
const SWIPE_VELOCITY_THRESHOLD = -1000;
const OUT_DUR = 200;                   // ms

// fixed 0,1,2 "slots" -> map to item indices (no remount)
function slotToIndex(slot, currentIndex, len) {
  return (currentIndex + slot) % len;
}

function CardSlot({
  slot,                 // 0 = top, 1 = next, 2 = third
  item,
  deckLength,
  currentIndex,
  setCurrentIndex,
  width,
  navigation,
  t,                    // 0..1 progress of a swipe
}) {
  const translateX = useSharedValue(0);
  const isTop = slot === 0;

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      if (!isTop) return;
      // left-only, ignore right
      const x = Math.max(-width, Math.min(0, e.translationX));
      translateX.value = x;
      t.value = Math.max(0, Math.min(1, -x / width));
    })
    .onEnd((e) => {
      if (!isTop) return;

      // right-swipe or no left movement: do nothing
      if (translateX.value >= 0) {
        t.value = 0;
        return;
      }

      const shouldAdvance =
        e.translationX < -SWIPE_DISTANCE_THRESHOLD || e.velocityX < SWIPE_VELOCITY_THRESHOLD;

      if (shouldAdvance) {
        // 1) finish stack morph to "ready" state
        t.value = withTiming(1, { duration: OUT_DUR });
        // 2) slide top fully out, then advance and hard-reset without flashing
        translateX.value = withTiming(-width, { duration: OUT_DUR }, () => {
          runOnJS(setCurrentIndex)((currentIndex + 1) % deckLength);
          // Reset instantly on UI thread before next frame
          translateX.value = 0;
          t.value = 0;
        });
      } else {
        // cancel: slight snap to +20 keeps the same feel
        translateX.value = withTiming(20, { duration: 300 });
        t.value = withTiming(0, { duration: 300 });
      }
    });

    const STACK_SHIFT_X = 9;  // right peek amount
    const SHIFT_Y_S2 = 14;
    const SHIFT_Y_S3 =24;

const animatedStyle = useAnimatedStyle(() => {
  // base offsets for non-top cards (bottom-right peek)
  let baseTX = 0, baseTY = 0, baseScale = 1;

  if (slot === 1) {                // next card
    baseTX = STACK_SHIFT_X;
    baseTY = SHIFT_Y_S2;
    baseScale = NEXT_SCALE;
  } else if (slot === 2) {         // third card
    baseTX = STACK_SHIFT_X * 2;
    baseTY = SHIFT_Y_S3;
    baseScale = TAIL_SCALE;
  }

  // animate toward center (slot1) or toward slot1's offset (slot2) as t: 0->1
  let tx = baseTX, ty = baseTY, sc = baseScale;

  if (slot === 1) {
    tx = interpolate(t.value, [0, 1], [STACK_SHIFT_X, 0]);
    ty = interpolate(t.value, [0, 1], [SHIFT_Y_S2, 0]); 
    sc = interpolate(t.value, [0, 1], [NEXT_SCALE, 1]);
  } else if (slot === 2) {
    tx = interpolate(t.value, [0, 1], [STACK_SHIFT_X * 2, STACK_SHIFT_X]);
    ty = interpolate(t.value, [0, 1], [SHIFT_Y_S3, SHIFT_Y_S2]);
    sc = interpolate(t.value, [0, 1], [TAIL_SCALE, NEXT_SCALE]);
  }

  const rot = slot === 0 ? interpolate(-translateX.value, [0, width], [0, 20]) : 0;

  return {
    transform: [
      { translateX: slot === 0 ? translateX.value : tx }, // non-top slide in from right
      { translateY: slot === 0 ? 0 : ty },                // ...and from bottom
      { scale:      slot === 0 ? 1 : sc },
      { rotateZ: `${slot === 0 ? -rot : 0}deg` },
    ],
    zIndex: MAX_VISIBLE - slot,
    backfaceVisibility: "hidden",
  };
});


  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[styles.card, animatedStyle]}
        // ↓ compositing flags that help on Android/GPU
        renderToHardwareTextureAndroid
        needsOffscreenAlphaCompositing
        collapsable={false}
      >
        <Image
          source={item.image}
          style={styles.IMG}
          resizeMode="contain"
          // ↓ kill default Android image fade-in that looks like flicker
          fadeDuration={0}
        />

        <View style={styles.content}>
          <View style={styles.side}>
            <Image source={require("../assets/label icon.png")} style={{ width: 32, height: 32 }} />
            <Image source={require("../assets/send icon.png")} style={{ width: 26, height: 26 }} />
          </View>

          <View style={styles.bottom}>
            <Pressable onPress={() => navigation.navigate(item.route)}>
              <View style={styles.containerOutline}>
                <View style={styles.seeContainer}>
                  <Text style={styles.seeText}>See More</Text>
                </View>
              </View>
            </Pressable>
            <Image source={require("../assets/hold icon.png")} style={{ width: 35, height: 35 }} />
          </View>
        </View>
      </Animated.View>
    </GestureDetector>
  );
}

const REF_IMG = require("../assets/styling result reference.png");

export default function StylingResultScreen({ navigation }) {
  const { width: refW, height: refH } = Image.resolveAssetSource(REF_IMG);
  const ASPECT = refW / refH;

  const [currentIndex, setCurrentIndex] = useState(0);
  const t = useSharedValue(0);

  // Only render 3 fixed slots; swap their content by index math (no remount)
  const visibleSlots = Array.from({ length: Math.min(MAX_VISIBLE, CARDS.length) }, (_, s) => s);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

    <View style={styles.screen}>
            {/* <View style={styles.reference}>
              <Image
                source={REF_IMG}
                style={[{ maxHeight: "100%", aspectRatio: ASPECT }]}
                resizeMode="contain"
                opacity={0.5}
              />
            </View> */}

      <View style={styles.container}>
        {/* header & options kept as-is */}
        <View style={styles.weatherBar}>
          <View style={styles.leftCluster}>
            <Image source={require("../assets/rain icon green.png")} style={{ width: 30, height: 30 }} />
            <View style={styles.weatherText}>
              <Text style={{ fontSize: 16, color: "#7D7700" }}>27°C</Text>
              <Text style={{ fontSize: 11, color: "#7D7700" }}>Remember to put on more clothe!{" ><"}</Text>
            </View>
          </View>
          <Image source={require("../assets/wardrobe analysis icon.png")} style={{ width: 38, height: 38 }} />
        </View>

        <View style={styles.tittleBar}>
          
            <Pressable onPress={() => navigation.navigate("WardrobePage")}>
              <Image source={require("../assets/arrow.png")} style={{width: 18, height: 18}} />
            </Pressable>
          
          <View style={[styles.line, { width: 90 }]} />
          <Text style={styles.tittle}>AI Styling</Text>
          <View style={[styles.line, { width: 110 }]} />
        </View>

        <View style={styles.Or}>
          <View style={styles.Selected}>
            <Text style={styles.OrBig}>My Wardrobe</Text>
            <Image source={require("../assets/wardrobe icon red.png")} style={{ width: 17, height: 17 }} />
          </View>
          <View style={styles.Selected}>
            <Text style={styles.OrSmall}>Full Closet</Text>
            <Image source={require("../assets/shopping icon green.png")} style={{ width: 21, height: 21 }} />
          </View>
        </View>
        <Image source={require("../assets/bottom line icon.png")} style={styles.choicebox} resizeMode="contain" />
        <Text style={{ fontSize: 13, color: "#7D7700", marginTop:505, }}>swipe to view more</Text>

        <View style={styles.stackArea}>
          {visibleSlots.map((slot) => {
            const idx = slotToIndex(slot, currentIndex, CARDS.length);
            return (
              <CardSlot
                key={slot} // stable slot keys → no mount/unmount
                slot={slot}
                item={CARDS[idx]}
                deckLength={CARDS.length}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                width={CARD_WIDTH}
                navigation={navigation}
                t={t}
              />
            );
          })}
        </View>
      </View>
    </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  screen: { 
    flex: 1,
    position: "relative",
  },

  reference: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center", // anchor image to the bottom
    alignItems: "flex-start",       // center horizontally
  },

  container: { 
    flex: 1, 
    paddingHorizontal: 14, 
    paddingVertical: 52,
    alignItems:"center",
    backgroundColor: "#D3CFC0",
  },

  weatherBar: { 
    flexDirection: "row", 
    width: "100%", 
    justifyContent: "space-between", 
    alignItems: "center" 
  },

  leftCluster: { flexDirection: "row" },

  weatherText: { 
    marginLeft: 4, 
    marginTop: -4 
  },

  tittleBar: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between" 
  },
  
    line: { 
      backgroundColor: "#7D7700", 
      height: 1 
    },
  
    tittle: { 
      fontSize: 20, 
      color: "#FFFBF5", 
      fontFamily: "PlayfairDisplay_400Regular", 
      lineHeight: 28, 
      paddingHorizontal: 12 
    },

  OrBig: { 
    fontSize: 17, 
    color: "#7E3E00", 
    fontFamily: "PlayfairDisplay_400Regular" 
  },

  OrSmall: { 
    fontSize: 15, 
    color: "#7D7700", 
    fontFamily: "PlayfairDisplay_400Regular" 
  },

  Or: { 
    flexDirection: "row", 
    alignItems: "flex-start", 
    justifyContent: "space-evenly", 
    width: "100%", 
    paddingTop: 5 
  },

  Selected: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "center", 
    gap: 4 
  },

  choicebox: { 
    position: "absolute", 
    width: "56%", 
    marginTop: 49, 
    marginLeft: -133,
  },

  /* overlay UI on the card */
  content: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    gap: 150,
    paddingTop: 182,
    position: "absolute",
    width: "100%",
    height: "90%",
    marginLeft: -145,
  },

  side: { 
    justifyContent: "space-between", 
    alignItems: "center", 
    gap: 25, 
    height: 100 
  },

  bottom: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    width: 185, 
    paddingRight: 9 
  },
  
  seeContainer: {
    height: 30,
    paddingHorizontal: 18,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D3CFC0",
  },

  containerOutline:{
    borderWidth: 1,
    borderColor:"#D3CFC0",
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    paddingBlock:3,
    paddingHorizon0tal:3,
    width: 94,
  },

  seeText: { 
    fontSize: 12, 
    color: "#7E3E00", 
    fontFamily: "PlayfairDisplay_400Regular" 
  },

  /* stack area + card */
  stackArea: {
    position: "absolute",
    width: 580,
    height: 520,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 58,
    zIndex: 1,
    //opacity:0,
  },
  card: {
    position: "absolute",
    width: CARD_WIDTH,
    height: 474,
    borderRadius: 28,
    marginTop: 164,
    overflow: "hidden",
    backgroundColor: "transparent",
  },
  IMG: { width: "100%", height: "100%", borderRadius: 28 },
  
});
