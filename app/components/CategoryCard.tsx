import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const CategoryCard = ({ text }: { text: string }) => {
  const router = useRouter();
  const moveToGenrePage = () => {
    router.push({
      pathname: "/Genre/[id]",
      params: { id: text },
    });
  };
  return (
    <Pressable onPress={moveToGenrePage}>
      <View style={styles.container}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </Pressable>
  );
};

export default CategoryCard;
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: "white",
    borderRadius: 3,
    margin: 5,
  },
  text: { color: "white" },
});
