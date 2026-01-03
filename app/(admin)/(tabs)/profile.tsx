import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { supabase } from "../../../lib/supabase";
import {
  User,
  ChevronRight,
  CreditCard,
  Shield,
  LogOut,
  Mail,
  Sparkles,
} from "lucide-react-native";

export default function ProfileScreen() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  // 🔹 Simulated SaaS Plan Data (In real app, fetch this from a 'subscriptions' table)
  const subscription = {
    plan: "Society Pro",
    price: "₹4,999 / year",
    status: "active",
    renewsOn: "Dec 30, 2026",
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      setProfile(data);
    }
    setLoading(false);
  }

  async function handleLogout() {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: () => supabase.auth.signOut(),
      },
    ]);
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* 🟢 1. HEADER SECTION (Avatar & Name) */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {profile?.full_name
              ? profile.full_name.charAt(0).toUpperCase()
              : "U"}
          </Text>
        </View>
        <Text style={styles.name}>{profile?.full_name || "User"}</Text>
        <Text style={styles.email}>
          {profile?.email || "admin@society.com"}
        </Text>
        <View style={styles.roleBadge}>
          <Shield size={12} color="#666" style={{ marginRight: 4 }} />
          <Text style={styles.roleText}>
            {profile?.role?.toUpperCase() || "MEMBER"}
          </Text>
        </View>
      </View>

      {/* 🔵 2. SAAS PLAN SECTION (The "Apple One" Style Card) */}
      <Text style={styles.sectionHeader}>CURRENT PLAN</Text>
      <View style={styles.card}>
        <View style={styles.planRow}>
          <View style={styles.iconBox}>
            <Sparkles size={20} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.planName}>{subscription.plan}</Text>
            <Text style={styles.planPrice}>{subscription.price}</Text>
          </View>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>
              {subscription.status.toUpperCase()}
            </Text>
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.row}>
          <Text style={styles.label}>Renews on</Text>
          <Text style={styles.value}>{subscription.renewsOn}</Text>
        </View>
      </View>

      {/* ⚪ 3. SETTINGS GROUP */}
      <Text style={styles.sectionHeader}>ACCOUNT SETTINGS</Text>
      <View style={styles.card}>
        <TouchableOpacity style={styles.rowItem}>
          <View style={styles.rowLeft}>
            <User size={20} color="#007AFF" />
            <Text style={styles.rowLabel}>Edit Profile</Text>
          </View>
          <ChevronRight size={20} color="#C7C7CC" />
        </TouchableOpacity>

        <View style={styles.separator} />

        <TouchableOpacity style={styles.rowItem}>
          <View style={styles.rowLeft}>
            <CreditCard size={20} color="#007AFF" />
            <Text style={styles.rowLabel}>Billing & Invoices</Text>
          </View>
          <ChevronRight size={20} color="#C7C7CC" />
        </TouchableOpacity>

        <View style={styles.separator} />

        <TouchableOpacity style={styles.rowItem}>
          <View style={styles.rowLeft}>
            <Mail size={20} color="#007AFF" />
            <Text style={styles.rowLabel}>Email Notifications</Text>
          </View>
          <ChevronRight size={20} color="#C7C7CC" />
        </TouchableOpacity>
      </View>

      {/* 🔴 4. LOGOUT BUTTON */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      <Text style={styles.versionText}>Version 1.0.2 (Build 240)</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f7" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  // Header
  header: { alignItems: "center", paddingVertical: 40 },
  avatarContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#e1e1e6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#d1d1d6",
  },
  avatarText: { fontSize: 36, fontWeight: "bold", color: "#8e8e93" },
  name: { fontSize: 24, fontWeight: "bold", color: "#000", marginBottom: 4 },
  email: { fontSize: 16, color: "#8e8e93", marginBottom: 10 },
  roleBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e5e5ea",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  roleText: { fontSize: 12, fontWeight: "600", color: "#666" },

  // Sections
  sectionHeader: {
    fontSize: 13,
    fontWeight: "600",
    color: "#86868b",
    marginBottom: 8,
    marginLeft: 20,
    marginTop: 20,
    textTransform: "uppercase",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 16,
    paddingVertical: 4,
    overflow: "hidden", // Keeps separators clean
  },

  // Plan Specific
  planRow: { flexDirection: "row", alignItems: "center", padding: 16 },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  planName: { fontSize: 18, fontWeight: "bold", color: "#000" },
  planPrice: { fontSize: 14, color: "#8e8e93" },
  statusBadge: {
    backgroundColor: "#34C759",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  statusText: { color: "#fff", fontWeight: "bold", fontSize: 10 },

  // List Items
  row: { flexDirection: "row", justifyContent: "space-between", padding: 16 },
  rowItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  rowLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  rowLabel: { fontSize: 17, color: "#000" },
  label: { fontSize: 16, color: "#000" },
  value: { fontSize: 16, color: "#8e8e93" },

  separator: {
    height: 1,
    backgroundColor: "#c6c6c8",
    marginLeft: 50,
    opacity: 0.5,
  },

  // Actions
  logoutButton: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 30,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  logoutText: { fontSize: 17, color: "#FF3B30", fontWeight: "600" },
  versionText: {
    textAlign: "center",
    color: "#C7C7CC",
    marginTop: 20,
    fontSize: 12,
  },
});
