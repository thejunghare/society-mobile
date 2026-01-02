import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const FAKE_PAYMENTS = [
  { id: "1", date: "2025-11-01", amount: 2500, method: "UPI" },
  { id: "2", date: "2025-10-01", amount: 2500, method: "Credit Card" },
];

export default function Payments() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Payment History</Text>
      <FlatList
        data={FAKE_PAYMENTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 10 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.date}>{item.date}</Text>
              <Text style={styles.method}>{item.method}</Text>
            </View>
            <Text style={styles.amount}>- ₹{item.amount}</Text>
          </View>
        )}
      />
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
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  date: { fontSize: 16, fontWeight: "500" },
  method: { color: "#888", fontSize: 12 },
  amount: { fontSize: 16, fontWeight: "bold", color: "#333" },
});
