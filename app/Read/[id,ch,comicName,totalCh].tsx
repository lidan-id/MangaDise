import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Chapter, DataProps } from "@/helper/interface";
import { data } from "@/helper/data";
import { primary, secondary } from "@/helper/color";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";
import Skeleton from "../Skeleton";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

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
      const { width: imgWidth, height: imgHeight } =
        Image.resolveAssetSource(imageSource);
      const ratio = imgHeight / imgWidth;
      setImageHeight(width * ratio);
    } else if (typeof imageSource === "string") {
      Image.getSize(
        imageSource,
        (imgWidth, imgHeight) => {
          const ratio = imgHeight / imgWidth;
          setImageHeight(width * ratio);
        },
        (error) => {
          console.error(`Error fetching image dimensions: ${error.message}`);
        }
      );
    }
  }, [imageSource]);

  return (
    <Image
      source={{ uri: imageSource }}
      style={[styles.topStartImage, { height: imageHeight }]}
      resizeMode="contain"
    />
  );
};

const Read = () => {
  const opacity = useSharedValue(1); // animation
  const animatedControlsStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });
  const router = useRouter();
  const {
    id,
    ch,
    comicName,
    totalCh,
  }: { id: string; ch: string; comicName: string; totalCh: string } =
    useLocalSearchParams();
  const [linkImages, setLinkImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    console.log("hai");
    const url = `https://radiant-journey-81333-7ea1ab4922d5.herokuapp.com/chapter/chapter-images?komikName=${comicName}&chapter=Chapter%200${ch}`;
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        const result = response.data;
        setLinkImages(result.images);
        console.log(result.images);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [ch]);
  if (isLoading) {
    return <Skeleton></Skeleton>;
  }
  const moveToPreviousPage = () => {
    router.back();
  };

  const moveToPreviousChapter = () => {
    if (!visible) return;
    if (Number(ch) > 1) {
      router.push({
        pathname: "/Read/[id,ch,comicName,totalCh]",
        params: {
          id: id,
          ch: Number(ch) - 1,
          comicName: comicName,
          totalCh: Number(totalCh),
        },
      });
    }
  };

  const moveToNextChapter = () => {
    if (!visible) return;
    if (totalCh === undefined) return;
    if (Number(ch) < Number(totalCh)) {
      router.push({
        pathname: "/Read/[id,ch,comicName,totalCh]",
        params: {
          id: id,
          ch: Number(ch) + 1,
          comicName: comicName,
          totalCh: Number(totalCh),
        },
      });
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: comicName,
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
                {comicName}- Chapter {ch}
              </Text>
            </View>
          ),
          headerBackVisible: false,
        }}
      ></Stack.Screen>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 100 }}
          onScrollBeginDrag={() => {
            setVisible(false);
            opacity.value = withTiming(0, {
              duration: 500,
              // easing: Easing.inOut(Easing.ease),
            });
          }}
        >
          <Pressable
            onPress={() => {
              setVisible(true);

              opacity.value = withTiming(1, {
                duration: 500,
                // easing: Easing.inOut(Easing.ease),
              });
            }}
          >
            <View>
              {linkImages.map((imgSource, index) => (
                <View key={index}>
                  <ResponsiveImage imageSource={imgSource} />
                </View>
              ))}
            </View>
          </Pressable>
        </ScrollView>

        <Animated.View
          style={[
            {
              flexDirection: "row",
              position: "absolute",
              bottom: 120,
              width: "100%",
              height: 40,

              justifyContent: "space-around",
            },
            animatedControlsStyle,
          ]}
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
              {ch}/{totalCh}
            </Text>
          </View>
          {Number(ch) === Number(totalCh) ? (
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
        </Animated.View>
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
