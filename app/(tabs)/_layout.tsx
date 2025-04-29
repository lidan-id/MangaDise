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
        }}
      />
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
        }}
      />
    </Tabs>
  );
}
