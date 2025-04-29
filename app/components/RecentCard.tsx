import {
  View,
  Text,
  StyleSheet,
  ImageSourcePropType,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import { cyan } from "@/helper/color";
import { useRouter } from "expo-router";
import { Comic, DataProps } from "@/helper/interface";

const RecentCard = ({
  item,
  chFontSize,
  titleFontSize,
  authorFontSize,
  padding,
}: {
  item: Comic;
  chFontSize: number;
  titleFontSize: number;
  authorFontSize: number;
  padding?: number;
}) => {
  const router = useRouter();
  const moveToDetails = () => {
    router.push({
      pathname: "/Details/[id]",
      params: { id: item._id },
    });
  };
  return (
    <Pressable onPress={moveToDetails}>
      <View
        style={[
          styles.container,
          { paddingBottom: padding, paddingHorizontal: padding },
        ]}
      >
        <View style={styles.imageContainer}>
          <View>
            <Image style={styles.image} source={{ uri: item.cover }}></Image>
          </View>
          <View style={styles.ch}>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: chFontSize,
              }}
            >
              {item.totalChapter} CH
            </Text>
          </View>
        </View>
        <View style={styles.detailContainer}>
          <Text
            style={{
              color: "white",
              fontSize: titleFontSize,
              fontWeight: "bold",
            }}
            numberOfLines={1}
          >
            {item.title}
          </Text>
          <Text
            numberOfLines={1}
            style={{ color: "white", fontSize: authorFontSize }}
          >
            {item.author}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default RecentCard;
const styles = StyleSheet.create({
  container: { height: "100%", width: "100%" },
  imageContainer: { height: "80%", backgroundColor: "grey" },
  image: { width: "100%", height: "100%" },
  ch: {
    position: "absolute",
    backgroundColor: cyan,
    height: "15%",

    bottom: 5,
    left: 5,
    borderRadius: 3,
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  detailContainer: { flex: 1, justifyContent: "flex-end" },
});
