import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Pressable } from "react-native-gesture-handler";

const width = Dimensions.get("window").width;
const FeaturedCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.featureView}>
        <Text style={styles.title}>Featured</Text>
      </View>
      <View style={styles.cardContainer}>
        <Text style={styles.greetingText}>Special Offer</Text>

        <Text style={styles.greetingSubText}>
          Get 20% off your next Purchase
        </Text>

        <Pressable
          style={({ pressed }) => [
            styles.commonButton,
            pressed ? styles.highlight : styles.pressable,
          ]}
          hitSlop={20}
          pressRetentionOffset={20}
        >
          <Text style={[styles.buttonText, { color: "#EC4899" }]}>
            Claim Now
          </Text>
        </Pressable>
      </View>

      <View
        style={[
          styles.cardContainer,
          {
            experimental_backgroundImage:
              "linear-gradient(to right, #1F2937, #1F2937)",
          },
        ]}
      >
        <Text style={styles.greetingText}>Premium Features</Text>

        <Text style={styles.greetingSubText}>
          Unlock Advanced analytics and insights
        </Text>

        <Pressable
          style={({ pressed }) => [
            styles.commonButton,
            pressed ? styles.highlight : styles.pressable,
            { backgroundColor: "#FACC15" },
          ]}
          hitSlop={20}
          pressRetentionOffset={20}
        >
          <Text style={[styles.buttonText, { color: "#1F2937" }]}>Upgrade</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default FeaturedCard;

const styles = StyleSheet.create({
  cardContainer: {
    height: 160,
    aspectRatio: (width - 32 - 8) / 160,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginVertical: 8,
    experimental_backgroundImage: "linear-gradient(to right, #F472B6, #EF4444)",
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
  title: {
    fontSize: 18,
    lineHeight: 28,
    color: "#1F2937",
    fontWeight: "bold",
  },
  featureView: {
    alignSelf: "flex-start",
    paddingHorizontal: 24,
    marginTop: 24,
    marginBottom: 16,
  },
  container: {
    alignSelf: "center",
  },
});
