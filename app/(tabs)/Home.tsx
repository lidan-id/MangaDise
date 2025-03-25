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
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { primary, secondary } from "@/helper/color";
import SearchBar from "../components/SearchBar";
import TopCard from "../components/TopCard";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import RecentCard from "../components/RecentCard";
import { data, topData } from "@/helper/data";

const width = Dimensions.get("window").width;
const Home = () => {
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
          data={topData}
          renderItem={({ index }) => <TopCard item={topData[index]}></TopCard>}
        />
        <View>
          <FlatList
            contentContainerStyle={{ padding: 15 }}
            showsHorizontalScrollIndicator={false}
            horizontal
            ItemSeparatorComponent={() => <View style={{ width: 16 }}></View>}
            data={data}
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
            data={data}
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
