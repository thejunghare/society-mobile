import "react-native-url-polyfill/auto"; // 👈 THIS MUST BE AT THE TOP
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppState } from "react-native";

// 1. Debugging: Check if variables are loaded (remove this later)
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

console.log("Supabase URL:", supabaseUrl ? "Loaded ✅" : "Missing ❌");
console.log("Supabase Key:", supabaseAnonKey ? "Loaded ✅" : "Missing ❌");

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("🛑 CRITICAL: Missing Supabase Environment Variables!");
}

export const supabase = createClient(supabaseUrl || "", supabaseAnonKey || "", {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// 2. Helper to keep connection alive
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
