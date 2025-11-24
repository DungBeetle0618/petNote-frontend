import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

export default function Magazine() {
  return (
    <View style={styles.card}>
      <View style={styles.imageBox}>
        <Text style={styles.bigEmoji}>📰</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.heading}>10 Signs Your Pet is Happy and Healthy</Text>

        <Text style={styles.description}>
          Learn how to recognize the subtle signs that your furry friend is thriving...
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").width * 0.6,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FCD9A3",
    overflow: "hidden",
    marginVertical: 12,
    marginHorizontal: Dimensions.get("window").width * 0.05,
  },
  imageBox: {
    height: Dimensions.get("window").width * 0.4,
    backgroundColor: "#FFE8CC",
    justifyContent: "center",
    alignItems: "center",
  },
  bigEmoji: { fontSize: 48 },
  content: { padding: 16 },
  heading: { fontSize: 15, fontWeight: "600", color: "#1A1A1A", marginBottom: 6 },
  description: { fontSize: 13, color: "#666", marginBottom: 10 },
});
