import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { supabase } from "../../lib/supabase";
import { CheckCircle, Banknote, CreditCard } from "lucide-react-native";

export default function PaymentModal() {
  const router = useRouter();
  const { billId, amount, memberName } = useLocalSearchParams();

  const [method, setMethod] = useState<"cash" | "upi" | "cheque">("cash");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRecordPayment() {
    setLoading(true);

    // 1. Update the Bill Status
    const { error } = await supabase
      .from("maintenance_bills")
      .update({
        status: "paid",
        payment_method: method,
        payment_date: new Date(),
        notes: notes,
      })
      .eq("id", billId);

    setLoading(false);

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Success", "Payment recorded successfully.");
      router.back();
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Record Payment</Text>
      <Text style={styles.subtitle}>Received from {memberName}</Text>

      <View style={styles.amountCard}>
        <Text style={styles.amountLabel}>TOTAL RECEIVED</Text>
        <Text style={styles.amountValue}>₹{amount}</Text>
      </View>

      <Text style={styles.sectionHeader}>PAYMENT METHOD</Text>
      <View style={styles.group}>
        {["cash", "upi", "cheque"].map((m) => (
          <TouchableOpacity
            key={m}
            style={[styles.row, m !== "cheque" && styles.borderBottom]}
            onPress={() => setMethod(m as any)}
          >
            <View style={styles.rowLeft}>
              {m === "cash" ? (
                <Banknote size={20} color="#34C759" />
              ) : (
                <CreditCard size={20} color="#007AFF" />
              )}
              <Text style={styles.rowLabel}>{m.toUpperCase()}</Text>
            </View>
            {method === m && <CheckCircle size={20} color="#007AFF" />}
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionHeader}>NOTES (OPTIONAL)</Text>
      <View style={styles.group}>
        <TextInput
          style={styles.input}
          placeholder="Transaction ID or comments..."
          value={notes}
          onChangeText={setNotes}
        />
      </View>

      <TouchableOpacity
        style={styles.saveBtn}
        onPress={handleRecordPayment}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveText}>Confirm Payment</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f7", padding: 20 },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#8e8e93",
    textAlign: "center",
    marginBottom: 30,
  },

  amountCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 30,
  },
  amountLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#8e8e93",
    marginBottom: 5,
  },
  amountValue: { fontSize: 34, fontWeight: "bold", color: "#000" },

  sectionHeader: {
    fontSize: 13,
    color: "#86868b",
    marginLeft: 15,
    marginBottom: 8,
    fontWeight: "600",
  },
  group: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 25,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  borderBottom: { borderBottomWidth: 1, borderBottomColor: "#f2f2f7" },
  rowLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  rowLabel: { fontSize: 16, fontWeight: "500" },

  input: { padding: 16, fontSize: 16 },

  saveBtn: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  saveText: { color: "#fff", fontSize: 17, fontWeight: "bold" },
});
