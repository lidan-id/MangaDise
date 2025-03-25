import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import TabBar from "../components/TabBar";
// import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="Favorite"
        options={{
          title: "Favorite",
          // tabBarIcon: ({ color }) => (
          //   <Ionicons size={28} name="home" color={color} />
          // ),
        }}
      />
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          // tabBarIcon: ({ color }) => (
          //   <Ionicons size={28} name="home" color={color} />
          // ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          // tabBarIcon: ({ color }) => (
          //   <Ionicons size={28} name="home" color={color} />
          // ),
        }}
      />
    </Tabs>
  );
}
