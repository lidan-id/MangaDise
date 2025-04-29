import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { primary, secondary } from "@/helper/color";
import SearchBar from "../components/SearchBar";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import RecentCard from "../components/RecentCard";
import axios from "axios";

import { Comic } from "@/helper/interface";
import Test from "../Skeleton";
import TopCard from "../components/TopCard";
const width = Dimensions.get("window").width;
const Home = () => {
  const [comic, setComic] = useState<Comic[]>([]);
  const [latestComic, setLatestComic] = useState<Comic[]>([]);
  const [topComic, setTopComic] = useState<Comic[]>([]);
  useEffect(() => {
    const url =
      "https://radiant-journey-81333-7ea1ab4922d5.herokuapp.com/komik/searchKomik";
    axios
      .get(url)
      .then((response) => {
        const result = response.data;
        const { status, message, data } = result;
        setComic(data);

        const sortedLatestComics = [...data].sort((a, b) =>
          b.create_at.localeCompare(a.create_at)
        );
        const sortedTopComics = [...data]
          .sort((a, b) => a.rate - b.rate)
          .slice(0, 5);
        // console.log(sortedLatestComics);
        setLatestComic(sortedLatestComics);
        setTopComic(sortedTopComics);
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const [searchText, setSearchText] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        setSearchText={setSearchText}
        onlyTab={true}
        left={
          <Image
            style={{ width: 45, height: 45 }}
            source={require("../../assets/simbol.png")}
          ></Image>
        }
      ></SearchBar>
      <ScrollView>
        <StatusBar backgroundColor={secondary} />
        <Text style={styles.highlightText}>Trending Today</Text>
        <Carousel
          autoPlay={true}
          autoPlayInterval={3000}
          ref={ref}
          width={width}
          height={210}
          data={topComic}
          renderItem={({ index }) => (
            <TopCard item={topComic[index]} index={index}></TopCard>
          )}
        />
        <View>
          <FlatList
            contentContainerStyle={{ padding: 15 }}
            showsHorizontalScrollIndicator={false}
            horizontal
            ItemSeparatorComponent={() => <View style={{ width: 16 }}></View>}
            data={comic}
            renderItem={({ item }) => (
              <View style={{ width: 110, height: 200 }}>
                <RecentCard
                  item={item}
                  chFontSize={9}
                  titleFontSize={15}
                  authorFontSize={12}
                ></RecentCard>
              </View>
            )}
          ></FlatList>
        </View>
        <View style={styles.latestContainer}>
          <Text style={styles.highlightText}>Latest Release</Text>
          <FlatList
            contentContainerStyle={{
              paddingHorizontal: 15,
              paddingBottom: 15,
            }}
            showsHorizontalScrollIndicator={false}
            horizontal
            ItemSeparatorComponent={() => <View style={{ width: 16 }}></View>}
            data={latestComic}
            renderItem={({ item }) => (
              <View style={{ width: 110, height: 200 }}>
                <RecentCard
                  item={item}
                  chFontSize={9}
                  titleFontSize={15}
                  authorFontSize={12}
                ></RecentCard>
              </View>
            )}
          ></FlatList>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: { height: "100%", width: "100%", backgroundColor: primary },
  highlightText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    padding: 15,
  },
  latestContainer: {
    backgroundColor: secondary,
  },
});
