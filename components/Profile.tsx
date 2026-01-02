import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { supabase } from "../lib/supabase";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Email</Text>
        {/* We can fetch real details, but for now show static or session email */}
        <Text style={styles.value}>Logged In User</Text>
      </View>

      <TouchableOpacity
        onPress={() => supabase.auth.signOut()}
        style={styles.logoutBtn}
      >
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f2f2f7",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  infoBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  label: {
    color: "#888",
    fontSize: 12,
    textTransform: "uppercase",
    marginBottom: 5,
  },
  value: { fontSize: 18, fontWeight: "500" },
  logoutBtn: {
    backgroundColor: "#ff3b30",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  logoutText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
