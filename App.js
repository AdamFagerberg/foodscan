import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import HomeScreen from "./components/HomeScreen";
import { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CameraScreen from "./components/CameraScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailsScreen from "./components/DetailsScreen";
import FetchScreen from "./components/FetchScreen";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Home({ prevScans }) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeScreen"
        options={{
          title: "Your Recent Scans",
          tabBarLabel: "Meals",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="fast-food" size={24} color="black" />
          ),
        }}
      >
        {(props) => <HomeScreen {...props} prevScans={prevScans} />}
      </Tab.Screen>
      <Tab.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{
          title: "Scan a barcode",
          tabBarLabel: "Scan",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="barcode-scan"
              size={24}
              color="black"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [prevScans, setPrevScans] = useState([]);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" options={{ headerShown: false }}>
            {(props) => (
              <Home
                {...props}
                prevScans={prevScans}
                setPrevScans={setPrevScans}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Fetch" options={{ title: "Details" }}>
            {(props) => <FetchScreen {...props} setPrevScans={setPrevScans} />}
          </Stack.Screen>
          <Stack.Screen name="Details" options={{ title: "Details" }}>
            {(props) => (
              <DetailsScreen {...props} setPrevScans={setPrevScans} />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
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
