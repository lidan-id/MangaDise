import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { cyan, primary } from "@/helper/color";
import CyanButton from "./CyanButton";
import { TopCardProps } from "@/helper/interface";
import { useRouter } from "expo-router";

const TopCard = ({ item }: { item: TopCardProps }) => {
  const router = useRouter();
  const moveToDetailsPage = () => {
    router.push({
      pathname: "/Details/[id]",
      params: { id: 1 },
    });
  };
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={item.image}>
        <LinearGradient
          locations={[0.6, 1]}
          colors={["transparent", primary]}
          style={{
            height: "100%",
            width: "100%",
            zIndex: 1,
          }}
        ></LinearGradient>
      </ImageBackground>
      <View style={styles.top}>
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Top {item.top}
        </Text>
      </View>
      <View style={styles.title}>
        <Text style={{ fontSize: 28, fontWeight: "bold", color: "white" }}>
          {item.title}
        </Text>
        <Text style={{ color: "white" }}>{item.author}</Text>
      </View>
      <View style={styles.readnow}>
        <CyanButton
          onpress={moveToDetailsPage}
          text="Read Now"
          height={40}
          width={90}
        ></CyanButton>
      </View>
    </View>
  );
};

export default TopCard;
const styles = StyleSheet.create({
  container: { width: "100%", height: 210 },
  image: { width: "100%", height: "100%" },
  top: {
    position: "absolute",
    backgroundColor: cyan,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 50,
    top: 15,
    left: 15,
  },
  title: { position: "absolute", bottom: 15, zIndex: 100, left: 15 },
  readnow: { position: "absolute", zIndex: 100, right: 15, bottom: 15 },
});
