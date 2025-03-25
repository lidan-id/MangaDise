import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  ImageSourcePropType,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import SearchBar from "../components/SearchBar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { primary } from "@/helper/color";
import { data } from "@/helper/data";
import GenreCard from "../components/GenreCard";
import FavoriteCard from "../components/FavoriteCard";
import { DataProps } from "@/helper/interface";

const Genre = () => {
  const router = useRouter();
  const moveToPreviousPage = () => {
    router.back();
  };
  const [searchText, setSearchText] = useState("");
  let searchCount = 0;
  const { id } = useLocalSearchParams();
  const [specificData, setSpecificData] = useState<DataProps[]>([]);
  useEffect(() => {
    setSpecificData(data.filter((item) => item.genre.includes(id as string)));
  }, [id]);
  return (
    <SafeAreaView style={styles.container}>
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

      <Text style={styles.textGenre}>{id}</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {specificData.map((e, index) =>
            e.title.includes(searchText) ? (
              ((searchCount += 1),
              (
                <View key={index} style={{ height: 240 }}>
                  <GenreCard item={e}></GenreCard>
                </View>
              ))
            ) : searchCount === 0 && index === specificData.length - 1 ? (
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

export default Genre;
const styles = StyleSheet.create({
  container: { height: "100%", backgroundColor: primary },
  textGenre: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
});
