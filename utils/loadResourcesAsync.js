import * as Font from "expo-font";
import { Asset } from "expo-asset";

//if you have more customise fonts or bigger image/video that need to loaded when start the application
//can insert here
export default async function loadResourcesAsync() {
  await Promise.all([
    Font.loadAsync({
      PinkMarch: require("../assets/fonts/PinkMarch.ttf"),
      // AnotherFont: require("../assets/fonts/font2.ttf"),
    }),
    Asset.loadAsync([require("../assets/icon.png")]),
  ]);
}
