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
import { DataProps } from "@/helper/interface";

const RecentCard = ({
  item,
  chFontSize,
  titleFontSize,
  authorFontSize,
  padding,
}: {
  item: DataProps;
  chFontSize: number;
  titleFontSize: number;
  authorFontSize: number;
  padding?: number;
}) => {
  const router = useRouter();
  const moveToDetails = () => {
    router.push({ pathname: "/Details/[id]", params: { id: item.id } });
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
    </Pressable>
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
