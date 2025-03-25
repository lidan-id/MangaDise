import { View, Platform, StyleSheet, Pressable } from "react-native";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import { Text, PlatformPressable } from "@react-navigation/elements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { cyan, secondary } from "@/helper/color";
import Ionicons from "@expo/vector-icons/Ionicons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  type IconProps = { name: React.ComponentProps<typeof Ionicons>["name"] };
  type Icons = { [key: string]: (props: IconProps) => JSX.Element };
  const icons: Icons = {
    Favorite: (props) => <Ionicons size={20} color={"white"} {...props} />,

    Home: (props) => <Ionicons size={20} color={"white"} {...props}></Ionicons>,

    Profile: (props) => (
      <Ionicons size={20} color={"white"} {...props}></Ionicons>
    ),
  };

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          typeof options.tabBarLabel === "string"
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        let iconName: React.ComponentProps<typeof Ionicons>["name"];
        switch (route.name) {
          case "Favorite":
            iconName = isFocused ? "heart" : "heart-outline";
            break;
          case "Home":
            iconName = isFocused ? "home" : "home-outline";
            break;
          case "Profile":
            iconName = isFocused ? "person" : "person-outline";
            break;
          default:
            iconName = "alert";
        }
        return (
          <Pressable
            key={route.name}
            // href={buildHref(route.name, route.params)}

            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              alignItems: "center",
            }}
          >
            <View
              style={
                isFocused
                  ? [styles.insideContainer, { backgroundColor: cyan }]
                  : [styles.insideContainer]
              }
            >
              {icons[route.name]({
                name: iconName,
              })}
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {label}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: secondary,
    paddingVertical: 15,

    // position: "absolute",
    // bottom: 15,
    // marginHorizontal: 20,
    // borderRadius: 8,
    // shadowOpacity: 0.1,
  },
  insideContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 85,
    borderRadius: 5,
  },
});
export default TabBar;
