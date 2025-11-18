import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Pressable } from "react-native-gesture-handler";

export default function Header() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image style={styles.imageIcon} source={require("../assets/bell.png")} />
      <Pressable
        onPress={() => {
          navigation.navigate("Settings" as never);
        }}
        hitSlop={20}
        pressRetentionOffset={20}
      >
        <Image
          style={styles.imageIcon}
          source={require("../assets/newspaper.png")}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  imageIcon: {
    width: 24,
    height: 24,
  },
});
