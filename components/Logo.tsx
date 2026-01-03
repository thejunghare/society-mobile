import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Box, Hexagon } from "lucide-react-native"; // Using Hexagon as an abstract 'building' block

export default function DwelloLogo({
  size = "large",
}: {
  size?: "small" | "large";
}) {
  const isLarge = size === "large";
  const iconSize = isLarge ? 40 : 24;
  const containerSize = isLarge ? 80 : 40;
  const fontSize = isLarge ? 32 : 20;

  return (
    <View style={styles.container}>
      {/* The Icon Mark */}
      <View
        style={[
          styles.iconContainer,
          {
            width: containerSize,
            height: containerSize,
            borderRadius: containerSize / 3.5,
          },
        ]}
      >
        {/* We use a Hexagon to represent a structural/hive element, very modern */}
        <Hexagon size={iconSize} color="white" strokeWidth={3} />
      </View>

      {/* The Text Name */}
      <Text style={[styles.text, { fontSize }]}>Dwello</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", justifyContent: "center", gap: 15 },
  iconContainer: {
    backgroundColor: "#007AFF", // Brand Color
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#007AFF",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
  },
  text: {
    fontFamily: "System", // Uses San Francisco on iOS
    fontWeight: "800", // Extra Bold
    color: "#1c1c1e",
    letterSpacing: -0.5,
  },
});
