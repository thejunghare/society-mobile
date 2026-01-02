import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  AppState,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { supabase } from "../lib/supabase";
import { Mail, Lock } from "lucide-react-native";

// Handle App State (Background/Foreground)
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.log(error);
      Alert.alert("Login Failed", error.message);
    }
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: "New Member",
        },
      },
    });

    if (error) Alert.alert("Sign Up Failed", error.message);
    else if (!session)
      Alert.alert("Success", "Please check your inbox for email verification!");

    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Society Login</Text>

      <View style={styles.inputContainer}>
        <Mail
          color="#888"
          size={20}
          absoluteStrokeWidth={false}
          style={{ marginRight: 10 }}
        />

        <TextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Lock
          color="#888"
          size={20}
          absoluteStrokeWidth={false}
          style={{ marginRight: 10 }}
        />
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={"none"}
          style={styles.input}
        />
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={[styles.button, styles.loginBtn, { marginBottom: 15 }]}
          onPress={signInWithEmail}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.signupBtn]}
          onPress={signUpWithEmail}
          disabled={loading}
        >
          <Text style={[styles.btnText, { color: "#007AFF" }]}>
            Create Account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  btnContainer: {
    marginTop: 10,
    // gap: 15,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  loginBtn: {
    backgroundColor: "#007AFF",
  },
  signupBtn: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  btnText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
