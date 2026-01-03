import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { supabase } from "../../../lib/supabase";
import { Check, Clock, AlertCircle } from "lucide-react-native";

export default function AdminIssues() {
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"open" | "resolved">("open"); // 👈 Tab State

  useEffect(() => {
    fetchIssues();
  }, []);

  async function fetchIssues() {
    setLoading(true);
    const { data } = await supabase
      .from("issues")
      .select("*, profiles(full_name)")
      .order("created_at", { ascending: false });
    setIssues(data || []);
    setLoading(false);
  }

  async function resolveIssue(id: string) {
    // Optimistic Update: Remove from list immediately
    setIssues((current) =>
      current.map((i) => (i.id === id ? { ...i, status: "resolved" } : i)),
    );

    // Background API Call
    await supabase.from("issues").update({ status: "resolved" }).eq("id", id);
  }

  // Filter the list based on the selected tab
  const filteredIssues = issues.filter((i) => i.status === filter);

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Complaints</Text>

      {/* 🔘 SEGMENTED CONTROL (TABS) */}
      <View style={styles.segmentContainer}>
        <TouchableOpacity
          style={[styles.segmentBtn, filter === "open" && styles.segmentActive]}
          onPress={() => setFilter("open")}
        >
          <Text
            style={[styles.segmentText, filter === "open" && styles.textActive]}
          >
            Open
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.segmentBtn,
            filter === "resolved" && styles.segmentActive,
          ]}
          onPress={() => setFilter("resolved")}
        >
          <Text
            style={[
              styles.segmentText,
              filter === "resolved" && styles.textActive,
            ]}
          >
            Resolved
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredIssues}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 20,
          paddingTop: 10,
        }}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No {filter} issues found.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.userRow}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {item.profiles?.full_name.charAt(0)}
                  </Text>
                </View>
                <View>
                  <Text style={styles.userName}>
                    {item.profiles?.full_name}
                  </Text>
                  <Text style={styles.date}>
                    {new Date(item.created_at).toLocaleDateString()}
                  </Text>
                </View>
              </View>
              {filter === "open" ? (
                <AlertCircle size={18} color="#FF9500" />
              ) : (
                <Check size={18} color="#34C759" />
              )}
            </View>

            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.description}</Text>

            {/* ACTION BUTTON */}
            {filter === "open" && (
              <TouchableOpacity
                style={styles.resolveBtn}
                onPress={() => resolveIssue(item.id)}
              >
                <Check color="#fff" size={16} style={{ marginRight: 6 }} />
                <Text style={styles.resolveText}>Mark as Resolved</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f7" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  headerTitle: {
    fontSize: 34,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginTop: 60,
    marginBottom: 20,
  },

  // Segmented Control
  segmentContainer: {
    flexDirection: "row",
    backgroundColor: "#e5e5ea",
    marginHorizontal: 20,
    padding: 2,
    borderRadius: 9,
    marginBottom: 20,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 7,
  },
  segmentActive: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  segmentText: { fontWeight: "600", color: "#666", fontSize: 13 },
  textActive: { color: "#000" },

  // Cards
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 5,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  userRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F2F2F7",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: { fontSize: 14, fontWeight: "bold", color: "#8e8e93" },
  userName: { fontSize: 14, fontWeight: "600", color: "#000" },
  date: { fontSize: 12, color: "#8e8e93" },

  title: { fontSize: 16, fontWeight: "bold", marginBottom: 4, color: "#000" },
  desc: { fontSize: 14, color: "#3a3a3c", lineHeight: 20, marginBottom: 15 },

  resolveBtn: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  resolveText: { color: "#fff", fontWeight: "bold", fontSize: 14 },

  emptyState: { alignItems: "center", marginTop: 50 },
  emptyText: { color: "#8e8e93", fontSize: 16 },
});
