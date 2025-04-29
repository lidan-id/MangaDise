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
import { TextInput } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storeData } from "@/asyncStorageServices/async";
import { useUserStore } from "@/zustand/userStore";

const Login = () => {
  const router = useRouter();
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const toggleIsPasswordSecure = () => {
    setIsPasswordSecure(!isPasswordSecure);
  };
  const moveToRegistration = () => {
    router.replace("./Registration");
  };
  const changeUser = useUserStore((state) => state.changeUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = () => {
    const url =
      "https://radiant-journey-81333-7ea1ab4922d5.herokuapp.com/user/signin";
    axios
      .post(url, { email: email, password: password })
      .then((response) => {
        const result = response.data;
        const { message, status, data } = result;
        console.log(message);
        // console.log(data);
        if (status === "SUCCESS") {
          storeData(data[0]); // store data to local
          changeUser({
            _id: data[0]._id,
            name: data[0].name,
            email: data[0].email,
            phoneNumber: data[0].phoneNumber,
            point: data[0].point,
            created_at: data[0].created_at,
          });
          router.replace("/Home");
        }
      })
      .catch((error) => {
        console.log(error.JSON());
      });
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
        <Text style={styles.loginText}>Log-in</Text>
        <Text style={styles.textInputTitle}>User ID / Email</Text>
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          theme={{ roundness: 8 }}
          cursorColor={primary}
          style={styles.textInput}
        ></TextInput>
        <Text style={styles.textInputTitle}>Password</Text>
        <TextInput
          secureTextEntry={isPasswordSecure}
          value={password}
          onChangeText={(text) => setPassword(text)}
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
        <Pressable>
          <Text style={styles.forgotPassword}>Forgor Password?</Text>
        </Pressable>
        <View style={styles.cyanButtonView}>
          <CyanButton
            text="Login"
            width={"100%"}
            height={40}
            onpress={login}
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
            Doesn't have an account?{" "}
          </Text>
          <Pressable onPress={moveToRegistration}>
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

export default Login;
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
  loginText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
    marginTop: 50,
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
  forgotPassword: {
    color: "white",
    fontSize: 10,
    marginTop: 10,
  },
  cyanButtonView: {
    marginTop: 20,
  },
});
