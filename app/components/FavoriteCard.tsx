import {
  View,
  Text,
  ImageSourcePropType,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
interface FavoriteCardProps {
  title: string;
  author: string;
  ch: number;
  image: ImageSourcePropType;
}
const FavoriteCard = ({ item }: { item: FavoriteCardProps }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={item.image}></Image>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{item.title}</Text>
      </View>
    </View>
  );
};

export default FavoriteCard;
const styles = StyleSheet.create({
  container: {
    width: "50%",
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
