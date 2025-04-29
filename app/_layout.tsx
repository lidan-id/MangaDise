import { primary } from "@/helper/color";
import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        animation: "none",
        contentStyle: { backgroundColor: primary },
        headerStyle: { backgroundColor: primary },
        headerTintColor: primary,
      }}
      initialRouteName="index"
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="Onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="Login" options={{ headerShown: false }} />
      <Stack.Screen name="Registration" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="Search" options={{ headerShown: false }} />
      <Stack.Screen name="Genre/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="Details/[id]" options={{ headerShown: false }} />
      <Stack.Screen
        name="Read/[id,ch,comicName,totalCh]"
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen name="Point" options={{ headerShown: false }} /> */}
    </Stack>
  );
}
