import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AdminDashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Society Overview</Text>
      <View style={styles.grid}>
        <View style={styles.statCard}>
          <Text style={styles.number}>24</Text>
          <Text style={styles.label}>Members</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.number, { color: "#ff3b30" }]}>3</Text>
          <Text style={styles.label}>Open Issues</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#f2f2f7",
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  grid: { flexDirection: "row", gap: 15 },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  number: { fontSize: 32, fontWeight: "bold", color: "#007AFF" },
  label: { color: "#666", marginTop: 5 },
});
