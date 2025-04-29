import {
  View,
  Text,
  ImageSourcePropType,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import React from "react";
import { Comic } from "@/helper/interface";
import { useRouter } from "expo-router";

const FavoriteCard = ({ item }: { item: Comic }) => {
  const router = useRouter();
  const moveToDetails = () => {
    // router.push({ pathname: "/Details/[id]", params: { id: item.id } });
  };
  return (
    <Pressable style={{ width: "50%" }} onPress={moveToDetails}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {/* <Image style={styles.image} source={item.image}></Image> */}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{item.title}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default FavoriteCard;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  imageContainer: {
    height: 250,
  },
  image: { width: "100%", height: "100%" },
  textContainer: { flex: 1, paddingTop: 5, marginBottom: 3 },
  text: { color: "white", fontWeight: "bold", fontSize: 12 },
});
