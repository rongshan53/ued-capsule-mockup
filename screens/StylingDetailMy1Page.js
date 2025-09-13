import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  useWindowDimensions,
  FlatList,
  Modal,
} from "react-native";
import { Button } from 'react-native-paper';


const REF_IMG = require("../assets/styling detail my 1 reference.png");
const UP_IMG = require("../assets/my 1 up photo.png"); // overlay image

const INDIVIDUAL = [
  { src: require("../assets/clothe 1.png"), scale: 0.85 },
  { src: require("../assets/my 1 bottom 4.png"), scale: 0.85 },
  { src: require("../assets/my 1 bag.png") },
  { src: require("../assets/my 1 spec.png"), scale: 1.2 },
  { src: require("../assets/shoe 1.png"), scale: 1.2 },
];

export default function StylingDetailMy1Page({ navigation }) {
  const { width: screenW } = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);

  // background reference image sizing
  const { width: refW, height: refH } = Image.resolveAssetSource(REF_IMG);
  const refHDisplay = screenW * (refH / refW);

  // overlay “up photo” sizing
  const { width: upW, height: upH } = Image.resolveAssetSource(UP_IMG);
  const upHDisplay = screenW * (upH / upW);

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Wrapper sized exactly to the background image */}
        <View style={{ width: screenW, height: refHDisplay }}>
          {/* Background image (last layer) */}
          <Image
            source={REF_IMG}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: screenW,
              height: refHDisplay,
              opacity: 0.5,
            }}
            resizeMode="contain"
            pointerEvents="none"
          />

          {/* Overlay UI */}
          <Image
            source={UP_IMG}
            style={{
              left: 0,
              top: 0,
              width: screenW,
              height: upHDisplay,
            }}
            resizeMode="contain"
          />

          <View style={styles.three}>
            <View style={styles.two}>
              {/* Horizontal FlatList for wardrobe items */}
              <FlatList
                horizontal
                data={INDIVIDUAL}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, idx) =>
                  item.src ? String(item.src) : String(idx)
                }
                renderItem={({ item }) => (
                  <View style={styles.ModeBoxes}>
                    <Image
                      source={item.src}
                      style={{
                        width: "100%",
                        height: "100%",
                        transform: [{ scale: item.scale ?? 1 }],
                      }}
                      resizeMode="contain"
                    />
                  </View>
                )}
                ItemSeparatorComponent={() => <View style={{ width: 4 }} />}
              />

              {/* AI Rating and Labels */}
              <View style={styles.labelSession}>
                <View style={styles.rateline}>
                  <Text style={styles.rateText}>AI rate:</Text>
                  <View style={styles.rate}>
                    <Text style={styles.marks}>4.7</Text>
                    <View style={{ flexDirection: "row", gap: 1 }}>
                      <Image
                        source={require("../assets/filled star icon.png")}
                        style={{ width: 20, height: 20 }}
                      />
                      <Image
                        source={require("../assets/filled star icon.png")}
                        style={{ width: 20, height: 20 }}
                      />
                      <Image
                        source={require("../assets/filled star icon.png")}
                        style={{ width: 20, height: 20 }}
                      />
                      <Image
                        source={require("../assets/filled star icon.png")}
                        style={{ width: 20, height: 20 }}
                      />
                      <Image
                        source={require("../assets/star icon.png")}
                        style={{ width: 20, height: 20 }}
                      />
                    </View>
                  </View>
                </View>

                {/* Style Labels */}
                <View style={styles.labelline}>
                  <View style={styles.labelrow}>
                    <View style={[styles.label, { width: 112 }]}>
                      <View style={styles.circle}></View>
                      <Text style={styles.labelText}>Everyday</Text>
                    </View>
                    <View style={[styles.label, { width: 112 }]}>
                      <View style={styles.circle}></View>
                      <Text style={styles.labelText}>Effortless</Text>
                    </View>
                    <View style={[styles.label, { width: 96 }]}>
                      <View style={styles.circle}></View>
                      <Text style={styles.labelText}>Casual</Text>
                    </View>
                  </View>

                  <View style={styles.labelrow}>
                    <View style={[styles.label, { width: 135 }]}>
                      <View style={styles.circle}></View>
                      <Text style={styles.labelText}>Smart-Casual</Text>
                    </View>
                    <View style={[styles.label, { width: 128 }]}>
                      <View style={styles.circle}></View>
                      <Text style={styles.labelText}>Comfortable</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* Why it suits Me Section */}
            <View style={styles.bbottom}>
              <Text style={styles.title}>Why it suits Me</Text>

              <View style={styles.boxes}>
                <Image
                  source={require("../assets/my 1 spec 2.png")}
                  style={styles.photo}
                />
                <View style={styles.right}>
                  <Text style={styles.subtitle}>Transparent Glasses</Text>
                  <Text style={styles.pharagraph}>
                    The transparent glossy glasses add a highlight to your OOTD,
                    giving you a smarter yet effortlessly relaxed vibe! Thin-frame
                    style is especially recommended for a modern, light look.
                  </Text>
                </View>
              </View>

              <View style={styles.boxes}>
                <View style={styles.whiteBox}>
                  <Image
                    source={require("../assets/bottom 4.png")}
                    style={{ width: 95, height: 95 }}
                  />
                </View>
                <View style={styles.right}>
                  <Text style={styles.subtitle}>Jeans</Text>
                  <Text style={styles.pharagraph}>
                    Jeans bring out the youthful and casual charm while keeping
                    it refined. The bell-bottom cut not only flatters your legs
                    but also creates the illusion of added height, enhancing your
                    overall silhouette.
                  </Text>
                </View>
              </View>

              <View style={styles.boxes}>
                <View style={styles.whiteBox}>
                  <Image
                    source={require("../assets/my 1 bag.png")}
                    style={styles.photo}
                  />
                </View>
                <View style={styles.right}>
                  <Text style={styles.subtitle}>Silver Hand Bag</Text>
                  <Text style={styles.pharagraph}>
                    As a chic accent piece, silver hand bag adds a pop of shine
                    without overpowering the look. Its sleek shape ties the
                    whole outfit together, balancing elegance with everyday
                    wearability.
                  </Text>
                </View>
              </View>

              {/* Wear Button with Modal */}
              {/* Wear Button with Modal */}
<View>
  <Pressable
    style={styles.wearButton}
    onPress={() => {
      setModalVisible(true);
      // Automatically close the modal after 3 seconds
      setTimeout(() => {
        setModalVisible(false);
      }, 2000);
    }}
  >
    <Text style={styles.wearText}>Wear</Text>
    </Pressable>

    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)} // Android back button
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={{ fontSize: 18 }}>
            Marked as washed successfully!
          </Text>
        </View>
      </View>
    </Modal>
  </View>

            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#FFFBF5" },
  scrollContent: { backgroundColor: "#FFFBF5" },

  ModeBoxes: {
    width: 95,
    height: 116,
    borderRadius: 8,
    backgroundColor: "#FFFBF5",
    justifyContent: "center",
    alignItems: "center",
  },

  whiteBox: {
    width: 105,
    height: 105,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#7D7700",
    backgroundColor: "#FFFBF5",
    justifyContent: "center",
    alignItems: "center",
  },

  three: {
    paddingTop: 11,
    paddingLeft: 12,
    gap: 26,
  },

  two: {
    gap: 16,
  },

  marks: {
    fontSize: 19,
    color: "#7E3E00",
  },

  rateText: {
    fontFamily: "PlayfairDisplay_400Regular",
    fontSize: 17,
    color: "#7E3E00",
    marginBottom: 4,
    paddingLeft: 6,
  },

  rateline: {
    flexDirection: "row",
    gap: 16,
  },

  rate: {
    flexDirection: "row",
    gap: 8,
  },

  labelSession: {
    gap: 6,
  },

  labelrow: {
    width: "100%",
    gap: 6,
    flexDirection: "row",
  },

  labelline: {
    gap: 6,
  },

  label: {
    height: 28,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#7D7700",
    flexDirection: "row",
    gap: 6,
  },

  circle: {
    height: 16,
    width: 16,
    borderRadius: 360,
    borderWidth: 1,
    borderColor: "#7D7700",
  },

  labelText: {
    fontSize: 14,
    color: "#7D7700",
    lineHeight: 24,
  },

  pharagraph: {
    fontSize: 11,
    color: "#7D7700",
    width: 208,
    lineHeight: 14,
  },

  title: {
    fontSize: 20,
    color: "#7E3E00",
    fontFamily: "PlayfairDisplay_400Regular",
    lineHeight: 28,
  },

  subtitle: {
    fontSize: 20,
    color: "#504100",
    fontFamily: "PlayfairDisplay_400Regular",
    lineHeight: 28,
  },

  boxes: {
    width: 335,
    height: 125,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#7E3E00",
    flexDirection: "row",
    padding: 9,
    gap: 10,
  },

  photo: {
    width: 105,
    height: 105,
  },

  bbottom: {
    gap: 10,
  },

  right: {
    gap: 8,
  },

  overlay: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    width: 250,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },

  wearButton: {
  width: "98%",
  height: 36,
  backgroundColor: "#FFFBF5",
  borderRadius: 24,
  justifyContent: "center",  // center vertically
  alignItems: "center",      // center horizontally
},

wearText: {
  fontSize: 16,
  color: "#7D7700",
  lineHeight: 24,
},
});
