import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { format } from "date-fns";
const CommentCard = ({
  name,
  comment,
  datePosted,
}: {
  name: string;
  comment: string;
  datePosted: Date;
}) => {
  console.log(datePosted);
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View style={styles.imageContainer}>
          <Ionicons name="person-outline" color={"white"} size={25}></Ionicons>
        </View>
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontWeight: "bold", color: "white" }}>{name}</Text>
          <Text style={{ color: "grey" }}>
            {String(
              Number(format(new Date(Date.now()), "d")) -
                Number(format(new Date(datePosted), "d"))
            )}{" "}
            days ago
          </Text>
        </View>
      </View>
      <Text style={{ color: "white", marginTop: 5 }}>{comment}</Text>
    </View>
  );
};

export default CommentCard;
const styles = StyleSheet.create({
  container: {
    width: "80%",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  imageContainer: {
    borderRadius: 10,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
  },
});
