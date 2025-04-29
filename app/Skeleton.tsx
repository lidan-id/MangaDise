import React from "react";
import { View, StyleSheet, Animated, Dimensions } from "react-native";
import { primary, secondary } from "@/helper/color";

const Skeleton = () => {
  const shimmerAnimation = new Animated.Value(0);

  React.useEffect(() => {
    const shimmerLoop = Animated.loop(
      Animated.timing(shimmerAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    );
    shimmerLoop.start();

    return () => shimmerLoop.stop();
  }, []);

  const shimmerTranslate = shimmerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  });

  return (
    <View style={styles.container}>
      {/* Header Skeleton */}
      <View style={styles.header}>
        <Animated.View
          style={[
            styles.shimmer,
            {
              transform: [{ translateX: shimmerTranslate }],
            },
          ]}
        />
      </View>

      {/* Content Skeleton */}
      <View style={styles.contentContainer}>
        {[...Array(4)].map((_, i) => (
          <View key={i} style={styles.card}>
            <View style={styles.imagePlaceholder}>
              <Animated.View
                style={[
                  styles.shimmer,
                  {
                    transform: [{ translateX: shimmerTranslate }],
                  },
                ]}
              />
            </View>
            <View style={styles.textPlaceholder}>
              <Animated.View
                style={[
                  styles.shimmer,
                  {
                    transform: [{ translateX: shimmerTranslate }],
                  },
                ]}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primary,
    padding: 16,
  },
  header: {
    width: "100%",
    height: 60,
    backgroundColor: secondary,
    borderRadius: 8,
    marginBottom: 20,
    overflow: "hidden",
  },
  contentContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: width / 2 - 24,
    marginBottom: 16,
  },
  imagePlaceholder: {
    width: "100%",
    height: 150,
    backgroundColor: secondary,
    borderRadius: 8,
    marginBottom: 8,
    overflow: "hidden",
  },
  textPlaceholder: {
    width: "100%",
    height: 20,
    backgroundColor: secondary,
    borderRadius: 4,
    overflow: "hidden",
  },
  shimmer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "grey",
    opacity: 0.3,
  },
});

export default Skeleton;
