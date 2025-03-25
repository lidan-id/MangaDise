import {
  View,
  Text,
  StyleSheet,
  ImageSourcePropType,
  Image,
} from "react-native";
import React from "react";
import { cyan } from "@/helper/color";
interface RecentCardProps {
  title: string;
  author: string;
  ch: number;
  image: ImageSourcePropType;
}
const RecentCard = ({
  item,
  chFontSize,
  titleFontSize,
  authorFontSize,
  padding,
}: {
  item: RecentCardProps;
  chFontSize: number;
  titleFontSize: number;
  authorFontSize: number;
  padding?: number;
}) => {
  return (
    <View
      style={[
        styles.container,
        { paddingBottom: padding, paddingHorizontal: padding },
      ]}
    >
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={item.image}></Image>
        <View style={styles.ch}>
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: chFontSize,
            }}
          >
            {item.ch} CH
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
  );
};

export default RecentCard;
const styles = StyleSheet.create({
  container: { height: "100%", width: "100%" },
  imageContainer: { height: "80%" },
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
