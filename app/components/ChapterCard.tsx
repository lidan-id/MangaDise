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

const ChapterCard = ({ chapter, id }: { chapter: number; id: number }) => {
  const router = useRouter();
  const moveToReadPage = () => {
    router.push({ pathname: "/Read/[id,ch]", params: { id: id, ch: chapter } });
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
          <Text style={styles.text2}>19 June 2022</Text>
        </View>
        <Image
          style={styles.image}
          source={require("../../assets/download.png")}
        ></Image>
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
