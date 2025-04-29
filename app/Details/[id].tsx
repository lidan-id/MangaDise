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

import { Chapter, Comic, Comment } from "@/helper/interface";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import CategoryCard from "../components/CategoryCard";
import ChapterCard from "../components/ChapterCard";
import axios from "axios";
import Skeleton from "../Skeleton";
import CommentCard from "../components/CommentCard";
import { Snackbar } from "react-native-paper";
import { useUserStore } from "@/zustand/userStore";

const Details = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [currentData, setCurrentData] = useState<Comic>();
  const [hasData, setHasData] = useState(false);
  const [chapterData, setChapterData] = useState<Chapter[]>([]);
  const [commentData, setCommentData] = useState<Comment[]>([]);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [genre, setGenre] = useState([
    "Comedy",
    "Action",
    "Fantasy",
    "Adventure",
  ]);
  const userId = useUserStore((state) => state._id);
  const onToggleSnackbar = () => {
    setSnackbarVisible(snackbarVisible!);
  };
  const onDismissSnackbar = () => {
    setSnackbarVisible(false);
  };
  useEffect(() => {
    const fetchComicDetails = async () => {
      const url = `https://radiant-journey-81333-7ea1ab4922d5.herokuapp.com/komik/searchKomik/${id}`;
      axios
        .get(url)
        .then((response) => {
          const result = response.data;
          const { status, message, data } = result;
          setCurrentData(data[0]);
          // console.log(data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setHasData(true);
        });
    };
    const fetchChapterDetails = async () => {
      const url = `https://radiant-journey-81333-7ea1ab4922d5.herokuapp.com/chapter/searchChapter/${id}`;
      const response = await axios.get(url);
      const result = response.data;
      const { status, message, data } = result;
      data.sort((a: Chapter, b: Chapter) => {
        return b.chapter_num - a.chapter_num;
      });
      setChapterData(data);
    };
    const fetchCommentDetails = async () => {
      const url = `https://radiant-journey-81333-7ea1ab4922d5.herokuapp.com/comment/komikComment/${id}`;
      const response = await axios.get(url);
      const result = response.data;
      const { status, message, data } = result;
      setCommentData(data);
    };

    fetchComicDetails();
    fetchChapterDetails();
    fetchCommentDetails();
  }, []);
  const postFavorite = async () => {
    // const url =
    //   "https://radiant-journey-81333-7ea1ab4922d5.herokuapp.com/favorite/addFavorite";
    // const response = await axios.post(url, {
    //   user_id: userId,
    //   komik_id: currentData?._id,
    // });
    // const result = response.data;
    // const { message, status, data } = result;
    // console.log(message);
  };
  const moveToPreviousPage = () => {
    router.back();
  };
  const [readMore, setReadMore] = useState(false);
  const toggleReadMore = () => {
    setReadMore(!readMore);
  };
  const [favorite, setFavorite] = useState(false);
  const toggleAddFav = () => {
    if (!favorite) {
      setFavorite(true);
      setSnackbarVisible(true);
      postFavorite();
    } else {
      setFavorite(false);
      setSnackbarVisible(false);
    }
  };
  if (!hasData) {
    return <Skeleton></Skeleton>;
  }

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
                {currentData?.title}
              </Text>
            </View>
          ),
          headerBackVisible: false,
        }}
      ></Stack.Screen>
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={{ uri: currentData?.cover }}
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
          <Image
            style={styles.image}
            source={{ uri: currentData?.cover }}
          ></Image>
          <View style={{ flex: 1 }}>
            <Text numberOfLines={1} style={styles.title}>
              {currentData?.title}
            </Text>
            <Pressable onPress={toggleAddFav}>
              <View style={styles.addFav}>
                <Ionicons
                  name={favorite ? "heart" : "heart-outline"}
                  color={"red"}
                ></Ionicons>
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
            </Pressable>
          </View>
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <View style={styles.synopsis}>
            <Text
              numberOfLines={readMore ? 0 : 4}
              style={{ color: "white", lineHeight: 18 }}
            >
              {currentData?.synopsis}
            </Text>
            <Pressable
              style={{ marginTop: 5, marginBottom: 5 }}
              onPress={toggleReadMore}
            >
              <Text
                style={{
                  color: "white",
                  textDecorationLine: "underline",
                  fontSize: 13,
                }}
              >
                {readMore ? "Read Less" : "Read More"}
              </Text>
            </Pressable>
          </View>
          <View style={styles.category}>
            {genre.map((e, index) => (
              <CategoryCard key={index} text={e}></CategoryCard>
            ))}
          </View>

          {chapterData.map((e, index) => (
            <ChapterCard
              key={`chapter-${index}`}
              id={currentData?._id || ""}
              chapter={e.chapter_num}
              comicName={currentData?.title || ""}
              totalCh={currentData?.totalChapter || 0}
              publish={e.published_at}
              price={e.price}
            />
          ))}
          <View>
            <View style={styles.commentCount}>
              <Text style={{ color: "white", fontWeight: "bold" }}>
                {commentData.length} Comments
              </Text>
            </View>
            <View style={styles.comments}>
              {commentData.map((e, index) => (
                <CommentCard
                  key={`comment-${index}`}
                  name={e.name}
                  comment={e.comment}
                  datePosted={e.createdAt}
                ></CommentCard>
              ))}
            </View>
          </View>
        </ScrollView>
        <Snackbar visible={snackbarVisible} onDismiss={onDismissSnackbar}>
          {currentData?.title
            ? `${currentData.title} ${
                favorite ? "added to" : "removed from"
              } favorite`
            : ""}
        </Snackbar>
      </SafeAreaView>
    </>
  );
};

export default Details;
const styles = StyleSheet.create({
  container: { backgroundColor: primary, height: "100%" },
  imageBackground: {
    width: "100%",
    height: 250,
    position: "absolute",
    zIndex: 0,
  },
  imagenTitle: { flexDirection: "row", marginLeft: 15, marginTop: 20 },
  image: { width: 180, height: 280, marginRight: 20, marginBottom: 10 },
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
    alignSelf: "flex-start",
    borderRadius: 8,
    padding: 10,
  },
  synopsis: {
    marginHorizontal: 15,
    marginTop: 20,
    height: null,
  },
  category: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    marginTop: 10,
  },
  commentCount: {
    paddingHorizontal: 15,
    marginTop: 25,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  comments: { marginTop: 10 },
});
