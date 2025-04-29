import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
  Pressable,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { format } from "date-fns";
const ChapterCard = ({
  id,
  chapter,
  comicName,
  totalCh,
  publish,
  price,
}: {
  id: string;
  chapter: number;
  comicName: string;
  totalCh: number;
  publish: Date;
  price: number;
}) => {
  const router = useRouter();
  const moveToReadPage = () => {
    if (price > 0) return;
    router.push({
      pathname: "/Read/[id,ch,comicName,totalCh]",
      params: { id: id, ch: chapter, comicName: comicName, totalCh: totalCh },
    });
  };

  return (
    <Pressable onPress={moveToReadPage}>
      <View
        style={
          chapter === 1
            ? [styles.container, { borderBottomWidth: 1 }]
            : styles.container
        }
      >
        <View style={styles.left}>
          <Text style={styles.text1}>Chapter {chapter}</Text>
          <Text style={styles.text2}>
            {format(new Date(publish), "MMMM do, yyyy")}
          </Text>
        </View>
        {price === 0 ? (
          <></>
        ) : (
          <Ionicons
            name="lock-closed-outline"
            color={"white"}
            size={20}
          ></Ionicons>
        )}
      </View>
    </Pressable>
  );
};

export default ChapterCard;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#AFAFAF",
    padding: 15,
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#AFAFAF",
  },
  left: {},
  text1: { color: "white", fontWeight: "bold" },
  text2: { color: "#AFAFAF" },
  image: {
    width: 25,
    height: 25,
  },
});
