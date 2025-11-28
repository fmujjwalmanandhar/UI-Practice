import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

type AnimationProps = {
  scrollY: SharedValue<number>;
};
const HEADER_HEIGHT = 206; // 206+77+24+16;

const QuickActions = ({ scrollY }: AnimationProps) => {
  const rstyle = useAnimatedStyle(() => {
    return {
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: "#E5E7EB",
      opacity: interpolate(
        scrollY.value,
        [HEADER_HEIGHT, HEADER_HEIGHT * 2 - 24],
        [0, 1]
      ),
    };
  });
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Quick Actions</Text>
        <View style={styles.row}>
          <View style={styles.quickView}>
            <Image
              style={styles.imageIcon}
              source={require("../assets/bell.png")}
            />
            <Text style={styles.text}>Action 1</Text>
          </View>
          <View style={styles.quickView}>
            <Image
              style={styles.imageIcon}
              source={require("../assets/newspaper.png")}
            />
            <Text style={styles.text}>Action 2</Text>
          </View>
          <View style={styles.quickView}>
            <Image
              style={styles.imageIcon}
              source={require("../assets/bell.png")}
            />
            <Text style={styles.text}>Action 3</Text>
          </View>
          <View style={styles.quickView}>
            <Image
              style={styles.imageIcon}
              source={require("../assets/newspaper.png")}
            />
            <Text style={styles.text}>Action 4</Text>
          </View>
        </View>
      </View>
      <Animated.View style={rstyle} />
    </>
  );
};

export default QuickActions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    // marginTop: 24,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 16,
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
    marginTop: 16,
    justifyContent: "space-between",
  },
  imageIcon: {
    width: 24,
    height: 28,
  },
  quickView: {
    height: 77,
    width: 74,
    backgroundColor: "#F9FAFB",
    borderColor: "#E5E7EB",
    borderCurve: "continuous",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    lineHeight: 28,
    color: "#1F2937",
    fontWeight: "bold",
  },
  text: {
    fontSize: 12,
    lineHeight: 16,
    color: "#1F2937",
    marginTop: 8,
  },
});
