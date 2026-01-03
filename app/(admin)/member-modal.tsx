import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "../../lib/supabase";
import { Trash2 } from "lucide-react-native";

export default function MemberModal() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { societyId, memberId, currentRoom, currentRate } = params;

  const isEditMode = !!memberId;

  const [room, setRoom] = useState(currentRoom ? String(currentRoom) : "");
  const [rate, setRate] = useState(currentRate ? String(currentRate) : "");
  const [email, setEmail] = useState(""); // Only used for Adding
  const [loading, setLoading] = useState(false);

  // 💾 SAVE FUNCTION
  async function handleSave() {
    if (!room)
      return Alert.alert("Missing Field", "Please enter a Room Number.");

    setLoading(true);
    const maintenanceAmount = rate ? parseFloat(rate) : null;

    try {
      if (isEditMode) {
        // UPDATE EXISTING MEMBER
        const { error } = await supabase
          .from("members")
          .update({
            room_number: room,
            individual_maintenance_amount: maintenanceAmount,
          })
          .eq("id", memberId);

        if (error) throw error;
        Alert.alert("Success", "Member updated.");
      } else {
        // CREATE NEW MEMBER
        // 1. Find profile by email (Optional: In a real app, you'd send an invite here)
        // For now, we create a placeholder member row
        const { error } = await supabase.from("members").insert({
          society_id: societyId,
          room_number: room,
          individual_maintenance_amount: maintenanceAmount,
          // In a real app, you would link 'profile_id' here by looking up the email
        });

        if (error) throw error;
        Alert.alert("Success", "Member added to society.");
      }
      router.back(); // Close Modal
    } catch (err: any) {
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
  }

  // 🗑 DELETE FUNCTION
  async function handleDelete() {
    Alert.alert("Remove Member", "Are you sure? This cannot be undone.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          setLoading(true);
          await supabase.from("members").delete().eq("id", memberId);
          setLoading(false);
          router.back();
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.sectionHeader}>DETAILS</Text>
        <View style={styles.group}>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Room No.</Text>
            <TextInput
              value={room}
              onChangeText={setRoom}
              placeholder="e.g. A-101"
              style={styles.input}
            />
          </View>

          {!isEditMode && (
            <>
              <View style={styles.separator} />
              <View style={styles.inputRow}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="For invite"
                  autoCapitalize="none"
                  style={styles.input}
                />
              </View>
            </>
          )}
        </View>

        <Text style={styles.sectionHeader}>BILLING</Text>
        <Text style={styles.helper}>Leave empty to use society default.</Text>
        <View style={styles.group}>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Rate (₹)</Text>
            <TextInput
              value={rate}
              onChangeText={setRate}
              placeholder="Default Amount"
              keyboardType="numeric"
              style={[styles.input, { color: "#007AFF", fontWeight: "600" }]}
            />
          </View>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity
          style={styles.saveBtn}
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveText}>Save Details</Text>
          )}
        </TouchableOpacity>

        {isEditMode && (
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={handleDelete}
            disabled={loading}
          >
            <Trash2 size={20} color="#FF3B30" style={{ marginRight: 8 }} />
            <Text style={styles.deleteText}>Remove Member</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f7", paddingTop: 20 },
  sectionHeader: {
    fontSize: 13,
    color: "#86868b",
    marginLeft: 20,
    marginBottom: 8,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  helper: {
    fontSize: 12,
    color: "#86868b",
    marginLeft: 20,
    marginBottom: 8,
    marginTop: -4,
  },

  group: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 25,
    paddingLeft: 16,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    paddingRight: 16,
  },
  separator: { height: 1, backgroundColor: "#c6c6c8", opacity: 0.5 },

  label: { width: 100, fontSize: 16, color: "#000" },
  input: { flex: 1, fontSize: 16, color: "#000", textAlign: "right" },

  saveBtn: {
    backgroundColor: "#007AFF",
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
  },
  saveText: { color: "#fff", fontSize: 17, fontWeight: "bold" },

  deleteBtn: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  deleteText: { color: "#FF3B30", fontSize: 17, fontWeight: "600" },
});
