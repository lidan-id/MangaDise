import {
  View,
  Text,
  ImageSourcePropType,
  Image,
  StyleSheet,
  LayoutChangeEvent,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { DataProps } from "@/helper/interface";

const GenreCard = ({ item }: { item: DataProps }) => {
  const router = useRouter();
  const moveToDetails = () => {
    router.push({ pathname: "/Details/[id]", params: { id: item.id } });
  };
  return (
    <Pressable onPress={moveToDetails}>
      <View style={styles.container}>
        <Image style={styles.image} source={item.image}></Image>
        <View style={styles.right}>
          <Text style={styles.title}>{item.title}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingBottom: 3,
            }}
          >
            <Ionicons name="star" color={"red"}></Ionicons>
            <Text style={styles.rateFav}>{item.rate}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingBottom: 3,
            }}
          >
            <Ionicons
              style={{ alignSelf: "center" }}
              name="heart"
              color={"red"}
            ></Ionicons>
            <Text style={styles.rateFav}>Add to Favorite</Text>
          </View>
          <Text style={styles.chapter}>CHAPTER: {item.ch}</Text>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: "white",
              alignSelf: "flex-start",
              paddingRight: 8,
            }}
          >
            <Text style={styles.synopsis}>Synopsis</Text>
          </View>
          <Text style={styles.synopsisText} numberOfLines={4}>
            {item.synopsis}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default GenreCard;
const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: 400,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  image: { width: 150, height: "100%" },
  right: { paddingLeft: 20, flex: 1 },
  title: { color: "white", fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  rateFav: { color: "white", fontSize: 12, marginLeft: 5, fontWeight: "bold" },
  chapter: { color: "white", fontSize: 12, fontWeight: "bold" },
  synopsis: {
    color: "white",
    fontWeight: "bold",
    paddingBottom: 2,
  },
  synopsisText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
    lineHeight: 20,
    paddingTop: 5,
    // includeFontPadding: true,
  },
});
