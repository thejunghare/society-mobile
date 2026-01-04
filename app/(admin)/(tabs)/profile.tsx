import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import { supabase } from "../../../lib/supabase";
import {
  User,
  ChevronRight,
  CreditCard,
  Shield,
  Mail,
  Sparkles,
  LogOut,
  Crown,
} from "lucide-react-native";
import { useRouter, useFocusEffect } from "expo-router";

export default function ProfileScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [isPlusMember, setIsPlusMember] = useState(false);

  // Refresh data whenever the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, []),
  );

  async function fetchProfile() {
    try {
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
        // 🟢 REAL CHECK: Check db column
        setIsPlusMember(
          data?.subscription_plan === "plus" ||
            data?.subscription_plan === "pro",
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: () => {
          supabase.auth.signOut();
          router.replace("/(auth)/login"); // Force navigation to login
        },
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
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      {/* 🟢 1. HERO HEADER */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {profile?.full_name
              ? profile.full_name.charAt(0).toUpperCase()
              : "U"}
          </Text>
          {/* Status Indicator Badge */}
          <View
            style={[
              styles.onlineBadge,
              { backgroundColor: isPlusMember ? "#F59E0B" : "#8E8E93" },
            ]}
          >
            {isPlusMember ? <Crown size={10} color="#FFF" /> : null}
          </View>
        </View>

        <Text style={styles.name}>{profile?.full_name || "User"}</Text>
        <Text style={styles.email}>
          {profile?.email || "admin@society.com"}
        </Text>

        <View style={styles.roleChip}>
          <Shield size={10} color="#666" style={{ marginRight: 4 }} />
          <Text style={styles.roleText}>
            {profile?.role?.toUpperCase() || "ADMIN"}
          </Text>
        </View>
      </View>

      {/* 🔵 2. SUBSCRIPTION CARD (Visually Distinct) */}
      <Text style={styles.sectionHeader}>MEMBERSHIP</Text>
      <TouchableOpacity
        style={styles.planCard}
        activeOpacity={0.8}
        disabled={isPlusMember} // Only clickable if Basic
        onPress={() => router.push("/(admin)/upgrade-modal")}
      >
        <View style={styles.planContent}>
          <View
            style={[
              styles.iconBox,
              { backgroundColor: isPlusMember ? "#007AFF" : "#E5E5EA" },
            ]}
          >
            <Sparkles
              size={22}
              color={isPlusMember ? "#FFF" : "#8E8E93"}
              fill={isPlusMember ? "#FFF" : "none"}
            />
          </View>

          <View style={{ flex: 1 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              <Text style={styles.planName}>
                {isPlusMember ? "Dwello Plus" : "Basic Plan"}
              </Text>
              {isPlusMember && (
                <View style={styles.proTag}>
                  <Text style={styles.proTagText}>PRO</Text>
                </View>
              )}
            </View>
            <Text style={styles.planPrice}>
              {isPlusMember
                ? "Next billing: Dec 30, 2026"
                : "Upgrade to unlock automation"}
            </Text>
          </View>

          {!isPlusMember && (
            <View style={styles.upgradeBtn}>
              <Text style={styles.upgradeText}>Upgrade</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>

      {/* ⚪ 3. SETTINGS GROUP */}
      <Text style={styles.sectionHeader}>ACCOUNT</Text>
      <View style={styles.listGroup}>
        <TouchableOpacity style={styles.listItem}>
          <View style={[styles.listIcon, { backgroundColor: "#007AFF" }]}>
            <User size={18} color="#FFF" />
          </View>
          <Text style={styles.listLabel}>Personal Details</Text>
          <ChevronRight
            size={18}
            color="#C7C7CC"
            style={{ marginLeft: "auto" }}
          />
        </TouchableOpacity>

        <View style={styles.separator} />

        <TouchableOpacity style={styles.listItem}>
          <View style={[styles.listIcon, { backgroundColor: "#34C759" }]}>
            <CreditCard size={18} color="#FFF" />
          </View>
          <Text style={styles.listLabel}>Billing & Invoices</Text>
          <ChevronRight
            size={18}
            color="#C7C7CC"
            style={{ marginLeft: "auto" }}
          />
        </TouchableOpacity>

        <View style={styles.separator} />

        <TouchableOpacity style={styles.listItem}>
          <View style={[styles.listIcon, { backgroundColor: "#FF9500" }]}>
            <Mail size={18} color="#FFF" />
          </View>
          <Text style={styles.listLabel}>Notifications</Text>
          <ChevronRight
            size={18}
            color="#C7C7CC"
            style={{ marginLeft: "auto" }}
          />
        </TouchableOpacity>
      </View>

      {/* 🔴 4. DANGER ZONE */}
      <View style={[styles.listGroup, { marginTop: 20 }]}>
        <TouchableOpacity style={styles.listItem} onPress={handleLogout}>
          <View style={[styles.listIcon, { backgroundColor: "#FF3B30" }]}>
            <LogOut size={18} color="#FFF" />
          </View>
          <Text style={[styles.listLabel, { color: "#FF3B30" }]}>Log Out</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.versionText}>Version 1.2.0 • Build 240</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2F2F7" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  // Header
  header: {
    alignItems: "center",
    paddingVertical: 40,
    backgroundColor: "transparent",
  },
  avatarContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  avatarText: { fontSize: 36, fontWeight: "700", color: "#1C1C1E" },
  onlineBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: "#F2F2F7",
    alignItems: "center",
    justifyContent: "center",
  },

  name: { fontSize: 24, fontWeight: "800", color: "#000", marginBottom: 2 },
  email: { fontSize: 15, color: "#8E8E93", marginBottom: 10 },
  roleChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E5E5EA",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  roleText: { fontSize: 11, fontWeight: "700", color: "#666" },

  // Section Headers
  sectionHeader: {
    fontSize: 12,
    fontWeight: "600",
    color: "#86868b",
    marginBottom: 8,
    marginLeft: 20,
    marginTop: 25,
    letterSpacing: 0.5,
  },

  // Plan Card
  planCard: {
    backgroundColor: "#FFF",
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  planContent: { flexDirection: "row", alignItems: "center", gap: 15 },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  planName: { fontSize: 17, fontWeight: "700", color: "#000" },
  planPrice: { fontSize: 13, color: "#8E8E93", marginTop: 1 },
  proTag: {
    backgroundColor: "#000",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  proTagText: { color: "#FFF", fontSize: 10, fontWeight: "800" },
  upgradeBtn: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  upgradeText: { color: "#FFF", fontSize: 13, fontWeight: "600" },

  // List Group (Settings)
  listGroup: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    marginHorizontal: 16,
    overflow: "hidden",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
  },
  listIcon: {
    width: 30,
    height: 30,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  listLabel: { fontSize: 16, fontWeight: "500", color: "#000" },
  separator: { height: 1, backgroundColor: "#E5E5EA", marginLeft: 58 },

  versionText: {
    textAlign: "center",
    color: "#C7C7CC",
    marginTop: 30,
    fontSize: 12,
    fontWeight: "500",
  },
});
