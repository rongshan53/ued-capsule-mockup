import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomePage from "../screens/HomePage";
import WardrobePage from "../screens/WardrobePage";
import ArPage from "../screens/ArPage";
import LaundryPage from "../screens/LaundryPage";
import AnnouncementPage from "../screens/ProfilePage";
import { View, StyleSheet, Animated,Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import ProfilePage from "../screens/ProfilePage";
import StylingResultPage from "../screens/StylingResultPage";
import StylingDetailMy1Page from "../screens/StylingDetailMy1Page";
import StylingDetailMy2Page from "../screens/StylingDetailMy2Page";
import StylingDetailMy3Page from "../screens/StylingDetailMy3Page";

//Stack navigator here is means that inside home page, there are some internal screens
//HomePage
// --> Announcement
// --> Exhibition
// --> Facilities

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const WardrobeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomePage" component={HomePage} />
      <HomeStack.Screen name="WarbrobePage" component={WardrobePage} />
      <HomeStack.Screen name="ArPage" component={ArPage} />
      <HomeStack.Screen name="LaundryPage" component={LaundryPage} />
      <HomeStack.Screen name="ProfilePage" component={ProfilePage} />
    </HomeStack.Navigator>
  );
}

function WardrobeStackScreen() {
  return (
    <WardrobeStack.Navigator screenOptions={{ headerShown: false }}>
      <WardrobeStack.Screen name="WardrobePage" component={WardrobePage} />
      <WardrobeStack.Screen name="StylingResultPage" component={StylingResultPage} />
      <WardrobeStack.Screen name="StylingDetailMy1Page" component={StylingDetailMy1Page} />
      <WardrobeStack.Screen name="StylingDetailMy2Page" component={StylingDetailMy2Page} />
      <WardrobeStack.Screen name="StylingDetailMy3Page" component={StylingDetailMy3Page} />
    </WardrobeStack.Navigator>
  );
}


//headerShown is the header on top, false is hide the header
//can see the icon design using this link, the iconicons
//https://oblador.github.io/react-native-vector-icons/
//if you have customise icon, then need to use image tag to call it and link it to ur asset
//component is linking with the page,
//to customise the bottom tab bar UI, can add this tabBarStyle under the screenOptions
//more options to customize, pls refer to the documentation here
//https://reactnavigation.org/docs/bottom-tab-navigator/
export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "rgba(255, 251, 245,1)",
          width: "94%",
          height: 51,
          borderRadius: 10,
          borderBottomLeftRadius: 50,   // round only top-left
          borderBottomRightRadius: 50,  // round only top-right
          position: "absolute",
          bottom: 51,
          marginInline: 10,
          paddingInline:18,
    
        },
      }}
    >
      <Tab.Screen 
        name="HomePage"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({focused }) => (
            <View style={styles.iconContainer}>
              <Image 
                source={
                  focused 
                    ? require("../assets/homeIcon selected.png")
                    : require("../assets/homeIcon.png")
                }
                style={{
                  width: focused ? 52 : 28,   // normal slightly bigger
                  height: focused ? 52 : 28,
                  marginTop: 11,
                }} 
              />
            </View>
            ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="WardrobePage"
        component={WardrobeStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Image 
                source={
                  focused 
                    ? require("../assets/wardrobeIcon selected.png")
                    : require("../assets/wardrobeIcon.png")
                }
                style={{
                  width: focused ? 52 : 28,   // normal slightly bigger
                  height: focused ? 52 : 28,
                  marginTop: 11,
                }} 
              />
            </View>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="ArPage"
        component={ArPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Image 
                source={
                  focused 
                    ? require("../assets/arIcon selected.png")
                    : require("../assets/arIcon.png")
                }
                style={{
                  width: focused ? 52 : 28,   // normal slightly bigger
                  height: focused ? 52 : 28,
                  marginTop: 11,
                }} 
              />
            </View>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="LaundryPage"
        component={LaundryPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Image 
                source={
                  focused 
                    ? require("../assets/laundryIcon selected.png")
                    : require("../assets/laundryIcon.png")
                }
                style={{
                  width: focused ? 52 : 28,   // normal slightly bigger
                  height: focused ? 52 : 28,
                  marginTop: 11,
                }} 
              />
            </View>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="ProfilePage"
        component={ProfilePage}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Image 
                source={
                  focused 
                    ? require("../assets/profileIcon selected.png")
                    : require("../assets/profileIcon.png")
                }
                style={{
                  width: focused ? 52 : 28,   // normal slightly bigger
                  height: focused ? 52 : 28,
                  marginTop: 11,
                }} 
              />
            </View>
          ),
        }}
      ></Tab.Screen> 
    </Tab.Navigator>
  );
}

// export default function AppNavigator() {
//   return (
//     <RootStack.Navigator screenOptions={{ headerShown: false }}>
//       <RootStack.Screen name="Tabs" component={Tabs} />
//       {/* NEW route name must match what you navigate to */}
//       <RootStack.Screen name="StylingResultPage" component={StylingResultPage} />
//     </RootStack.Navigator>
//   );
// }

const styles = StyleSheet.create({});
