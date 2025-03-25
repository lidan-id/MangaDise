import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { primary } from "@/helper/color";
import SearchBar from "../components/SearchBar";
import FavoriteCard from "../components/FavoriteCard";
import { data } from "@/helper/data";

const Favorite = () => {
  const [searchText, setSearchText] = useState("");
  let searchCount = 0;
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        onlyTab={false}
        left={
          <Image
            style={{ width: 45, height: 45 }}
            source={require("../../assets/simbol.png")}
          ></Image>
        }
        setSearchText={setSearchText}
      ></SearchBar>
      <Text style={styles.highlightText}>Favorite</Text>
      <ScrollView>
        <View style={styles.scrollViewContainer}>
          {data.map((e, index) =>
            e.title.includes(searchText.trim()) ? (
              ((searchCount += 1),
              (<FavoriteCard key={index} item={e}></FavoriteCard>))
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
    </SafeAreaView>
  );
};

export default Favorite;
const styles = StyleSheet.create({
  container: { backgroundColor: primary, height: "100%" },
  highlightText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    paddingLeft: 15,
    paddingTop: 15,
  },
  scrollViewContainer: { flexDirection: "row", flexWrap: "wrap" },
});
