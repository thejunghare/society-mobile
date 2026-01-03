import React, { useState, useCallback } from "react"; // 👈 Import useCallback
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  useLocalSearchParams,
  useRouter,
  Stack,
  useFocusEffect,
} from "expo-router"; // 👈 Import useFocusEffect
import { supabase } from "../../../lib/supabase";
import { Plus, ChevronRight, User } from "lucide-react-native";

export default function SocietyDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ CORRECT WAY: Refresh data whenever screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchMembers();
    }, [id]),
  );

  async function fetchMembers() {
    setLoading(true);
    const { data, error } = await supabase
      .from("members")
      .select("*, profiles(full_name, email, phone)")
      .eq("society_id", id)
      .order("room_number", { ascending: true });

    if (error) Alert.alert("Error", error.message);
    setMembers(data || []);
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      {/* Dynamic Header with Add Button */}
      <Stack.Screen
        options={{
          title: "Members",
          headerRight: () => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/(admin)/member-modal",
                  params: { societyId: id },
                })
              }
            >
              <Plus size={24} color="#007AFF" />
            </TouchableOpacity>
          ),
        }}
      />

      {loading ? (
        <ActivityIndicator style={{ marginTop: 20 }} color="#007AFF" />
      ) : (
        <FlatList
          data={members}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={<Text style={styles.header}>Room List</Text>}
          ListEmptyComponent={
            <Text style={styles.empty}>No members found.</Text>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: "/(admin)/member-modal",
                  params: {
                    societyId: id,
                    memberId: item.id, // Passing ID means "Edit Mode"
                    currentRoom: item.room_number,
                    currentRate: item.individual_maintenance_amount,
                  },
                })
              }
            >
              <View style={styles.row}>
                <View style={styles.avatar}>
                  <User size={18} color="#8e8e93" />
                </View>
                <View style={styles.info}>
                  <Text style={styles.name}>
                    {item.profiles?.full_name || "Pending Invite"}
                  </Text>
                  <Text style={styles.subtext}>Room {item.room_number}</Text>
                </View>

                {item.individual_maintenance_amount && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      ₹{item.individual_maintenance_amount}
                    </Text>
                  </View>
                )}

                <ChevronRight
                  size={20}
                  color="#C7C7CC"
                  style={{ marginLeft: 10 }}
                />
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f7" },
  listContainer: { padding: 20 },
  header: {
    fontSize: 13,
    color: "#86868b",
    marginBottom: 10,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  empty: { textAlign: "center", color: "#8e8e93", marginTop: 30 },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  row: { flexDirection: "row", alignItems: "center" },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f2f2f7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: "600", color: "#000" },
  subtext: { fontSize: 14, color: "#8e8e93", marginTop: 2 },

  badge: {
    backgroundColor: "#eef2ff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: { color: "#007AFF", fontSize: 12, fontWeight: "bold" },
});
