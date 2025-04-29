import { View, StatusBar, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import Onboarding from "./Onboarding";
import { primary } from "@/helper/color";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserStore } from "@/zustand/userStore";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasUser, setHasUser] = useState(false);
  const router = useRouter();
  const changeUser = useUserStore((state) => state.changeUser);
  useEffect(() => {
    const checkUser = async () => {
      try {
        const value = await AsyncStorage.getItem("user");
        if (value) {
          setHasUser(true);
          const user = JSON.parse(value);
          // console.log(value);
          changeUser({
            _id: user.id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            point: user.point,
            created_at: user.created_at,
          });
          router.replace("/(tabs)/Home");
        } else {
          setHasUser(false);
        }
      } catch (e) {
        console.error(e);
        setHasUser(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, [router]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={primary} />
      </View>
    );
  }

  if (!hasUser) {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor={primary} />
        <Onboarding />
      </View>
    );
  }

  return null;
};

export default Index;
