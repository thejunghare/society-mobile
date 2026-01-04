import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Sparkles, Check, Zap, Bell, X } from "lucide-react-native";

export default function UpgradeModal() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handlePurchase() {
    setLoading(true);
    // 📡 TODO: Integrate Stripe/Razorpay/RevenueCat here
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Success!", "Welcome to Society Plus.");
      router.back();
    }, 2000);
  }

  return (
    <View style={styles.container}>
      {/* Close Button */}
      <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
        <X size={24} color="#8e8e93" />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={{ alignItems: "center", paddingBottom: 40 }}
      >
        {/* Header Icon */}
        <View style={styles.iconContainer}>
          <Sparkles size={40} color="#fff" />
        </View>

        <Text style={styles.title}>Unlock Dwello Plus</Text>
        <Text style={styles.subtitle}>
          Supercharge your society management.
        </Text>

        {/* Feature List */}
        <View style={styles.card}>
          <FeatureItem
            icon={<Zap size={20} color="#FF9500" />}
            title="Auto-Generate Bills"
            desc="One-tap billing for all members instantly."
          />
          <View style={styles.separator} />
          <FeatureItem
            icon={<Bell size={20} color="#FF3B30" />}
            title="SMS Reminders"
            desc="Send bulk payment reminders via SMS."
          />
          <View style={styles.separator} />
          <FeatureItem
            icon={<Check size={20} color="#34C759" />}
            title="Unlimited Members"
            desc="Manage large societies without limits."
          />
        </View>

        {/* Pricing */}
        <Text style={styles.price}>₹499 / year</Text>
        <Text style={styles.disclaimer}>
          Cancel anytime. Auto-renews annually.
        </Text>

        {/* CTA Button */}
        <TouchableOpacity
          style={styles.subscribeBtn}
          onPress={handlePurchase}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnText}>Upgrade Now</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={{ marginTop: 20 }}>
          <Text style={styles.restore}>Restore Purchases</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function FeatureItem({
  icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <View style={styles.featureRow}>
      <View style={styles.featureIcon}>{icon}</View>
      <View style={{ flex: 1 }}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDesc}>{desc}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f7", paddingTop: 20 },
  closeBtn: { alignSelf: "flex-end", marginRight: 20, padding: 10 },

  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#007AFF",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  title: { fontSize: 28, fontWeight: "900", color: "#1c1c1e", marginBottom: 8 },
  subtitle: { fontSize: 16, color: "#8e8e93", marginBottom: 30 },

  card: { width: "90%", backgroundColor: "#fff", borderRadius: 16, padding: 5 },
  featureRow: { flexDirection: "row", alignItems: "center", padding: 16 },
  featureIcon: { width: 40, alignItems: "center", marginRight: 15 },
  featureTitle: { fontSize: 17, fontWeight: "600", color: "#000" },
  featureDesc: { fontSize: 14, color: "#8e8e93", marginTop: 2 },
  separator: { height: 1, backgroundColor: "#f2f2f7", marginLeft: 60 },

  price: { fontSize: 24, fontWeight: "bold", color: "#1c1c1e", marginTop: 40 },
  disclaimer: {
    fontSize: 13,
    color: "#8e8e93",
    marginTop: 5,
    marginBottom: 20,
  },

  subscribeBtn: {
    width: "90%",
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#007AFF",
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  btnText: { color: "#fff", fontSize: 17, fontWeight: "bold" },
  restore: { color: "#007AFF", fontSize: 15, fontWeight: "500" },
});
