import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { primary, secondary } from "@/helper/color";
import { data } from "@/helper/data";
import { DataProps } from "@/helper/interface";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import CategoryCard from "../components/CategoryCard";
import ChapterCard from "../components/ChapterCard";

const Details = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [currentData, setCurrentData] = useState<DataProps>();
  useEffect(() => {
    setCurrentData(data.find((item) => item.id === Number(id)));
  }, []);
  const moveToPreviousPage = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
                  {currentData?.title}
                </Text>
              </View>
            ),
            headerBackVisible: false,
          }}
        ></Stack.Screen>
        <ImageBackground
          source={currentData?.image}
          style={styles.imageBackground}
        >
          <LinearGradient
            locations={[0.4, 1]}
            colors={["rgba(39, 40, 49, 0.7)", primary]}
            style={{
              height: "100%",
              width: "150%",
              zIndex: 1,
              position: "absolute",
            }}
          ></LinearGradient>
        </ImageBackground>
        <View style={styles.imagenTitle}>
          <Image style={styles.image} source={currentData?.image}></Image>
          <View>
            <Text style={styles.title}>{currentData?.title}</Text>
            <View style={styles.addFav}>
              <Ionicons name="heart-outline" color={"red"}></Ionicons>
              <Text
                style={{
                  color: "white",
                  fontSize: 10,
                  fontWeight: "bold",
                  marginLeft: 5,
                }}
              >
                Add To Favorite
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.synopsis}>
          <Text numberOfLines={4} style={{ color: "white", lineHeight: 18 }}>
            {currentData?.synopsis}
          </Text>
          <Pressable style={{ marginTop: 5 }}>
            <Text
              style={{
                color: "white",
                textDecorationLine: "underline",
                fontSize: 13,
              }}
            >
              Read More
            </Text>
          </Pressable>
        </View>
        <View style={styles.category}>
          {currentData?.genre.map((e) => (
            <CategoryCard text={e}></CategoryCard>
          ))}
        </View>
        <View>
          {Array.from({ length: currentData?.ch || 0 }).map((e, index) => (
            <ChapterCard key={`chapter-${index}`} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Details;
const styles = StyleSheet.create({
  container: { height: "100%", backgroundColor: primary },
  imageBackground: {
    width: "100%",
    height: 250,
    position: "absolute",
    zIndex: 0,
  },
  imagenTitle: { flexDirection: "row", marginLeft: 15, marginTop: 20 },
  image: { width: 180, height: 280, marginRight: 20 },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 8,
    marginTop: 8,
  },
  addFav: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 8,
    padding: 10,
  },
  synopsis: {
    marginHorizontal: 15,
    marginTop: 20,
  },
  category: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    marginTop: 10,
  },
});
