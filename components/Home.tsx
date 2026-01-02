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

export default function Home({ session }: { session: Session }) {
  const [profile, setProfile] = useState<any>(null);
  const [bills, setBills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      // 1. Fetch Profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (profileError) {
        console.log(profileError.message);
      }

      // working correct
      console.log(profileData);
      setProfile(profileData);

      // 2. Fetch Member ID
      const { data: memberData, error: memberError } = await supabase
        .from("members")
        .select("id")
        .eq("profile_id", session.user.id)
        .single();

      if (memberError) {
        console.log(memberError.message);
      }
      // getting null
      console.log("inside member data: ", memberData);

      if (memberData) {
        // 3. Fetch Bills AND Society Details (using join)
        const { data: billsData, error } = await supabase
          .from("maintenance_bills")
          .select("*")
          .eq("member_id", memberData.id)
          .order("created_at", { ascending: false });

        if (error) {
          console.log(error.message);
        }
        console.log("logging bill data: ", billsData);
        setBills(billsData || []);
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>
            Hello, {profile?.full_name || "Member"}
          </Text>
          <Text style={styles.subGreeting}>Welcome back</Text>
        </View>
        <TouchableOpacity
          onPress={() => supabase.auth.signOut()}
          style={styles.logoutBtn}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>My Maintenance Bills</Text>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#007AFF"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={bills}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap: 15, paddingBottom: 20 }}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No bills found.</Text>
          }
          renderItem={({ item }) => (
            <View
              style={[
                styles.card,
                item.status === "paid" ? styles.cardPaid : styles.cardUnpaid,
              ]}
            >
              <View style={{ flex: 1 }}>
                {/* Society Name Displayed Here */}
                <Text style={styles.societyName}>{item.societies?.name}</Text>

                <Text style={styles.billDate}>
                  Month: {item.billing_month} / {item.billing_year}
                </Text>
                <Text style={styles.billAmount}>₹ {item.amount}</Text>
              </View>

              <View style={styles.badgeContainer}>
                <Text
                  style={[
                    styles.statusBadge,
                    { color: item.status === "paid" ? "#34c759" : "#ff9500" },
                  ]}
                >
                  {item.status.toUpperCase()}
                </Text>
              </View>
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
    alignItems: "center",
    marginBottom: 25,
  },
  greeting: { fontSize: 22, fontWeight: "bold", color: "#1c1c1e" },
  subGreeting: { fontSize: 14, color: "#8e8e93" },
  logoutBtn: {
    backgroundColor: "#ff3b30",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  logoutText: { color: "#fff", fontWeight: "600", fontSize: 14 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 15,
    color: "#3a3a3c",
  },
  card: {
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderLeftWidth: 5,
  },
  // Fixed Logic: Paid is Green, Unpaid is Yellow/Orange
  cardPaid: { borderLeftColor: "#34c759" },
  cardUnpaid: { borderLeftColor: "#ff9500" },

  societyName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#8e8e93",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  billDate: { fontSize: 14, color: "#3a3a3c", marginBottom: 4 },
  billAmount: { fontSize: 20, fontWeight: "bold", color: "#000" },

  badgeContainer: { alignItems: "flex-end" },
  statusBadge: { fontWeight: "bold", fontSize: 12 },
  emptyText: { textAlign: "center", color: "#888", marginTop: 20 },
});
