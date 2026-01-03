import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { supabase } from "../../../lib/supabase";
import {
  Building2,
  Users,
  TrendingUp,
  ChevronRight,
  Bell,
  Send,
} from "lucide-react-native";
import { useRouter } from "expo-router";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [sendingId, setSendingId] = useState<string | null>(null); // To show spinner on specific button
  const [stats, setStats] = useState<any>({
    totalSocieties: 0,
    totalMembers: 0,
    societiesList: [],
  });

  useEffect(() => {
    fetchMySocieties();
  }, []);

  async function fetchMySocieties() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data: societies } = await supabase
        .from("societies")
        .select(`*, members:members(count)`)
        .eq("admin_name", user.id); // Matches your SQL column 'admin_name'

      const formattedList = (societies || []).map((s: any) => ({
        id: s.id,
        name: s.name,
        address: s.address,
        regNo: s.registration_number, // 👈 New Field
        maintenance: s.maintenance_amount_owner, // 👈 New Field
        memberCount: s.members?.[0]?.count || 0,
      }));

      setStats({
        totalSocieties: formattedList.length,
        totalMembers: formattedList.reduce(
          (sum: number, item: any) => sum + item.memberCount,
          0,
        ),
        societiesList: formattedList,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // 📨 SMS REMINDER LOGIC
  async function handleSendReminder(
    societyId: string,
    societyName: string,
    memberCount: number,
  ) {
    if (memberCount === 0) {
      Alert.alert("No Members", "This society has no members to remind.");
      return;
    }

    Alert.alert(
      `Remind ${societyName}?`,
      `This will send an SMS reminder to all ${memberCount} members regarding their pending dues.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Send SMS",
          style: "default",
          onPress: async () => {
            setSendingId(societyId);

            // 📡 TODO: Replace with actual Supabase Edge Function call
            // await supabase.functions.invoke('send-sms-reminder', { body: { societyId } })

            // Simulating Network Request
            setTimeout(() => {
              setSendingId(null);
              Alert.alert("Sent", `Reminders sent to ${memberCount} members.`);
            }, 1500);
          },
        },
      ],
    );
  }

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Dashboard</Text>

      {/* 📊 SUMMARY GRID */}
      <View style={styles.gridContainer}>
        <View style={styles.summaryCard}>
          <View style={[styles.iconBox, { backgroundColor: "#E0F2FE" }]}>
            <Building2 size={24} color="#007AFF" />
          </View>
          <Text style={styles.summaryValue}>{stats.totalSocieties}</Text>
          <Text style={styles.summaryLabel}>Societies</Text>
        </View>

        <View style={styles.summaryCard}>
          <View style={[styles.iconBox, { backgroundColor: "#DCFCE7" }]}>
            <Users size={24} color="#34C759" />
          </View>
          <Text style={styles.summaryValue}>{stats.totalMembers}</Text>
          <Text style={styles.summaryLabel}>Members</Text>
        </View>

        <View style={styles.summaryCard}>
          <View style={[styles.iconBox, { backgroundColor: "#FEE2E2" }]}>
            <TrendingUp size={24} color="#FF3B30" />
          </View>
          <Text style={styles.summaryValue}>₹45k</Text>
          <Text style={styles.summaryLabel}>Revenue</Text>
        </View>
      </View>

      {/* 🏢 SOCIETIES LIST */}
      <Text style={styles.sectionHeader}>MY SOCIETIES</Text>
      <View style={styles.listGroup}>
        {stats.societiesList.map((society: any, index: number) => (
          <TouchableOpacity
            key={society.id}
            // 🔴 FIX: Removed /(admin) from path. Groups are ignored in URLs.
            onPress={() => router.push(`/society/${society.id}`)}
          >
            <View style={styles.listItem}>
              {/* Left Info */}
              <View style={styles.listContent}>
                <Text style={styles.itemTitle}>{society.name}</Text>
                {society.regNo && (
                  <Text style={styles.itemSubtitle}>Reg: {society.regNo}</Text>
                )}
                {society.maintenance > 0 && (
                  <Text
                    style={[
                      styles.itemSubtitle,
                      { color: "#007AFF", marginTop: 2 },
                    ]}
                  >
                    ₹{society.maintenance} / month
                  </Text>
                )}
              </View>

              {/* Right Actions */}
              <View style={styles.listRight}>
                {/* 🔔 The SMS Bell */}
                <TouchableOpacity
                  style={styles.actionBtn}
                  // Logic: The inner button consumes the touch, so the row navigation won't fire.
                  onPress={() =>
                    handleSendReminder(
                      society.id,
                      society.name,
                      society.memberCount,
                    )
                  }
                  disabled={sendingId === society.id}
                >
                  {sendingId === society.id ? (
                    <ActivityIndicator size="small" color="#007AFF" />
                  ) : (
                    <Bell size={20} color="#007AFF" />
                  )}
                </TouchableOpacity>

                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{society.memberCount}</Text>
                </View>
                <ChevronRight size={20} color="#C7C7CC" />
              </View>
            </View>

            {/* Separator Line */}
            {index < stats.societiesList.length - 1 && (
              <View style={styles.separator} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
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
    color: "#000",
  },

  // Grid
  gridContainer: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  iconBox: { padding: 10, borderRadius: 50, marginBottom: 10 },
  summaryValue: { fontSize: 22, fontWeight: "bold", color: "#000" },
  summaryLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#8e8e93",
    marginTop: 2,
  },

  // List Group
  sectionHeader: {
    fontSize: 13,
    fontWeight: "600",
    color: "#86868b",
    marginBottom: 10,
    marginLeft: 20,
    textTransform: "uppercase",
  },
  listGroup: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 40,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    justifyContent: "space-between",
  },
  listContent: { flex: 1, marginRight: 10 },
  itemTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  itemSubtitle: { fontSize: 14, color: "#8e8e93" },

  listRight: { flexDirection: "row", alignItems: "center", gap: 12 },

  // 🔔 Action Button Style
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F2F2F7",
    justifyContent: "center",
    alignItems: "center",
  },

  badge: {
    backgroundColor: "#f2f2f7",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: { fontSize: 14, fontWeight: "bold", color: "#666" },
  separator: {
    height: 1,
    backgroundColor: "#c6c6c8",
    marginLeft: 16,
    opacity: 0.5,
  },
});
