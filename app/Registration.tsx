import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Pressable,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { cyan, primary } from "@/helper/color";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import CyanButton from "./components/CyanButton";
import { TextInput, RadioButton } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

const Registration = () => {
  const router = useRouter();
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const toggleIsPasswordSecure = () => {
    setIsPasswordSecure(!isPasswordSecure);
  };
  const moveToLogin = () => {
    router.replace("/Login");
  };
  const [isChecked, setIsChecked] = useState(false);
  const toggleRadio = () => {
    setIsChecked(!isChecked);
  };
  const createAccount = () => {
    router.replace("./Home");
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={primary} />
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
      <View style={styles.loginCard}>
        <Image
          style={styles.logo}
          source={require("../assets/logo.png")}
        ></Image>
        <Text style={styles.registrationText}>Registration</Text>
        <Text style={styles.textInputTitle}>Name</Text>
        <TextInput
          theme={{ roundness: 8 }}
          cursorColor={primary}
          style={styles.textInput}
        ></TextInput>
        <Text style={styles.textInputTitle}>Email</Text>
        <TextInput
          theme={{ roundness: 8 }}
          cursorColor={primary}
          style={styles.textInput}
        ></TextInput>
        <Text style={styles.textInputTitle}>Password</Text>
        <TextInput
          secureTextEntry={isPasswordSecure}
          theme={{ roundness: 8 }}
          cursorColor={primary}
          style={styles.textInput}
          right={
            <TextInput.Icon
              icon={() => (
                <Ionicons
                  name={isPasswordSecure ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="black"
                />
              )}
              onPress={toggleIsPasswordSecure}
            />
          }
        ></TextInput>
        <Text style={styles.textInputTitle}>Confirm Password</Text>
        <TextInput
          secureTextEntry={isPasswordSecure}
          theme={{ roundness: 8 }}
          cursorColor={primary}
          style={styles.textInput}
          right={
            <TextInput.Icon
              icon={() => (
                <Ionicons
                  name={isPasswordSecure ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="black"
                />
              )}
              onPress={toggleIsPasswordSecure}
            />
          }
        ></TextInput>
        <Text style={styles.textInputTitle}>Phone Number</Text>
        <TextInput
          contentStyle={{ paddingLeft: 5 }}
          placeholder="+62"
          placeholderTextColor={"#C1C1C1"}
          secureTextEntry={isPasswordSecure}
          theme={{ roundness: 8 }}
          cursorColor={primary}
          style={styles.textInput}
          left={
            <TextInput.Icon
              style={{ paddingLeft: 0, marginLeft: 0 }}
              icon={() => (
                <Image
                  style={styles.indoPhoneImage}
                  source={require("../assets/indo.png")}
                ></Image>
              )}
              onPress={toggleIsPasswordSecure}
            />
          }
        ></TextInput>
        <View style={styles.radioButton}>
          <View
            style={{
              transform: [{ scale: 0.8 }],
            }}
          >
            <RadioButton
              uncheckedColor="white"
              color="white"
              value="first"
              status={isChecked ? "checked" : "unchecked"}
              onPress={toggleRadio}
            ></RadioButton>
          </View>
          <Pressable>
            <Text style={styles.policy}>
              I agree to MANGADISE's Terms of Use and PrivacyPolicy
            </Text>
          </Pressable>
        </View>
        <View style={styles.cyanButtonView}>
          <CyanButton
            text="Create Account"
            width={150}
            height={35}
            onpress={createAccount}
          ></CyanButton>
        </View>
        <View
          style={{
            display: "flex",
            alignSelf: "center",
            marginTop: 10,
            marginBottom: 50,
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 10, color: "white" }}>
            Already have an account?{" "}
          </Text>
          <Pressable onPress={moveToLogin}>
            <Text
              style={{
                fontSize: 10,
                color: cyan,
                textDecorationLine: "underline",
              }}
            >
              Click here
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Registration;
const styles = StyleSheet.create({
  container: {
    backgroundColor: primary,
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  phoneImage: {
    position: "absolute",
    width: "150%",
    height: "100%",
    alignSelf: "center",
    left: -430,
    bottom: -120,
  },
  loginCard: {
    backgroundColor: primary,
    width: "90%",
    alignSelf: "center",
    borderRadius: 8,
    zIndex: 2,
    paddingHorizontal: 20,
  },
  logo: {
    width: 130,
    height: 130,
    alignSelf: "center",
    marginTop: 30,
  },
  registrationText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
    marginTop: 30,
  },
  textInputTitle: {
    color: "white",
    fontSize: 10,
    marginTop: 10,
  },
  textInput: {
    color: primary,
    overflow: "hidden",
    borderRadius: 8,
    height: 45,
    backgroundColor: "white",
    fontSize: 12,
  },
  indoPhoneImage: { width: 20, height: 20 },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  policy: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  cyanButtonView: {
    marginTop: 20,
  },
});
