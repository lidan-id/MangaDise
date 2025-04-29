import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { primary } from "@/helper/color";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "./components/SearchBar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import CategoryCard from "./components/CategoryCard";
import RecentCard from "./components/RecentCard";
import { Comic } from "@/helper/interface";
import axios from "axios";

const Search = () => {
  const router = useRouter();
  const moveToPreviousPage = () => {
    router.back();
  };
  const [searchText, setSearchText] = useState("");
  let searchCount = 0;
  const [data, setData] = useState<Comic[]>([]);
  useEffect(() => {
    const url =
      "https://radiant-journey-81333-7ea1ab4922d5.herokuapp.com/komik/searchKomik";
    axios
      .get(url)
      .then((response) => {
        const result = response.data;
        const { status, message, data } = result;
        setData(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <SafeAreaView style={{ backgroundColor: primary, height: "100%" }}>
      <SearchBar
        setSearchText={setSearchText}
        onlyTab={false}
        left={
          <Ionicons
            onPress={moveToPreviousPage}
            name="chevron-back-circle-outline"
            color={"white"}
            size={40}
          ></Ionicons>
        }
      ></SearchBar>
      {searchText === "" ? (
        <View style={styles.container}>
          <View style={styles.topSide}>
            <Image
              style={styles.image}
              source={require("../assets/search.png")}
            ></Image>
            <Text style={styles.text}>
              You haven't search anything, type anything on the search box
            </Text>
          </View>
          <View style={styles.divider}></View>
          <View style={styles.categoryCards}>
            <CategoryCard text="Action"></CategoryCard>
            <CategoryCard text="Adventure"></CategoryCard>
            <CategoryCard text="Psychological"></CategoryCard>
            <CategoryCard text="Drama"></CategoryCard>
            <CategoryCard text="Fantasy"></CategoryCard>
            <CategoryCard text="Magic"></CategoryCard>
            <CategoryCard text="Comedy"></CategoryCard>
            <CategoryCard text="Slice of Life"></CategoryCard>
            <CategoryCard text="Horror"></CategoryCard>
            <CategoryCard text="Romance"></CategoryCard>
          </View>
        </View>
      ) : (
        <ScrollView>
          <View style={styles.scrollViewContainer}>
            {data.map((e, index) =>
              e.title.includes(searchText.trim()) ? (
                ((searchCount += 1),
                (
                  <View key={index} style={{ width: "33%", height: 210 }}>
                    <RecentCard
                      item={e}
                      chFontSize={9}
                      titleFontSize={15}
                      authorFontSize={10}
                      padding={15}
                    ></RecentCard>
                  </View>
                ))
              ) : searchCount === 0 && index === data.length - 1 ? (
                <Text
                  key={index}
                  style={{
                    color: "#7E7E7E",
                    fontSize: 20,
                    marginLeft: 15,
                    fontWeight: "bold",
                  }}
                >
                  Not Found
                </Text>
              ) : (
                <View key={index} />
              )
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Search;
const styles = StyleSheet.create({
  container: {},
  topSide: { alignItems: "center", padding: 50, marginHorizontal: 15 },
  image: { width: 90, height: 90, marginBottom: 15 },
  text: { color: "#7E7E7E", textAlign: "center" },
  divider: {
    borderBottomWidth: 1,
    borderColor: "white",
    marginHorizontal: 15,
  },
  categoryCards: {
    marginTop: 25,
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 10,
  },
  scrollViewContainer: {
    marginTop: 15,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
