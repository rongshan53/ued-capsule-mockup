import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/tab";
import loadResourcesAsync from "./utils/loadResourcesAsync";
import { useEffect } from "react";
import { useFonts,PlayfairDisplay_400Regular,} from "@expo-google-fonts/playfair-display";
import AppNavigator from "./navigation/tab";
import { PaperProvider } from 'react-native-paper';
// import { Provider as PaperProvider } from 'react-native-paper';
// import WardrobeScreen from './screens/WardrobePage';

//This is the first page will be shown
//Load resource will be call here too

// const App = (props: Props) => {
//   return (
//     <GestureHandlerRootView style={{flex:1}}>
//      <Text>App</Text>
//     </GestureHandlerRootView>
//   );
// };

export default function App() {
  useEffect(() => {
    async function prepare() {
      await loadResourcesAsync();
      setReady(true);
    }
    prepare();
  }, []);

  const [fontsLoaded] = useFonts({
    PlayfairDisplay_400Regular,
  });

  //down here is return the navigation tab
  //if you have onboardingscreen then need to call onboardingscreen here 1st
  
  return (
    <NavigationContainer>
      <Tabs />
      {/* <PaperProvider>
        <WardrobeScreen />
      </PaperProvider> */}
      
    </NavigationContainer>
  );

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
