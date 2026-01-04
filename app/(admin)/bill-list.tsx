import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  useLocalSearchParams,
  useRouter,
  useFocusEffect,
  Stack,
} from "expo-router";
import { supabase } from "../../lib/supabase";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  Smartphone,
} from "lucide-react-native";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function BillListScreen() {
  const router = useRouter();
  const { societyId, societyName } = useLocalSearchParams();

  const [loading, setLoading] = useState(true);
  const [bills, setBills] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useFocusEffect(
    useCallback(() => {
      fetchBills();
    }, [selectedDate]),
  );

  async function fetchBills() {
    setLoading(true);
    const month = selectedDate.getMonth() + 1;
    const year = selectedDate.getFullYear();

    const { data, error } = await supabase
      .from("maintenance_bills")
      .select(`*, members (room_number, profiles (full_name))`)
      .eq("society_id", societyId)
      .eq("billing_month", month)
      .eq("billing_year", year)
      .order("status", { ascending: false });

    if (error) console.error(error);
    setBills(data || []);
    setLoading(false);
  }

  function changeMonth(increment: number) {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setSelectedDate(newDate);
  }

  // 💰 Stats Calculation
  const totalCollected = bills
    .filter((b) => b.status === "paid")
    .reduce((sum, b) => sum + (b.amount || 0), 0);
  const totalPending = bills
    .filter((b) => b.status === "unpaid")
    .reduce((sum, b) => sum + (b.amount || 0), 0);

  const renderStatus = (item: any) => {
    if (item.status === "paid") {
      const isOnline = item.payment_method === "online_app";
      return (
        <View
          style={[
            styles.badge,
            { backgroundColor: isOnline ? "#E0F2FE" : "#DCFCE7" },
          ]}
        >
          {isOnline ? (
            <Smartphone size={12} color="#007AFF" />
          ) : (
            <CheckCircle size={12} color="#34C759" />
          )}
          <Text
            style={[
              styles.badgeText,
              { color: isOnline ? "#007AFF" : "#34C759" },
            ]}
          >
            {isOnline ? "APP" : "PAID"}
          </Text>
        </View>
      );
    }
    return (
      <View style={[styles.badge, { backgroundColor: "#FEE2E2" }]}>
        <Clock size={12} color="#FF3B30" />
        <Text style={[styles.badgeText, { color: "#FF3B30" }]}>PENDING</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* 🟢 NATIVE HEADER (Adds the Back Button) */}
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Manage Bills",
          headerBackTitle: "Dashboard", // iOS Back Button Text
          headerTintColor: "#007AFF",
          headerStyle: { backgroundColor: "#f2f2f7" },
        }}
      />

      {/* 🗓 SUB-HEADER: MONTH SELECTOR */}
      <View style={styles.monthSelector}>
        <TouchableOpacity onPress={() => changeMonth(-1)} style={styles.navBtn}>
          <ChevronLeft size={24} color="#007AFF" />
        </TouchableOpacity>

        <View style={{ alignItems: "center" }}>
          <Text style={styles.monthTitle}>
            {MONTHS[selectedDate.getMonth()]} {selectedDate.getFullYear()}
          </Text>
          <Text style={styles.subTitle}>{societyName}</Text>
        </View>

        <TouchableOpacity onPress={() => changeMonth(1)} style={styles.navBtn}>
          <ChevronRight size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* 📊 STATS ROW */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>COLLECTED</Text>
          <Text style={[styles.statValue, { color: "#34C759" }]}>
            ₹{totalCollected}
          </Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>PENDING</Text>
          <Text style={[styles.statValue, { color: "#FF3B30" }]}>
            ₹{totalPending}
          </Text>
        </View>
      </View>

      {/* 📄 BILL LIST */}
      {loading ? (
        <ActivityIndicator
          style={{ marginTop: 50 }}
          size="large"
          color="#007AFF"
        />
      ) : (
        <FlatList
          data={bills}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No bills found.</Text>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              disabled={item.status === "paid"}
              onPress={() =>
                router.push({
                  pathname: "/(admin)/payment-modal",
                  params: {
                    billId: item.id,
                    amount: item.amount,
                    memberName: `${item.members?.room_number} - ${item.members?.profiles?.full_name}`,
                  },
                })
              }
            >
              <View style={styles.row}>
                <View style={styles.roomBox}>
                  <Text style={styles.roomText}>
                    {item.members?.room_number}
                  </Text>
                </View>
                <View style={{ flex: 1, paddingHorizontal: 12 }}>
                  <Text style={styles.name}>
                    {item.members?.profiles?.full_name || "Unknown"}
                  </Text>
                  <Text style={styles.amount}>₹{item.amount}</Text>
                </View>
                {renderStatus(item)}
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

  // New Month Selector Styles (No top padding needed now)
  monthSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5ea",
  },
  monthTitle: { fontSize: 18, fontWeight: "bold", color: "#000" },
  subTitle: { fontSize: 12, color: "#8e8e93" },
  navBtn: { padding: 10 },

  statsRow: { flexDirection: "row", padding: 16, gap: 12 },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#8e8e93",
    marginBottom: 4,
  },
  statValue: { fontSize: 20, fontWeight: "bold" },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  row: { flexDirection: "row", alignItems: "center" },

  roomBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#f2f2f7",
    justifyContent: "center",
    alignItems: "center",
  },
  roomText: { fontWeight: "bold", fontSize: 14, color: "#000" },

  name: { fontSize: 16, fontWeight: "600", marginBottom: 2 },
  amount: { fontSize: 14, color: "#666" },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: { fontSize: 11, fontWeight: "bold" },

  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#8e8e93",
    fontSize: 16,
  },
});
