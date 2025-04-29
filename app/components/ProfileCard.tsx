import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const ProfileCard = ({
  title,
  onpress,
  backgroundColor = "transparent",
  icon = "chevron-forward-outline",
  textColor = "white",
  iconColor = "#B1B1B1",
}: {
  title: string;
  onpress?: () => void;
  backgroundColor?: string;
  icon?: React.ComponentProps<typeof Ionicons>["name"];
  textColor?: string;
  iconColor?: string;
}) => {
  return (
    <Pressable onPress={onpress}>
      <View style={[styles.container, { backgroundColor: backgroundColor }]}>
        <Text style={{ color: textColor }}>{title}</Text>
        <Ionicons name={icon} color={iconColor} size={20}></Ionicons>
      </View>
    </Pressable>
  );
};

export default ProfileCard;
const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: "#5C5C5C",
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
