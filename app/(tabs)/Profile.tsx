import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import React from "react";
import { primary, secondary } from "@/helper/color";
import { Tabs, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import ProfileCard from "../components/ProfileCard";
import { deleteUser } from "@/asyncStorageServices/async";
import { useUserStore } from "@/zustand/userStore";

const Profile = () => {
  const router = useRouter();
  const logout = () => {
    deleteUser();
    router.replace("/Login");
  };
  const userName = useUserStore((state) => state.name);
  const userPoint = useUserStore((state) => state.point);
  return (
    <SafeAreaView style={styles.container}>
      <Tabs.Screen
        options={{
          headerTitleStyle: { fontWeight: "bold" },
          headerShown: true,
          headerTintColor: "white",
          headerStyle: { backgroundColor: secondary },
        }}
      ></Tabs.Screen>
      <View style={styles.profile}>
        <View style={styles.wrapLeft}>
          <View style={styles.avatar}>
            <Ionicons name="person" color={"white"} size={40}></Ionicons>
          </View>
          <View>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 23 }}>
              {userName}
            </Text>
            <View style={{ height: 3 }}></View>
            <Text style={{ color: "white", fontSize: 13 }}>Edit profile</Text>
          </View>
        </View>
        <Ionicons
          name="chevron-forward-outline"
          color={"#B1B1B1"}
          size={20}
        ></Ionicons>
      </View>
      {/* <ProfileCard title="Theme"></ProfileCard>
      <ProfileCard title="Download"></ProfileCard>
      <ProfileCard title="Help Centre"></ProfileCard>
      <ProfileCard title="Settings"></ProfileCard> */}

      <View style={[styles.pointContainer, { backgroundColor: primary }]}>
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Point : {userPoint}
        </Text>
        <Pressable>
          <View style={styles.pointTopUpContainer}>
            <Text style={{ fontSize: 11, fontWeight: "bold" }}>TOP UP</Text>
          </View>
        </Pressable>
      </View>

      <ProfileCard
        title="Log Out"
        onpress={logout}
        backgroundColor="#321616"
        icon="log-out-outline"
        textColor="#FF0000"
        iconColor="#FF0000"
      ></ProfileCard>

      {/* <ProfileCard></ProfileCard> */}
    </SafeAreaView>
  );
};

export default Profile;
const styles = StyleSheet.create({
  container: { height: "100%", backgroundColor: primary },
  profile: {
    borderBottomColor: "#5C5C5C",
    borderBottomWidth: 1,
    flexDirection: "row",
    padding: 10,
    paddingRight: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  wrapLeft: { flexDirection: "row", alignItems: "center" },
  avatar: {
    borderWidth: 1,
    borderRadius: 200,
    borderColor: "white",
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5C5C5C",
    marginRight: 20,
  },
  pointContainer: {
    borderBottomWidth: 1,
    borderColor: "#5C5C5C",
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pointTopUpContainer: {
    backgroundColor: "gold",
    padding: 6,
    borderRadius: 10,
  },
});
