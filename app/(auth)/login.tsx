import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { supabase } from "../../lib/supabase";
import { Mail, Lock, ArrowRight } from "lucide-react-native";
import DwelloLogo from "../../components/Logo"; // 👈 Import your new logo

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAuth(type: "login" | "signup") {
    setLoading(true);
    let result;

    if (type === "login") {
      result = await supabase.auth.signInWithPassword({ email, password });
    } else {
      result = await supabase.auth.signUp({ email, password });
    }

    const { error, data } = result;
    setLoading(false);

    if (error) Alert.alert("Error", error.message);
    else if (type === "signup" && !data.session)
      Alert.alert("Check your email", "We sent you a verification link!");
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {/* 🟢 BRANDING SECTION */}
      <View style={styles.brandSection}>
        <DwelloLogo size="large" />
        <Text style={styles.tagline}>Community, Simplified.</Text>
      </View>

      {/* ⚪ INPUT SECTION */}
      <View style={styles.formContainer}>
        <View style={styles.inputWrapper}>
          <Mail color="#8e8e93" size={20} />
          <TextInput
            onChangeText={setEmail}
            value={email}
            placeholder="Email Address"
            placeholderTextColor="#C7C7CC"
            autoCapitalize="none"
            style={styles.input}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Lock color="#8e8e93" size={20} />
          <TextInput
            onChangeText={setPassword}
            value={password}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor="#C7C7CC"
            autoCapitalize="none"
            style={styles.input}
          />
        </View>

        {/* 🔵 PRIMARY BUTTON */}
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => handleAuth("login")}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Text style={styles.loginText}>Sign In</Text>
              <ArrowRight color="white" size={20} opacity={0.8} />
            </>
          )}
        </TouchableOpacity>

        {/* SECONDARY LINK */}
        <TouchableOpacity
          style={styles.signupBtn}
          onPress={() => handleAuth("signup")}
          disabled={loading}
        >
          <Text style={styles.signupText}>
            New to Dwello?{" "}
            <Text style={{ color: "#007AFF", fontWeight: "bold" }}>
              Create Account
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    justifyContent: "center",
  },

  brandSection: { alignItems: "center", marginBottom: 60 },
  tagline: { fontSize: 16, color: "#8e8e93", marginTop: 10, fontWeight: "500" },

  formContainer: { gap: 16 },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F7", // Classic iOS Input Grey
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    gap: 12,
  },
  input: { flex: 1, fontSize: 17, color: "#000", fontWeight: "500" },

  loginBtn: {
    backgroundColor: "#007AFF",
    height: 56,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    gap: 10,
    shadowColor: "#007AFF",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  loginText: { fontSize: 17, fontWeight: "bold", color: "#fff" },

  signupBtn: { alignItems: "center", marginTop: 20 },
  signupText: { color: "#8e8e93", fontSize: 14 },
});
