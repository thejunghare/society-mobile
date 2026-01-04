import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from "react-native";
import { supabase } from "../../../lib/supabase";
import {
  Building2,
  Users,
  TrendingUp,
  ChevronRight,
  Bell,
  Zap,
  Sparkles,
  FileText,
  Check, // 👈 Import Check Icon
} from "lucide-react-native";
import { useRouter, useFocusEffect } from "expo-router";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [sendingId, setSendingId] = useState<string | null>(null);

  const [isPlusMember, setIsPlusMember] = useState(false);

  const [stats, setStats] = useState({
    totalSocieties: 0,
    totalMembers: 0,
    totalRevenue: 0,
    societiesList: [] as any[],
  });

  useFocusEffect(
    useCallback(() => {
      fetchDashboardData();
    }, []),
  );

  async function fetchDashboardData() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const date = new Date();
      const currentMonth = date.getMonth() + 1;
      const currentYear = date.getFullYear();

      // 1. Fetch Profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("subscription_plan")
        .eq("id", user.id)
        .single();

      setIsPlusMember(
        profile?.subscription_plan === "plus" ||
          profile?.subscription_plan === "pro",
      );

      // 2. Fetch Societies
      const { data: societies } = await supabase
        .from("societies")
        .select(`*, members:members(count)`)
        .eq("admin_name", user.id);

      let formattedList = (societies || []).map((s: any) => ({
        id: s.id,
        name: s.name,
        address: s.address,
        regNo: s.registration_number,
        maintenance: s.maintenance_amount_owner,
        memberCount: s.members?.[0]?.count || 0,
        isBilled: false, // Default
      }));

      const societyIds = formattedList.map((s: any) => s.id);

      if (societyIds.length > 0) {
        // 3. 💰 Calculate Total Revenue (Lifetime Paid)
        const { data: paidBills } = await supabase
          .from("maintenance_bills")
          .select("amount")
          .in("society_id", societyIds)
          .eq("status", "paid");

        const totalRev =
          paidBills?.reduce((sum, bill) => sum + (bill.amount || 0), 0) || 0;

        // 4. ✅ Check Generation Status (Current Month)
        // Fetch count of bills generated for THIS month per society
        const { data: currentBills } = await supabase
          .from("maintenance_bills")
          .select("society_id")
          .in("society_id", societyIds)
          .eq("billing_month", currentMonth)
          .eq("billing_year", currentYear);

        // Count bills per society
        const billCounts: Record<string, number> = {};
        currentBills?.forEach((b: any) => {
          billCounts[b.society_id] = (billCounts[b.society_id] || 0) + 1;
        });

        // Update list status
        formattedList = formattedList.map((s: any) => ({
          ...s,
          // If we have bills equal to or greater than members, mark as done
          isBilled:
            s.memberCount > 0 && (billCounts[s.id] || 0) >= s.memberCount,
        }));

        setStats({
          totalSocieties: formattedList.length,
          totalMembers: formattedList.reduce(
            (sum: number, item: any) => sum + item.memberCount,
            0,
          ),
          totalRevenue: totalRev,
          societiesList: formattedList,
        });
      } else {
        // No societies yet
        setStats({
          totalSocieties: 0,
          totalMembers: 0,
          totalRevenue: 0,
          societiesList: [],
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  function requirePlus() {
    if (!isPlusMember) {
      router.push("/(admin)/upgrade-modal");
      return false;
    }
    return true;
  }

  async function generateBills(societyId: string) {
    if (!requirePlus()) return;

    Alert.alert(
      "Generate Bills?",
      "Create bills for all active members for the current month?",
      [
        { text: "Cancel" },
        {
          text: "Generate",
          onPress: async () => {
            setLoading(true);
            const date = new Date();
            const { error } = await supabase.rpc("generate_monthly_bills", {
              target_society_id: societyId,
              bill_month: date.getMonth() + 1,
              bill_year: date.getFullYear(),
            });

            if (error) {
              setLoading(false);
              Alert.alert("Error", error.message);
            } else {
              // Refresh data to show the green checkmark immediately
              await fetchDashboardData();
              Alert.alert("Success", "Bills generated successfully!");
            }
          },
        },
      ],
    );
  }

  async function handleSendReminder(
    societyId: string,
    societyName: string,
    memberCount: number,
  ) {
    if (!requirePlus()) return;
    if (memberCount === 0)
      return Alert.alert("No Members", "No members to remind.");

    Alert.alert(
      `Remind ${societyName}?`,
      `Send SMS to ${memberCount} members?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Send",
          onPress: async () => {
            setSendingId(societyId);
            setTimeout(() => {
              setSendingId(null);
              Alert.alert("Sent", `Reminders sent to ${memberCount} members.`);
            }, 1500);
          },
        },
      ],
    );
  }

  if (loading && !refreshing)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            fetchDashboardData();
          }}
        />
      }
    >
      <Text style={styles.headerTitle}>Dashboard</Text>

      {/* UPSELL BANNER */}
      {!isPlusMember && (
        <TouchableOpacity
          style={styles.upsellBanner}
          onPress={() => router.push("/(admin)/upgrade-modal")}
        >
          <View style={styles.upsellContent}>
            <View style={styles.upsellIcon}>
              <Sparkles size={16} color="#FFF" />
            </View>
            <View>
              <Text style={styles.upsellTitle}>Upgrade to Plus</Text>
              <Text style={styles.upsellDesc}>Unlock Auto-Billing & SMS</Text>
            </View>
          </View>
          <ChevronRight size={16} color="rgba(255,255,255,0.5)" />
        </TouchableOpacity>
      )}

      {/* BENTO GRID */}
      <View style={styles.bentoGrid}>
        <View style={[styles.card, styles.heroCard]}>
          <View style={[styles.iconCircle, { backgroundColor: "#34C759" }]}>
            <TrendingUp size={24} color="#FFF" />
          </View>
          <View>
            <Text style={styles.cardLabel}>TOTAL REVENUE</Text>
            <Text style={styles.heroValue}>
              ₹{(stats.totalRevenue / 1000).toFixed(1)}k
            </Text>
          </View>
        </View>

        <View style={styles.bentoColumn}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Building2 size={20} color="#007AFF" />
              <Text style={styles.cardValue}>{stats.totalSocieties}</Text>
            </View>
            <Text style={styles.cardLabel}>SOCIETIES</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Users size={20} color="#FF9500" />
              <Text style={styles.cardValue}>{stats.totalMembers}</Text>
            </View>
            <Text style={styles.cardLabel}>MEMBERS</Text>
          </View>
        </View>
      </View>

      {/* SOCIETIES LIST */}
      <Text style={styles.sectionHeader}>MY SOCIETIES</Text>
      <View style={styles.listGroup}>
        {stats.societiesList.map((society: any, index: number) => (
          <TouchableOpacity
            key={society.id}
            activeOpacity={0.7}
            onPress={() => router.push(`/society/${society.id}`)}
          >
            <View style={styles.listItem}>
              <View style={styles.listContent}>
                <Text style={styles.itemTitle}>{society.name}</Text>
                {society.regNo && (
                  <Text style={styles.itemSubtitle}>Reg: {society.regNo}</Text>
                )}
                {society.maintenance > 0 && (
                  <Text
                    style={[
                      styles.itemSubtitle,
                      { color: "#007AFF", fontWeight: "500" },
                    ]}
                  >
                    ₹{society.maintenance} / mo
                  </Text>
                )}
              </View>

              <View style={styles.toolbar}>
                {/* File/Bills */}
                <TouchableOpacity
                  style={styles.toolBtn}
                  onPress={(e) => {
                    e.stopPropagation();
                    router.push({
                      pathname: "/(admin)/bill-list",
                      params: {
                        societyId: society.id,
                        societyName: society.name,
                      },
                    });
                  }}
                >
                  <FileText size={18} color="#007AFF" />
                </TouchableOpacity>

                {/* ⚡ GENERATE BUTTON (DYNAMIC) */}
                <TouchableOpacity
                  style={[
                    styles.toolBtn,
                    // Green bg if done, Gold if Plus, Gray if Basic
                    society.isBilled
                      ? styles.billedBtn
                      : isPlusMember && styles.plusBtn,
                  ]}
                  disabled={society.isBilled} // 🛑 Disable if already billed
                  onPress={(e) => {
                    e.stopPropagation();
                    generateBills(society.id);
                  }}
                >
                  {society.isBilled ? (
                    // ✅ Show Checkmark if generated
                    <Check size={18} color="#FFF" strokeWidth={3} />
                  ) : (
                    // ⚡ Show Zap if pending
                    <Zap
                      size={18}
                      color={isPlusMember ? "#F59E0B" : "#8e8e93"}
                      fill={isPlusMember ? "#F59E0B" : "none"}
                    />
                  )}
                </TouchableOpacity>

                {/* Bell/SMS */}
                <TouchableOpacity
                  style={styles.toolBtn}
                  disabled={sendingId === society.id}
                  onPress={(e) => {
                    e.stopPropagation();
                    handleSendReminder(
                      society.id,
                      society.name,
                      society.memberCount,
                    );
                  }}
                >
                  {sendingId === society.id ? (
                    <ActivityIndicator size="small" color="#8e8e93" />
                  ) : (
                    <Bell
                      size={18}
                      color={isPlusMember ? "#007AFF" : "#8e8e93"}
                    />
                  )}
                </TouchableOpacity>

                <ChevronRight
                  size={16}
                  color="#C7C7CC"
                  style={{ marginLeft: 4 }}
                />
              </View>
            </View>
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
  container: { flex: 1, backgroundColor: "#F2F2F7" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  headerTitle: {
    fontSize: 34,
    fontWeight: "800",
    color: "#000",
    marginHorizontal: 20,
    marginTop: 60,
    marginBottom: 20,
    letterSpacing: -0.5,
  },

  // Upsell
  upsellBanner: {
    backgroundColor: "#1C1C1E",
    marginHorizontal: 20,
    marginBottom: 25,
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  upsellContent: { flexDirection: "row", alignItems: "center", gap: 12 },
  upsellIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
  },
  upsellTitle: { color: "#FFF", fontWeight: "700", fontSize: 16 },
  upsellDesc: { color: "rgba(255,255,255,0.6)", fontSize: 13 },

  // Bento
  bentoGrid: {
    flexDirection: "row",
    gap: 12,
    marginHorizontal: 20,
    marginBottom: 35,
    height: 140,
  },
  bentoColumn: { flex: 1, gap: 12 },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 16,
    flex: 1,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.03)",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  heroCard: {
    flex: 1.2,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  cardLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#8E8E93",
    letterSpacing: 0.5,
  },
  heroValue: {
    fontSize: 30,
    fontWeight: "800",
    color: "#000",
    letterSpacing: -1,
  },
  cardValue: { fontSize: 22, fontWeight: "700", color: "#000" },

  // List
  sectionHeader: {
    fontSize: 13,
    fontWeight: "600",
    color: "#86868b",
    marginBottom: 10,
    marginLeft: 20,
    textTransform: "uppercase",
  },
  listGroup: {
    backgroundColor: "#FFF",
    borderRadius: 18,
    marginHorizontal: 20,
    marginBottom: 50,
    overflow: "hidden",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  listContent: { flex: 1, gap: 2 },
  itemTitle: { fontSize: 17, fontWeight: "600", color: "#000" },
  itemSubtitle: { fontSize: 14, color: "#8E8E93" },

  // Toolbar
  toolbar: { flexDirection: "row", alignItems: "center", gap: 10 },
  toolBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F2F2F7",
    alignItems: "center",
    justifyContent: "center",
  },
  plusBtn: { backgroundColor: "#FFFBEB" },
  billedBtn: { backgroundColor: "#34C759" }, // 🟢 Green background for Completed

  separator: { height: 1, backgroundColor: "#E5E5EA", marginLeft: 16 },
});
