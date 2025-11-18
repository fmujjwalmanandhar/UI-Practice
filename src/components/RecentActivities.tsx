import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function RecentActivities() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>Recent Activity</Text>
        <Text style={styles.seeAllText}>See All</Text>
      </View>
      <RecentActivityItem />
    </View>
  );
}

function RecentActivityItem() {
  return (
    <>
      <View style={styles.activityItemStyle}>
        <View style={styles.imageContainer}>
          <Image
            style={{ width: 20, height: 20, borderRadius: 8 }}
            source={require("../assets/newspaper.png")}
            tintColor={"#3B82F6"}
          />
        </View>
        <View style={styles.row}>
          <View>
            <Text style={{ fontSize: 16, lineHeight: 24, color: "#1F2937" }}>
              Grocery Shopping
            </Text>
            <Text style={{ fontSize: 14, lineHeight: 20, color: "#6B7280" }}>
              Jan 12, 2024
            </Text>
          </View>
          <Text style={{ fontSize: 16, lineHeight: 24, color: "#EF4444" }}>
            -$54.23
          </Text>
        </View>
      </View>
      <View style={styles.activityItemStyle}>
        <View style={[styles.imageContainer, { backgroundColor: "#DCFCE7" }]}>
          <Image
            style={{ width: 20, height: 20, borderRadius: 8 }}
            source={require("../assets/newspaper.png")}
            tintColor={"#22C55E"}
          />
        </View>
        <View style={styles.row}>
          <View>
            <Text style={{ fontSize: 16, lineHeight: 24, color: "#1F2937" }}>
              Salary Deposit
            </Text>
            <Text style={{ fontSize: 14, lineHeight: 20, color: "#6B7280" }}>
              Jan 19, 2024
            </Text>
          </View>
          <Text style={{ fontSize: 16, lineHeight: 24, color: "#22C55E" }}>
            +$2500
          </Text>
        </View>
      </View>

      <View style={styles.activityItemStyle}>
        <View style={[styles.imageContainer, { backgroundColor: "#FFEDD5" }]}>
          <Image
            style={{ width: 20, height: 20, borderRadius: 8 }}
            source={require("../assets/newspaper.png")}
            tintColor={"#F97316"}
          />
        </View>
        <View style={styles.row}>
          <View>
            <Text style={{ fontSize: 16, lineHeight: 24, color: "#1F2937" }}>
              Coffee Shop
            </Text>
            <Text style={{ fontSize: 14, lineHeight: 20, color: "#6B7280" }}>
              Feb 1, 2024
            </Text>
          </View>
          <Text style={{ fontSize: 16, lineHeight: 24, color: "#EF4444" }}>
            -$8.540
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
    paddingHorizontal: 24,
    justifyContent: "flex-start",
    alignSelf: "stretch",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  activityItemStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 16,
    paddingVertical: 16,
    paddingLeft: 16,
    paddingRight: 8,
    borderRadius: 12,
    borderCurve: "continuous",
    borderColor: "#E5E7EB",
    borderWidth: StyleSheet.hairlineWidth,
  },
  title: {
    fontSize: 18,
    lineHeight: 28,
    color: "#1F2937",
    fontWeight: "bold",
  },
  seeAllText: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "500",
    color: "#3B82F6",
  },
  imageContainer: {
    width: 44,
    height: 44,
    backgroundColor: "#DBEAFE",
    borderRadius: 22,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
