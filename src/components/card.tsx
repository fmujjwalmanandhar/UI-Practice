import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Pressable } from "react-native-gesture-handler";

const width = Dimensions.get("window").width;
const Card = () => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.greetingText}>Good Morning!</Text>

      <Text style={styles.greetingSubText}>Ready to start your day?</Text>

      <Pressable
        style={({ pressed }) => [
          styles.commonButton,
          pressed ? styles.highlight : styles.pressable,
        ]}
        hitSlop={20}
        pressRetentionOffset={20}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    height: 164,
    aspectRatio: (width - 32) / 164,
    borderRadius: 16,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    experimental_backgroundImage: "linear-gradient(to right, #3B82F6, #9333EA)",
  },
  greetingText: {
    fontSize: 20,
    lineHeight: 28,
    color: "white",
    fontWeight: "bold",
  },
  greetingSubText: {
    fontSize: 16,
    lineHeight: 24,
    color: "white",
    marginVertical: 12,
  },
  buttonText: {
    fontSize: 16,
    color: "#3B82F6",
    fontWeight: "500",
    lineHeight: 24,
  },
  commonButton: {
    alignSelf: "flex-start",
    width: "auto",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  pressable: {
    backgroundColor: "white",
  },
  highlight: {
    backgroundColor: "#0449b8ff",
  },
});
