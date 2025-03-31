import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { DataProps } from "@/helper/interface";
import { data } from "@/helper/data";
import { primary, secondary } from "@/helper/color";
import Ionicons from "@expo/vector-icons/Ionicons";

const { width } = Dimensions.get("window");

// Array of local images from your assets folder.
const localImages = [
  require("@/assets/read1.png"),
  require("@/assets/read2.png"),
  require("@/assets/read3.png"),
  require("@/assets/read4.png"),
  require("@/assets/read5.png"),
  require("@/assets/read6.png"),
  require("@/assets/read7.png"),
];

const ResponsiveImage = ({ imageSource }: any) => {
  // Default height value utk image
  const [imageHeight, setImageHeight] = useState(200);

  useEffect(() => {
    if (typeof imageSource === "number") {
      const { width: imgWidth, height: imgHeight } = Image.resolveAssetSource(imageSource);
      const ratio = imgHeight / imgWidth;
      setImageHeight(width * ratio);
    } else if (typeof imageSource === "string") {
      Image.getSize(
        imageSource,
        (imgWidth, imgHeight) => {
          const ratio = imgHeight / imgWidth;
          setImageHeight(width * ratio);
        },
        error => {
          console.error(`Error fetching image dimensions: ${error.message}`);
        }
      );
    }
  }, [imageSource]);

  return (
    <Image
      source={imageSource}
      style={[styles.topStartImage, { height: imageHeight }]}
      resizeMode="contain"
    />
  );
};

const Read = () => {
  const router = useRouter();
  const { id, ch } = useLocalSearchParams();
  const [currentData, setCurrentData] = useState<DataProps>();

  useEffect(() => {
    setCurrentData(data.find((item) => item.id === Number(id)));
  }, [id]);

  const moveToPreviousPage = () => {
    router.back();
  };

  const moveToPreviousChapter = () => {
    if (Number(ch) > 1) {
      router.push({
        pathname: "/Read/[id,ch]",
        params: { id: id, ch: Number(ch) - 1 },
      });
    }
  };

  const moveToNextChapter = () => {
    if (currentData?.ch === undefined) return;
    if (Number(ch) < currentData?.ch) {
      router.push({
        pathname: "/Read/[id,ch]",
        params: { id: id, ch: Number(ch) + 1 },
      });
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: currentData?.title,
          headerTitleStyle: { fontWeight: "bold" },
          headerShown: true,
          headerTintColor: "white",
          headerStyle: { backgroundColor: secondary },
          header: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 20,
                paddingHorizontal: 10,
                backgroundColor: secondary,
              }}
            >
              <Ionicons
                onPress={moveToPreviousPage}
                name="chevron-back-circle-outline"
                color={"white"}
                size={40}
              />
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  marginLeft: 15,
                  fontSize: 22,
                }}
              >
                {currentData?.title} - Chapter {ch}
              </Text>
            </View>
          ),
          headerBackVisible: false,
        }}
      ></Stack.Screen>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <View>
            {/* Replace the mapping with your localImages array */}
            {localImages.map((imgSource, index) => (
              <View key={index}>
                <ResponsiveImage imageSource={imgSource} />
              </View>
            ))}
          </View>
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            bottom: 120,
            width: "100%",
            height: 40,
            justifyContent: "space-around",
          }}
        >
          {ch === "1" ? (
            <View style={{ width: 40, height: 40 }}></View>
          ) : (
            <View style={styles.prev}>
              <Ionicons
                onPress={moveToPreviousChapter}
                name="chevron-back-outline"
                color={"white"}
                size={25}
              />
            </View>
          )}
          <View style={styles.chCount}>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 15,
              }}
            >
              {ch}/{currentData?.ch}
            </Text>
          </View>
          {Number(ch) === currentData?.ch ? (
            <View style={{ width: 40, height: 40 }}></View>
          ) : (
            <View style={styles.next}>
              <Ionicons
                onPress={moveToNextChapter}
                name="chevron-forward-outline"
                color={"white"}
                size={25}
              />
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default Read;

const styles = StyleSheet.create({
  container: { width: "100%", height: "100%" },
  // The image style sets the width to the device width.
  topStartImage: {
    width: width,
    backgroundColor: "black",
  },
  prev: {
    backgroundColor: primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    width: 40,
    height: 40,
  },
  chCount: {
    backgroundColor: primary,
    justifyContent: "center",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  next: {
    backgroundColor: primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    width: 40,
    height: 40,
  },
});
