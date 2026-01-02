// components/AdminHome.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { CheckCircle, XCircle } from "lucide-react-native";

export default function AdminHome({ session }: { session: Session }) {
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchIssues();
  }, []);

  async function fetchIssues() {
    setLoading(true);
    // Admin sees ALL issues
    const { data, error } = await supabase
      .from("issues")
      .select("*, profiles(full_name, room_number)") // Join with profiles to see who complained
      .order("created_at", { ascending: false });

    if (error) Alert.alert("Error", error.message);
    else setIssues(data || []);
    setLoading(false);
  }

  async function resolveIssue(id: string) {
    const { error } = await supabase
      .from("issues")
      .update({ status: "resolved" })
      .eq("id", id);

    if (error) Alert.alert("Error", error.message);
    else {
      Alert.alert("Success", "Issue marked as resolved");
      fetchIssues(); // Refresh list
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Admin Dashboard</Text>
        <TouchableOpacity
          onPress={() => supabase.auth.signOut()}
          style={styles.logoutBtn}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>Member Complaints</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <FlatList
          data={issues}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap: 15, paddingBottom: 50 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.complainant}>
                  {item.profiles?.full_name || "Unknown"}
                </Text>
                <Text
                  style={[
                    styles.status,
                    item.status === "open" ? styles.open : styles.resolved,
                  ]}
                >
                  {item.status.toUpperCase()}
                </Text>
              </View>

              <Text style={styles.issueTitle}>{item.title}</Text>
              <Text style={styles.issueDesc}>{item.description}</Text>

              {item.status === "open" && (
                <TouchableOpacity
                  style={styles.resolveBtn}
                  onPress={() => resolveIssue(item.id)}
                >
                  <CheckCircle color="#fff" size={18} />
                  <Text style={styles.resolveText}>Mark Resolved</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        />
      )}
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "center",
  },
  title: { fontSize: 26, fontWeight: "bold", color: "#1c1c1e" },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    color: "#666",
  },
  logoutBtn: {
    backgroundColor: "#ff3b30",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  logoutText: { color: "#fff", fontWeight: "bold" },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  complainant: { fontSize: 14, fontWeight: "bold", color: "#8e8e93" },
  status: {
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: "hidden",
  },
  open: { backgroundColor: "#ffcc00", color: "#fff" },
  resolved: { backgroundColor: "#34c759", color: "#fff" },

  issueTitle: { fontSize: 18, fontWeight: "600", marginBottom: 4 },
  issueDesc: { fontSize: 14, color: "#3a3a3c", marginBottom: 10 },

  resolveBtn: {
    flexDirection: "row",
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  resolveText: { color: "#fff", fontWeight: "bold" },
});
