import React, { useMemo, useRef, useState, useEffect } from "react";
import { Pressable, StyleSheet, Text, View, Image, FlatList, Dimensions  } from "react-native";
import { Button } from 'react-native-paper';

// import Swiper from "react-native-swiper";

const REF_IMG = require("../assets/wardrobe reference.png");

  const BOX = { WIDTH: 190, HEIGHT: 135,};
  const SEP = 21; // same as ItemSeparator width
  const SNAP_INTERVAL = BOX.WIDTH + SEP;

  const row1 = [
  { id: "r1-1", src: require("../assets/clothe 1.png") },
  { id: "r1-2", src: require("../assets/clothe 2.png") },
  { id: "r1-3", src: require("../assets/clothe 3.png") },
  { id: "r1-4", src: require("../assets/clothe 4.png") },
  { id: "r1-5", src: require("../assets/clothe 5.png") },
  { id: "r1-6", src: require("../assets/clothe 6.png") },
  { id: "r1-7", src: require("../assets/clothe 7.png") },
  ];
  const row2 = [
  { id: "r2-1", src: require("../assets/bottom 1.png") },
  { id: "r2-2", src: require("../assets/bottom 2.png") },
  { id: "r2-3", src: require("../assets/bottom 3.png") },
  { id: "r2-4", src: require("../assets/bottom 4.png") },
  { id: "r2-5", src: require("../assets/bottom 5.png") },
  ];
  const row3 = [
  { id: "r3-1", src: require("../assets/shoe 1.png") },
  { id: "r3-2", src: require("../assets/shoe 2.png") },
  { id: "r3-3", src: require("../assets/shoe 3.png") },
  ];

const LABELS = ["All", "Daily", "Casual", "Leisure"];
// const CATEGORY_COLORS = ["#BAAEC4", "#C9A68D", "#C6BC94", "#9FC5AB"];

export default function WardrobeScreen({ navigation }) {
  const { width: refW, height: refH } = Image.resolveAssetSource(REF_IMG);
  const ASPECT = refW / refH; // width / height

  // Measure the exact viewport width where the rows render
  const [rowsWidth, setRowsWidth] = useState(0);
  const SIDE_PADDING = useMemo(() => {
    if (!rowsWidth) return 0;
    return Math.max(0, (rowsWidth - BOX.WIDTH) / 2);
  }, [rowsWidth]);
  
  return (
    <View style={styles.screen}>
      {/* Background reference image */}
      <View style={styles.reference}>
        <Image
          source={REF_IMG}
          style={{ maxHeight: "100%", aspectRatio: ASPECT }}
          resizeMode="contain"
          opacity={0.2}
        />
      </View>

      <View style={styles.container}>
        <View style={styles.weatherBar}>
          <View style={styles.leftCluster}>
            <Image source={require("../assets/rain icon green.png")} style={{width: 30, height: 30}} />
              <View style={styles.weatherText}>
                <Text style={{ fontSize:16, color:"#7D7700", }}>27°C</Text>
                <Text style={{ fontSize:11, color:"#7D7700", }}>Remember to put on more clothe!{" ><"} </Text>
              </View>
          </View>
            <Image source={require("../assets/wardrobe analysis icon.png")} style={{width: 38, height: 38}} />
        </View>

        <View style={styles.labelBar}>
          <Pressable onPress={() => navigation.navigate("HomePage")}>
            <Image source={require("../assets/arrow.png")} style={{width: 18, height: 18}} />
          </Pressable>
          <View style={styles.filter}>
            <Image source={require("../assets/filter icon.png")} style={{width: 24, height: 22}} />
          </View>
          
          <FlatList
            horizontal
            data={LABELS}
            keyExtractor={(item) => item}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ width: 4 }} />}
            renderItem={({ item, index }) => (
              <View style={[styles.label]}>
                <View
                  style={[
                    styles.category,
                    // { backgroundColor: CATEGORY_COLORS[index % CATEGORY_COLORS.length] },
                  ]}
                />
                <Text style={styles.mostleastText}>{item}</Text>
              </View>
            )}
          />
        </View>

        {/* ROWS viewport (we measure width here) */}
        <View
          style={styles.ROWS}
          onLayout={(e) => setRowsWidth(e.nativeEvent.layout.width)}
        >
          <SwipeRow data={row1} sidePadding={SIDE_PADDING} />
          <SwipeRow data={row2} sidePadding={SIDE_PADDING} />
          <SwipeRow data={row3} sidePadding={SIDE_PADDING} />
        </View>

        <View style={styles.mostleast}>
          <View style={styles.card}>
            <View style={styles.frame}>
              <Image source={require("../assets/shoe 1.png")} style={{width:38, height: 38}} resizeMode="contain"/>
            </View>
            <View>
              <Text style={styles.mostleastText}>most used piece</Text>
              <Text style={styles.timesText}>29 times</Text>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.frame}>
              <Image source={require("../assets/bottom 2.png")} style={{width: 22, height: 22}} />
            </View>
            <View>
              <Text style={styles.mostleastText}>least used piece</Text>
              <Text style={styles.timesText}>3 times</Text>
            </View>
          </View>
        </View>

        <View style={styles.CallToActions}>
          <View style={styles.wrapper}>
  <Pressable onPress={() => navigation.navigate("StylingResultPage")} style={styles.stylingButton}>
    <Text style={styles.stylingText}>AI Styling</Text>
    <Image source={require("../assets/styling icon.png")} style={{ width: 22, height: 22, marginLeft: 4 }} />
  </Pressable>
</View>

          <Button 
            style={[styles.shuffleButton, { minWidth: 0 }]}
            onPress={() => navigation.navigate("ProfilePage")}
          >
            <Image source={require("../assets/shuffle icon.png")} style={{width: 24, height: 24, alignItems: "center", justifyContent: "center"}} />
          </Button>
        </View>

      </View>
    </View>
  );
};


function SwipeRow({ data, sidePadding }) {
  const listRef = useRef(null);
  const interval = BOX.WIDTH + SEP;
  const BUFFER = 1;

  // Create looping data: [lastItem, ...data, firstItem]
  const loopData = useMemo(() => {
    return data.length
      ? [...data.slice(-BUFFER), ...data, ...data.slice(0, BUFFER)]
      : [];
  }, [data]);

  const initialIndex = BUFFER; // start at first real item

  // Precalculate each snap position
  const snapOffsets = useMemo(
    () => loopData.map((_, i) => i * SNAP_INTERVAL),
    [loopData.length]
  );

  // Let FlatList know the exact layout to improve performance
  const getItemLayout = (_, index) => ({
    length: interval,
    offset: sidePadding + index * interval,
    index,
  });

  const onMomentumScrollEnd = (e) => {
    const offsetX = e.nativeEvent.contentOffset.x;

    const firstRealItemOffset = interval * BUFFER + sidePadding; 
    const lastRealItemOffset = interval * (data.length) + sidePadding;

    // If user scrolls *past* the last buffer, wrap to the first real item
    if (offsetX > lastRealItemOffset + interval / 2) {
      listRef.current?.scrollToOffset({
        offset: firstRealItemOffset,
        animated: false,
      });
    }

    // If user scrolls *past* the first buffer, wrap to the last real item
    if (offsetX < sidePadding + interval / 2) {
      listRef.current?.scrollToOffset({
        offset: lastRealItemOffset,
        animated: false,
      });
    }
  };

  useEffect(() => {
    // Initially start at the first real item
    setTimeout(() => {
      listRef.current?.scrollToOffset({
        offset: interval * initialIndex + sidePadding,
        animated: false,
      });
    }, 0);
  }, []);

  return (
    <FlatList
      ref={listRef}
      horizontal
      data={loopData}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={{ width: SEP }} />}
      renderItem={({ item }) => (
        <View style={styles.whiteBox}>
          <Image
            source={item.src}
            style={{ width: "100%", height: "85%" }}
            resizeMode="contain"
          />
        </View>
      )}
      getItemLayout={getItemLayout}
      contentContainerStyle={{ paddingHorizontal: sidePadding }}
      snapToAlignment="start"
      snapToOffsets={snapOffsets}
      disableIntervalMomentum
      decelerationRate="fast"
      scrollEventThrottle={16}
      onMomentumScrollEnd={onMomentumScrollEnd}
    />
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
    paddingTop: 52,
    gap:11,
    backgroundColor: "transparent", // keep transparent so bg shows through
  },

  weatherBar: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
    // marginBottom:"9",
  },

  leftCluster: {
    flexDirection: "row",
  },

  weatherText: {
    marginLeft: 4,
    marginTop: -4,
  },

  whiteBox: {
    width: BOX.WIDTH,
    height: BOX.HEIGHT,
    backgroundColor: "#FFFBF5",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  labelBar: {
    flexDirection: "row",
    alignItems:"center",
    gap:15,
    paddingHorizontal: 14,
  },

  label: {
    height:32,
    //flexWrap:"wrap",
    paddingHorizontal:16,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth:1,
    borderColor: "#7D7700",
    flexDirection: "row",
    gap:6,
  },

  filter: {
    height: 32,
    flexWrap:"wrap",
    paddingHorizontal: 8,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth:1,
    borderColor: "#7D7700",
    backgroundColor: "#7E3E00",
  },

  CallToActions: {
    flexDirection: "row",
    justifyContent:"center",
    alignItems:"center",
    gap:7,
  },

  ROWS: {
    gap:6,
  },

  card: {
    flexDirection: "row",
    gap:8,
    fontFamily: "PlayfairDisplay_400Regular", 
  },

  mostleastText: {
    fontSize:14,
    color: "#7D7700",
    fontFamily: "PlayfairDisplay_400Regular", 
    lineHeight: 20,
  },

  timesText: {
    fontSize:11,
    color: "#7D7700",
    fontFamily: "PlayfairDisplay_400Regular", 
    lineHeight:12,
  },

  frame: {
    height:34,
    width:34,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth:1,
    borderColor: "#A49C83",
  },

  wrapper: {
    width: 236,
    height: 52,
    borderWidth:1,
    borderColor: "#806D00",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },

  stylingButton: {
    width: 224,
    height: 42,
    backgroundColor: "#806D00",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    flexDirection:"row",
    
  },

  shuffleButton: {
    width: 52,
    height: 52,
    backgroundColor: "#806D00",
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },

  mostleast: {
    flexDirection: "row",
    justifyContent:"center",
    alignItems:"center",
    gap:8,
  },

  stylingText: {
    fontSize:16,
    color:"#D3CFC0",
    lineHeight: 28,
    marginTop:-3,
    fontFamily: "PlayfairDisplay_400Regular", 
  },

  category: {
    height: 16,
    width:16,
    borderRadius: 360,
    borderWidth:1,
    borderColor: "#7D7700",
  },
});