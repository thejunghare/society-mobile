// lib/supabase.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

// ⚠️ REPLACE THESE WITH YOUR KEYS FROM SUPABASE DASHBOARD -> SETTINGS -> API
const supabaseUrl = "https://fmznbhezwzujaxgfkirp.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtem5iaGV6d3p1amF4Z2ZraXJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwOTgyNzIsImV4cCI6MjA4MjY3NDI3Mn0.orMS0XMS5nau0SdpdsU0-gwcH3vcZQd9M-QS_TPnS9g";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
