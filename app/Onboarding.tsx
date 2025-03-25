import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  ImageBackground,
} from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { primary } from "@/helper/color";

import { LinearGradient } from "expo-linear-gradient";
import CyanButton from "./components/CyanButton";
import { useRouter } from "expo-router";

const Onboarding = () => {
  const router = useRouter();
  const startNow = () => {
    router.replace("/Login");
  };
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo.png")}></Image>
      <View style={styles.CyanButton}>
        <CyanButton
          onpress={startNow}
          width={"90%"}
          height={50}
          text="Start Now"
        ></CyanButton>
      </View>
      <ImageBackground
        resizeMode="contain"
        style={styles.phoneImage}
        source={require("../assets/onboardPhone.png")}
      >
        <LinearGradient
          locations={[0.4, 0.8]}
          colors={["transparent", primary]}
          style={{
            height: "100%",
            width: "150%",
            zIndex: 1,
          }}
        ></LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Onboarding;
const styles = StyleSheet.create({
  container: {
    backgroundColor: primary,
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  logo: {
    width: 130,
    height: 130,
    alignSelf: "center",
    zIndex: 100,
    marginTop: 70,
  },
  CyanButton: {
    marginBottom: 120,
    zIndex: 100,
  },
  phoneImage: {
    position: "absolute",
    width: "150%",
    height: "100%",
    alignSelf: "center",
    left: -430,
    bottom: -120,
  },
});
