import { View, Text, StatusBar } from "react-native";
import React from "react";
import Onboarding from "./Onboarding";
import { primary } from "@/helper/color";
import Home from "./(tabs)/Home";

const index = () => {
  return (
    <View>
      <StatusBar backgroundColor={primary} />
      <Onboarding></Onboarding>
      {/* <Home></Home> */}
    </View>
  );
};

export default index;
