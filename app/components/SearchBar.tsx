import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { primary, secondary } from "@/helper/color";
import { TextInput } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

const SearchBar = ({
  onlyTab,
  left,
  setSearchText,
}: {
  onlyTab: boolean;
  left: React.ReactNode;
  setSearchText: (text: string) => void;
}) => {
  const router = useRouter();
  const moveToSearchPage = () => {
    if (onlyTab) {
      router.push("/Search");
    }
  };
  return (
    <View style={styles.container}>
      {left}
      <TextInput
        contentStyle={{
          paddingLeft: 13,
          height: 10,
        }}
        onChangeText={(value) => setSearchText(value)}
        onPress={moveToSearchPage}
        placeholder="Search title or artist"
        placeholderTextColor={"#7E7E7E"}
        cursorColor="white"
        textColor="white"
        theme={{ roundness: 4 }}
        style={styles.textInput}
        underlineColorAndroid="transparent"
        activeUnderlineColor="transparent"
        right={
          <TextInput.Icon
            icon={() => <Ionicons name={"search"} size={25} color="white" />}
          />
        }
      ></TextInput>
    </View>
  );
};

export default SearchBar;
const styles = StyleSheet.create({
  container: {
    backgroundColor: secondary,
    flexDirection: "row",
    padding: 15,
    gap: 10,
    alignItems: "center",
  },

  textInput: {
    color: "white",
    overflow: "hidden",
    borderRadius: 4,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "white",
    fontSize: 12,
    flex: 1,
    height: 40,
  },
});
