import {
  View,
  Text,
  StyleSheet,
  Pressable,
  DimensionValue,
} from "react-native";
import React from "react";
import { cyan } from "@/helper/color";
interface CyanButtonProps {
  width: DimensionValue;
  height: DimensionValue;
  text: string;
  onpress: () => void;
}

const CyanButton = ({ width, height, text, onpress }: CyanButtonProps) => {
  return (
    <Pressable
      onPress={onpress}
      style={[styles.container, { width: width, height: height }]}
    >
      <Text style={styles.textButton}>{text}</Text>
    </Pressable>
  );
};

export default CyanButton;
const styles = StyleSheet.create({
  container: {
    backgroundColor: cyan,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  textButton: {
    color: "white",
    fontWeight: "bold",
  },
});
